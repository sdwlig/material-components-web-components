/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {
  BaseElement,
  customElement,
  html,
  property,
  classMap,
  query,
  queryAll,
  addHasRemoveClass
} from '@material/mwc-base/base-element';
import { findAssignedElements } from '@material/mwc-base/utils';
import { MDCChipSetFoundation } from '@material/chips/chip-set/foundation';
import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { Chip as MWCChip, EVENTS as CHIP_EVENTS } from './mwc-chip';

import { style } from './mwc-chip-set-css';

@customElement('mwc-chip-set' as any)
export class ChipSet extends BaseElement {

  /**
   * Root element for chip-set component.
   */
  @query(".mdc-chip-set")
  protected mdcRoot!: HTMLElement;

  @queryAll("mwc-chip")
  protected chipEls!: MWCChip[];

  @query("slot")
  protected slotEl!: HTMLSlotElement;

  /**
   * Optional. Default value is false. Sets the entire chip-set to work as a choice set, you can select only one chip.
   */
  @property({ type: Boolean })
  choice = false;

  /**
   * Optional. Default value is false. Allows the entire chip-set to work as a filter set, you can select many chips to apply the behavior of each one.
   */
  @property({ type: Boolean })
  filter = false;

  /**
   * Optional. Default value is false. This property will tell the entire chip-set to work like the filter but with extra animation for each chip you add.
   */
  @property({ type: Boolean })
  input = false;

  
  protected _chips: MWCChip[] = [];
  /**
   * Return an array of Chips
   */
  public get chips() {
    return [...this._chips];
  }

  /**
   * Return an array of the IDs of all selected chips
   */
  public get selectedChipIds() {
    return this.mdcFoundation.getSelectedChipIds();
  }

  protected get slottedChips(): MWCChip[] {
    return this.slotEl
      ? findAssignedElements(this.slotEl, 'mwc-chip') as MWCChip[]
      : [];
  }

  protected idCounter = 0;

  protected _handleSlotChange = this._onSlotChange.bind(this) as EventListenerOrEventListenerObject;

  protected _handleChipInteraction = this._onChipInteraction.bind(this) as EventListenerOrEventListenerObject;

  protected _handleChipSelection = this._onChipSelection.bind(this) as EventListenerOrEventListenerObject;

  protected _handleChipRemoval = this._onChipRemoval.bind(this) as EventListenerOrEventListenerObject;

  protected mdcFoundation!: MDCChipSetFoundation;

  protected readonly mdcFoundationClass = MDCChipSetFoundation;

  /**
   * Create the adapter for the `mdcFoundation`.
   * Override and return an object with the Adapter's functions implemented
   */
  protected createAdapter(): MDCChipSetAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      removeChip: (chipId) => {
        const index = this._findChipIndex(chipId);

        if (index >= 0) {
          const chip = this._chips[index];
          this._chips.splice(index, 1);
          chip.remove();
        }
      },
      setSelected: (chipId, selected) => {
        const index = this._findChipIndex(chipId);

        if (index >= 0) {
          this._chips[index].selected = selected;
        }
      }
    }
  }

  static styles = style;

  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    const classes = {
      'mdc-chip-set': true,
      'mdc-chip-set--choice': this.choice,
      'mdc-chip-set--filter': this.filter,
      'mdc-chip-set--input': this.input
    };

    return html`
      <div class="${classMap(classes)}">
        <slot @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   */
  firstUpdated() {
    super.firstUpdated();

    this.updateComplete
      .then(() => {
        this._initialize();
      });
  }

  /**
   * Performs element initialization
   */
  protected _initialize() {
    this.addEventListener(CHIP_EVENTS.interaction, this._handleChipInteraction);
    this.addEventListener(CHIP_EVENTS.selection, this._handleChipSelection);
    this.addEventListener(CHIP_EVENTS.removal, this._handleChipRemoval);

    this._updateChips();
  }

  /**
   * Updates chips id and foundation selections
   */
  protected _updateChips() {
    const slottedChips = this.slottedChips.map(el => {
      el.id = el.id || "mdc-chip-" + ++this.idCounter;
      el.tabIndex = 0;
      return el;
    });

    this._chips = [...slottedChips, ...this.chipEls];

    this._chips.forEach(chip => {
      const { id, selected } = chip;
      if (id && selected) {
        this.mdcFoundation.select(id);
      }
    });
  }

  /**
   * Adds a chip to the current chips list
   */
  public addChip(chipEl: MWCChip) {
    chipEl.id = chipEl.id || `mdc-chip-${++this.idCounter}`;
    chipEl.setParentType(this);

    this.mdcRoot.appendChild(chipEl);

    this._updateChips();
  };

  /**
   * Handles slot change event
   */
  protected _onSlotChange() {
    this._updateChips();
  }

  /**
   * Handles a chip interaction event
   */
  protected _onChipInteraction(evt: CustomEvent) {
    const {
      chipId
    } = evt.detail;

    this.mdcFoundation.handleChipInteraction(chipId);
  }

  /**
   * Handles a chip selection event, used to handle discrepancy
   * when selection state is set directly on the Chip.
   */
  protected _onChipSelection(evt: CustomEvent) {
    const {
      chipId,
      selected
    } = evt.detail;

    this.mdcFoundation.handleChipSelection(chipId, selected);
  }

  /**
   * Handles the event when a chip is removed.
   */
  protected _onChipRemoval(evt: CustomEvent) {
    const {
      chipId
    } = evt.detail;

    this.mdcFoundation.handleChipRemoval(chipId);
  }

  /**
   * Returns the index of the chip with the given id, or -1 if the chip does not exist.
   */
  protected _findChipIndex(chipId: string) {
    return this._chips.findIndex(chip => chip.id === chipId);
  }

  /**
   * Returns the chip with the given id
   */
  public getChipById(chipId: string) {
    return this._chips[this._findChipIndex(chipId)];
  }
}
