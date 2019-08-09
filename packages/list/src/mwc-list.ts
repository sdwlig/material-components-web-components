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
  html,
  observer,
  property,
  query,
  customElement,
  classMap,
  addHasRemoveClass,
  findAssignedElements,
  emit
} from '@authentic/mwc-base/base-element';
import { closest, matches } from '@material/dom/ponyfill';
import MDCListFoundation from './_foundation';
import { MDCListAdapter } from './_adapter';
import { strings } from './_constants';
import { ListItem } from './mwc-list-item';

import { style } from './mwc-list-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-list': List;
  }
}

@customElement('mwc-list' as any)
export class List extends BaseElement {

  @query('.mdc-list')
  protected mdcRoot!: HTMLElement;

  @query("slot")
  protected slotEl!: HTMLSlotElement;

  @property({ type: Number })
  public lines = 1;

  @property({ type: Boolean })
  public ripple = true;

  @property({ type: Boolean })
  public avatarList = false;

  @property({ type: Boolean })
  public nonInteractive = false;

  @property({ type: Boolean })
  public useActivated = false;

  @property({ type: String })
  public inputType = 'none';

  @property({ type: String })
  public inputAction = 'primary';

  @observer(function (this: List, value: boolean) {
    this.mdcFoundation && this.mdcFoundation.setVerticalOrientation(!value);
  })
  @property({ type: Boolean })
  public horizontal = false;

  @observer(function (this: List, value: boolean) {
    this.mdcFoundation && this.mdcFoundation.setWrapFocus(value);
  })
  @property({ type: Boolean })
  public wrapFocus = true;

  @observer(function (this: List, value: boolean) {
    this.mdcFoundation && this.mdcFoundation.setSingleSelection(value);
  })
  @property({ type: Boolean })
  public singleSelection = true;

  @observer(function (this: List, value: number) {
    this.mdcFoundation && this.mdcFoundation.setSelectedIndex(value);
  })
  @property({ type: Number })
  public selectedIndex = -1;

  protected mdcFoundation!: MDCListFoundation;
  protected readonly mdcFoundationClass = MDCListFoundation;

  firstUpdated() {
    super.firstUpdated();
    this.layout();
    this.initializeListType();
  }

  static styles = style;

  render() {
    const classes = {
    };
    return html`
      <ul class="mdc-list ${classMap(classes)}"
        @keydown=${this.handleKeydownEvent_}
        @click=${this.handleClickEvent_}
        @focusin=${this.handleFocusInEvent_}
        @focusout=${this.handleFocusOutEvent_}
        tabindex="0">
        <slot></slot>
      </ul>
    `;
  }

  createAdapter(): MDCListAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      getListItemCount: () => this.listElements.length,
      inputType: () => this.inputType,
      setSelectedAtIndex: (index) => {
        this.selectItem(this.listElements[index] as ListItem);
      },
      clearSelection: () => {
        this.clearSelection();
      },
      toggleItemAtIndex: (index) => { this.listElements[index].toggle() },
      getFocusedElementIndex: () => {
        return this.listElements.map((ele, index) => {
          return (ele && ele.focused) ? index : -1;
        }).filter(e => e !== -1)[0];
      },
      setAttributeForElementIndex: (index, attr, value) => {
        const ele = this.listElements[index] as ListItem;
        if (ele) ele.setAttribute(attr, value); // temporary
      },
      addClassForElementIndex: (index, className) => {
        const ele = this.listElements[index] as ListItem;
        if (ele) ele.addClass(className); // temp solution
      },
      removeClassForElementIndex: (index, className) => {
        const ele = this.listElements[index] as ListItem;
        if (ele) ele.removeClass(className); // temp solution
      },
      isDisabledAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        return ele && ele.disabled;
      },
      focusItemAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        if (ele) this.focusItem(ele, true);
      },
      setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: string) => {
        const ele = this.listElements[listItemIndex] as ListItem;
        if (ele) ele.tabindex = Number(tabIndexValue);
      },
      hasRadioAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        return ele ? ele.radio : false;
      },
      hasCheckboxAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        return ele ? ele.checkbox : false;
      },
      isCheckboxCheckedAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        return ele ? ele.selected : false;
      },
      setCheckedCheckboxOrRadioAtIndex: (index: number) => {
        const ele = this.listElements[index] as ListItem;
        if (ele) ele.selected = true;
      },
      notifyAction: (index: number) => {
        emit(this, strings.ACTION_EVENT, { listIndex: index }, true)
      },
      isFocusInsideList: (): boolean => (this.mdcRoot.querySelectorAll(":focus").length > 0),
    }
  }

  public layout() {
    this.mdcFoundation.layout();
  }

  /**
   * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
   */
  public initializeListType() {
    this.selectedIndex = this.listElements.indexOf(this.listElements.filter(e => e.selected)[0]);
  }

  get listElements(): ListItem[] {
    return findAssignedElements(this.slotEl, 'mwc-list-item:not(disabled)') as ListItem[];
  }

  protected getListItemIndex_(evt: Event): number {
    return this.getIndex(this.getListItem_(evt))
  }

  protected getListItem_(evt: Event): ListItem | null {
    const eventTarget = evt.target as Element;
    return closest(eventTarget, `mwc-list-item`) as ListItem || null;
  }

  protected getIndex(item): number {
    return item ? this.listElements.indexOf(item) : -1
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */
  protected handleFocusInEvent_(evt: FocusEvent) {
    const index = this.getListItemIndex_(evt);
    this.mdcFoundation!.handleFocusIn(evt, index);
  }

  /**
 * Used to figure out which element was clicked before sending the event to the foundation.
 */
  protected handleFocusOutEvent_(evt: FocusEvent) {
    const index = this.getListItemIndex_(evt);
    this.mdcFoundation!.handleFocusOut(evt, index);
  }

  /**
   * Used to figure out which element was focused when keydown event occurred before sending the event to the
   * foundation.
   */
  protected handleKeydownEvent_(evt: KeyboardEvent) {
    const index = this.getListItemIndex_(evt);
    const target = evt.target as Element;

    if (index >= 0 && !this.nonInteractive) {
      this.mdcFoundation!.handleKeydown(evt, target instanceof ListItem, index);
    }
  }

  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   */
  protected handleClickEvent_(evt: MouseEvent) {
    const index = this.getListItemIndex_(evt);
    const target = evt.target as Element;
    if (this.nonInteractive) return;

    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = !matches(target, strings.CHECKBOX_RADIO_SELECTOR);
    this.mdcFoundation!.handleClick(index, toggleCheckbox);
  }

  // NOTE: needed only for ShadyDOM where delegatesFocus is not implemented
  public focus() {
    this.mdcRoot.focus();
  }

  protected defocusAllItems() {
    this.listElements.forEach(e => e.setFocused(false))
  }

  protected focusItem(item: ListItem, hard: boolean = false) {
    this.defocusAllItems();

    if (item) {
      item.setFocused(true);
      if (hard) item.focus();
    }
  }

  protected deselectAllItems() {
    this.listElements.forEach(e => e.selected = false)
  }

  protected selectItem(item: ListItem) {
    this.clearSelection();
    
    if (item) {
      this.focusItem(item, false);
      item.selected = true;
    }
  }

  protected clearSelection() {
    this.deselectAllItems();
  }

  public selectItemAtIndex(index: number) {
    this.selectItem(this.listElements[index])
  }

  public focusItemAtIndex(index: number, hard: boolean) {
    this.focusItem(this.listElements[index], hard);
  }

}
