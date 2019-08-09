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
  observer,
  emit,
  addHasRemoveClass
} from '@material/mwc-base/base-element';
import { MDCChipFoundation } from '@material/chips/chip/foundation';
import { MDCChipAdapter } from '@material/chips/chip/adapter';
import { ChipSet as MWCChipSet } from './mwc-chip-set';
import { styleMap } from 'lit-html/directives/style-map';
import { ripple } from '@material/mwc-ripple/ripple-directive';
import { style } from './mwc-chip-css';

import "@material/mwc-icon/mwc-icon-font";

const INTERACTION_EVENTS = [ 'click', 'keydown' ];
const IMAGE_FORMATS_REGEX = new RegExp(/(http(s?):\/\/)|(.(gif|jp(e?)g|png|svg))$/);
const COLOR_REGEX = new RegExp(/^#([0-9a-zA-Z]{3}|[0-9a-zA-Z]{6})$/);

export const EVENTS = {
  removal: 'removal',
  selection: 'selection',
  interaction: 'interaction',
  trailingIconInteraction: 'trailingiconinteraction'
}

@customElement('mwc-chip' as any)
export class Chip extends BaseElement {

  /**
   * Root element for chip component.
   */
  @query(".mdc-chip")
  protected mdcRoot!: HTMLElement;

  /**
   * Optional. Indicates a leading icon in the chip.
   */
  @query(".mdc-chip__icon--leading")
  protected leadingIconEl!: HTMLElement;

  /**
   * Optional. Indicates a trailing icon which removes the chip from the DOM. 
   * Only use with input chips.
   */
  @query(".mdc-chip__icon--trailing")
  protected trailingIconEl!: HTMLElement;

  /**
   * Optional. Indicates the checkmark in a filter chip.
   */
  @query(".mdc-chip__checkmark")
  protected checkmarkEl!: HTMLElement;

  /**
   * Mandatory. Indicates the text content of the chip.
   */
  @property({ type: String })
  public label = '';

  /**
   * Optional. It will act as a leading element in the chip, 
   * it could be a color, icon, text or image.
   */
  @property({ type: String })
  public avatar = '';

  /**
   * Optional. Sets an icon before the text. 
   * It needs the checkmark property to be added too. 
   */
  @property({ type: String })
  public leadingIcon = '';

  /**
   * Optional. Sets an icon after the text. 
   * The 'trailingIcon' will always remove the chip when clicked. 
   */
  @property({ type: String })
  public trailingIcon = '';

  /**
   * Optional. Default value is false. Adds a 'checkmark' when the chip is selected.
   */
  @property({ type: Boolean })
  public checkmark = false;

  /**
   * Optional. Default value is false. Adds a border to the chip.
   */
  @property({ type: Boolean })
  public outlined = false;

  /**
   * Optional. Default value is -1. This property help us to make it accessible by keyboard and screen reader
   */
  @property({ type: Number })
  public tabIndex = -1;

  /**
   * Optional. Default value is false. Remove ripple effect when a chip is clicked
   */
  @property({ type: Boolean })
  public preventRipple = false;

  /**
   * Optional. Default value is false. Makes the chip pre-selected.
   */
  @property({ type: Boolean })
  @observer(function (this: Chip, value: boolean ) {
    this.mdcFoundation.setSelected(value);
  })
  public selected = false;

  /**
   * Optional. Default value is false. Prevent chip from being removed on trailing icon action
   */
  @property({ type: Boolean })
  @observer(function (this: Chip, value: boolean ) {
    this.mdcFoundation.setShouldRemoveOnTrailingIconClick(!value);
  })
  public preventRemoveOnTrailingIconClick = false;

  /**
   * This function returns true when chip has leadingIcon and not avatar
   */
  protected get _shouldDisplayLeadingIcon() {
    return this.leadingIcon && !this.avatar;
  }

  /**
   * This function returns true when chip has checkmark
   */
  protected get _shouldDisplayCheckmark() {
    return this.checkmark;
  }

  /**
   * This function returns true when chip has avatar and not leadingIcon
   */
  protected get _shouldDisplayAvatar() {
    return this.avatar && !this.leadingIcon;
  }

  /**
   * Ripple getter for Ripple integration
   */
  public get ripple() {
    if (this.preventRipple) return undefined;

    if (!this._ripple) {
      this._ripple = ripple({
        adapter: { computeBoundingRect: () => this.mdcFoundation.getDimensions() },
        unbounded: false
      });
    }
    
    return this._ripple;
  }

  protected _ripple;

  protected _isChoice = false;

  protected _isFilter = false;

  protected _isInput = false;

  protected _isDefault = false;

  protected _handleInteraction = this._onInteraction.bind(this) as EventListenerOrEventListenerObject;

  protected _handleTrailingIconInteraction = this._onTrailingIconInteraction.bind(this) as EventListenerOrEventListenerObject;
  
  protected _handleTransitionEnd = this._onTransitionEnd.bind(this) as EventListenerOrEventListenerObject;

  protected mdcFoundation!: MDCChipFoundation;

  protected readonly mdcFoundationClass = MDCChipFoundation;

  /**
   * Create the adapter for the `mdcFoundation`.
   * Override and return an object with the Adapter's functions implemented
   */
  protected createAdapter(): MDCChipAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      addClassToLeadingIcon: className => {
        if (this.leadingIconEl) {
          this.leadingIconEl.classList.add(className);
        }
      },
      eventTargetHasClass: (target: HTMLElement, className) => target ? target.classList.contains(className) : false,
      getCheckmarkBoundingClientRect: () => this.checkmarkEl ? this.checkmarkEl.getBoundingClientRect() : null,
      getComputedStyleValue: propertyName => window.getComputedStyle(this.mdcRoot).getPropertyValue(propertyName),
      getRootBoundingClientRect: () => this.mdcRoot.getBoundingClientRect(),
      hasLeadingIcon: () => Boolean(this.leadingIconEl),
      notifyInteraction: () => this._onNotifyInteraction(),
      notifyRemoval: () => {
        this.destroy();
        this._onNotifyRemoval();
      },
      notifySelection: selected => this._onNotifySelection(selected),
      notifyTrailingIconInteraction: () => emit(this, EVENTS.trailingIconInteraction, { chipId: this.id }, true),
      removeClassFromLeadingIcon: className => {
        if (this.leadingIconEl) {
          this.leadingIconEl.classList.remove(className);
        }
      },
      setStyleProperty: (propertyName, value) => this.mdcRoot.style.setProperty(propertyName, value),
    }
  }

  static styles = style;

  /**
   * Used to render the lit-html TemplateResult with a leading icon
   */
  protected _renderLeadingIcon() {
    const classes = {
      'material-icons': true,
      'mdc-chip__icon': true,
      'mdc-chip__icon--leading': true,
      'mdc-chip__icon--leading-hidden': this.selected,
    };

    return html`
      <i class="${classMap(classes)}">${this.leadingIcon}</i>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with avatar
   */
  protected _renderAvatar() {
    const isImage = IMAGE_FORMATS_REGEX.test(this.avatar);
    const isColor = !isImage && COLOR_REGEX.test(this.avatar);
    const isText = !isImage && !isColor && this.avatar.length < 3;
    const isIcon = !isImage && !isText && !isColor;
    const classes = {
      'mdc-chip__avatar': true,
      [`mdc-chip__avatar--${isColor ? this._getAvatarTextColor(this.avatar) : 'default'}`]: true
    };
    const styles = {
      backgroundColor: isColor ? this.avatar : ''
    };

    return html`
      <div class="${classMap(classes)}" style="${styleMap(styles)}">
        ${isImage ? this._renderAvatarImage() : ''}
        ${isText ? this._renderAvatarText() : ''}
        ${isIcon ? this._renderAvatarIcon() : ''}
      </div>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with avatar text color
   */
  protected _getAvatarTextColor(color: string) {
    const CODE = color.substring(1);
    const RGB = parseInt(CODE, 16);
    const RED = (RGB >> 16) & 0xff;
    const GREEN = (RGB >>  8) & 0xff;
    const BLUE = (RGB >>  0) & 0xff;

    const luma = 0.2126 * RED + 0.7152 * GREEN + 0.0722 * BLUE; // per ITU-R BT.709

    return luma > 40 ? 'dark' : 'light';
  }

  /**
   * Used to render the lit-html TemplateResult with an avatar image
   */
  protected _renderAvatarImage() {
    return html`
      <img class="mdc-chip__avatar-graphic" src="${this.avatar}" alt="${this.label}">
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with an avatar text
   */
  protected _renderAvatarText() {
    return html`
      <span class="mdc-chip__avatar-text">${this.avatar}</span>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with an avatar icon
   */
  protected _renderAvatarIcon() {
    return html`
      <i class="material-icons mdc-chip__avatar-icon">${this.avatar}</i>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with a checkmark
   */
  protected _renderCheckmark() {
    return html`
      <div class="mdc-chip__checkmark">
        <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
          <path
            class="mdc-chip__checkmark-path"
            fill="none"
            d="M1.73 12.91 8.1 19.28 22.79 4.59"
          />
        </svg>
      </div>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult with a trailing icon
   */
  protected _renderTrailingIcon() {
    const classes = {
      'material-icons': true,
      'mdc-chip__icon': true,
      'mdc-chip__icon--trailing': true
    };

    return html`
      <i class="${classMap(classes)}" tabindex="0" role="button">${this.trailingIcon}</i>
    `;
  }

  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    const classes = {
      'mdc-chip': true,
      'mdc-chip--outlined': this.outlined,
      'mdc-chip--selected': this.selected,
      'mdc-chip--choice': this._isChoice,
      'mdc-chip--filter': this._isFilter,
      'mdc-chip--input': this._isInput,
      'mdc-chip--default': this._isDefault
    };

    return html`
      <div class="${classMap(classes)}" tabindex="${this.tabIndex}" .ripple="${this.ripple}">
        ${this._shouldDisplayLeadingIcon ? this._renderLeadingIcon() : ''}
        ${this._shouldDisplayAvatar ? this._renderAvatar() : ''}
        ${this._shouldDisplayCheckmark ? this._renderCheckmark() : ''}
        <span class="mdc-chip__text">${this.label}</span>
        ${this.trailingIcon ? this._renderTrailingIcon() : ''}
        <slot></slot>
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
        this.setParentType();
      });
  }

  /**
   * Performs element initialization
   */
  protected _initialize() {
    INTERACTION_EVENTS.forEach(evtType => {
      this.addEventListener(evtType, this._handleInteraction);
    });

    this.mdcRoot.addEventListener('transitionend', this._handleTransitionEnd);

    if (this.trailingIcon) {
      INTERACTION_EVENTS.forEach(evtType => {
        this.trailingIconEl.addEventListener(evtType, this._handleTrailingIconInteraction);
      });
    }
  }

  /**
   * Remove existing listeners for chip element
   */
  public destroy() {
    INTERACTION_EVENTS.forEach(evtType => {
      this.removeEventListener(evtType, this._handleInteraction);
    });

    this.mdcRoot.removeEventListener('transitionend', this._handleTransitionEnd);

    if (this.trailingIcon) {
      INTERACTION_EVENTS.forEach(evtType => {
        this.trailingIconEl.removeEventListener(evtType, this._handleTrailingIconInteraction);
      });
    }
  }

  /**
   * This method allow us to set up some properties when its parent is an MWCChipSet 
   * @param parentElement Map of its parentElement
   */
  public setParentType(parentElement = this.parentElement) {
    if (parentElement instanceof MWCChipSet) {
      this._isChoice = parentElement.choice;
      this._isFilter = parentElement.filter;
      this._isInput = parentElement.input;
      this._isDefault = !this._isChoice && !this._isFilter && !this._isInput;

      this.requestUpdate();
    }
  }

  protected _onNotifyRemoval() {
    emit(this, EVENTS.removal, { chipId: this.id, root: this.mdcRoot }, true);
  }

  protected _onNotifyInteraction() {
    emit(this, EVENTS.interaction, { chipId: this.id }, true);
  }

  protected _onNotifySelection(selected) {
    emit(this, EVENTS.selection, { chipId: this.id, selected: selected }, true);
  }

  /**
   * Handles a transition end event on the root element.
   */
  protected _onTransitionEnd(evt: TransitionEvent) {
    return this.mdcFoundation.handleTransitionEnd(evt);
  }

  /**
   * Handles an interaction event on the root element.
   */
  protected _onInteraction(evt: MouseEvent | KeyboardEvent) {
    return this.mdcFoundation.handleInteraction(evt);
  }

  /**
   * Handles an interaction event on the trailing icon element.
   * This is used to prevent the ripple from activating on interaction
   * with the trailing icon.
   */
  protected _onTrailingIconInteraction(evt: MouseEvent | KeyboardEvent) {
    return this.mdcFoundation.handleTrailingIconInteraction(evt);
  }

  /**
   * Begins the exit animation which leads to removal of the chip.
   */
  public beginExit() {
    this.mdcFoundation.beginExit();
  }

  /**
   * Performs the remove of the element
   */
  remove() {
    this.destroy();
    super.remove();
  }
}
