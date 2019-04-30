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
  FormElement,
  customElement,
  query,
  HTMLElementWithRipple,
  addHasRemoveClass,
  property,
  observer,
  RippleSurface,
  html,
  classMap,
} from '@material/mwc-base/form-element';
import { MDCSelectAdapter } from '@material/select/adapter';
import { MDCSelectFoundation } from '@material/select/foundation';
import { MDCSelectFoundationMap } from '@material/select/types';
import { strings, cssClasses } from '@material/select/constants';
import { MDCSelectIcon, MDCSelectIconFactory } from '@material/select/icon';
import { MDCSelectHelperText, MDCSelectHelperTextFactory } from '@material/select/helper-text';
import { MDCNotchedOutline, MDCNotchedOutlineFactory } from '@material/notched-outline';
import { MDCFloatingLabel, MDCFloatingLabelFactory } from '@material/floating-label';
import { MDCLineRipple, MDCLineRippleFactory } from '@material/line-ripple';
import * as menuSurfaceConstants from '@material/menu-surface/constants';
import * as menuConstants from '@material/menu/constants';
import { emit } from '@material/mwc-base/utils';

import { style } from './mwc-select-css.js';
import { findAssignedElement } from '@material/mwc-base/utils';

const lineRippleFactory: MDCLineRippleFactory = el => new MDCLineRipple(el);
const helperTextFactory: MDCSelectHelperTextFactory = el => new MDCSelectHelperText(el);
const iconFactory: MDCSelectIconFactory = el => new MDCSelectIcon(el);
const labelFactory: MDCFloatingLabelFactory = el => new MDCFloatingLabel(el);
const outlineFactory: MDCNotchedOutlineFactory = el => new MDCNotchedOutline(el);

type PointerEventType = 'mousedown' | 'touchstart';

const POINTER_EVENTS: PointerEventType[] = [ 'mousedown', 'touchstart' ];
const VALIDATION_ATTR_WHITELIST = [ 'required', 'aria-required' ];

declare global {
  interface HTMLElementTagNameMap {
    'mwc-select': Select;
  }
}

@customElement('mwc-select' as any)
export class Select extends FormElement {
  @query('.mdc-select')
  protected mdcRoot!: HTMLElementWithRipple;

  @query('slot')
  protected slotEl!: HTMLSlotElement;

  @query(strings.LABEL_SELECTOR)
  protected labelElement!: HTMLLabelElement;

  @query(strings.LINE_RIPPLE_SELECTOR)
  protected lineRippleElement!: HTMLElement;

  @query(strings.OUTLINE_SELECTOR)
  protected outlineElement!: HTMLElement;

  @query(strings.LEADING_ICON_SELECTOR)
  protected leadingIconElement!: HTMLElement;

  @query('.mdc-select-helper-text')
  protected helperTextElement!: HTMLElement;

  @property({ type: String, reflect: true })
  @observer(function(this: Select, value: string) {
    if (this.mdcFoundation.getValue() !== value) {
      this.mdcFoundation && this.mdcFoundation.setValue(value);
    }
  })
  public value = '';

  @property({ type: String })
  public label = '';

  @property({ type: Boolean })
  public outlined = false;

  @property({ type: Boolean, reflect: true })
  @observer(function(this: Select, value: boolean) {
    this.mdcFoundation && this.mdcFoundation.setDisabled(value);
  })
  public disabled = false;

  @property({ type: String })
  @observer(function(this: Select, value: string) {
    this.mdcFoundation && this.mdcFoundation.setHelperTextContent(value);
  })
  public helperTextContent = '';

  @property({ type: String })
  public validationMessage = '';

  @property({ type: Boolean })
  @observer(function(this: Select, value: boolean) {
    this._helperText && this._helperText.foundation.setPersistent(value);
  })
  public persistentHelperText = false;

  @property({ type: String })
  @observer(function(this: Select, value: string) {
    this.mdcFoundation && this.mdcFoundation.setLeadingIconAriaLabel(value);
  })
  public leadingIconAriaLabel = '';

  @property({ type: String })
  @observer(function(this: Select, value: string) {
    this.mdcFoundation && this.mdcFoundation.setLeadingIconContent(value);
  })
  public leadingIconContent = '';

  @property({ type: Boolean })
  @observer(function(this: Select, value: boolean) {
    if (this._nativeControl) {
      this._nativeControl.required = value;
    } else if (this._selectedText) {
      if (value) {
        this._selectedText!.setAttribute('aria-required', value.toString());
      } else {
        this._selectedText!.removeAttribute('aria-required');
      }
    }
  })
  public required = false;

  public get valid(): boolean {
    return this.mdcFoundation && this.mdcFoundation.isValid();
  }

  public set valid(valid: boolean) {
    this.mdcFoundation && this.mdcFoundation.setValid(valid);
  }

  public get ripple(): RippleSurface | undefined {
    return this.mdcRoot.ripple;
  }

  /**
   * Enables or disables the use of native validation. Use this for custom validation.
   */
  protected _useNativeValidation = false;
  public set useNativeValidation(value: boolean) {
    this._useNativeValidation = value;
  }

  public get slottedElement(): HTMLElement | null {
    return this.slotEl && findAssignedElement(this.slotEl, '*');
  }

  public get selectedIndex(): number {
    let selectedIndex = -1;

    if (this._menuElement && this._menu) {
      const selectedEl = this._menuElement.querySelector(strings.SELECTED_ITEM_SELECTOR)!;
      selectedIndex = this._menu.items.indexOf(selectedEl);
    } else if (this._nativeControl) {
      selectedIndex = this._nativeControl.selectedIndex;
    }

    if (this._nativeControl) {
      selectedIndex = this._nativeControl.selectedIndex;
      this.value = this._nativeControl.value;
    }

    return selectedIndex;
  }

  public set selectedIndex(selectedIndex: number) {
    this.mdcFoundation.setSelectedIndex(selectedIndex);
  }

  protected get formElement(): HTMLElement {
    return (this._nativeControl || this._selectedText) as HTMLElement;
  }
  
  protected _isMenuOpen: boolean = false;

  protected _nativeControl!: HTMLSelectElement | null;

  protected _selectedText!: HTMLElement | null;

  protected _hiddenInput!: HTMLInputElement | null;

  protected _menu!: { open, items, hoistMenuToBody, setAnchorElement, setAnchorCorner, wrapFocus, addEventListener } | null;

  protected _menuElement!: Element | null;

  protected _leadingIcon!: MDCSelectIcon;

  protected _helperText!: MDCSelectHelperText | null;

  protected _lineRipple!: MDCLineRipple | null;

  protected _label!: MDCFloatingLabel | null;

  protected _outline!: MDCNotchedOutline | null;

  protected _validationObserver!: MutationObserver;

  protected _handleChange = this._onChange.bind(this) as EventListenerOrEventListenerObject;

  protected _handleFocus = this._onFocus.bind(this) as EventListenerOrEventListenerObject;

  protected _handleBlur = this._onBlur.bind(this) as EventListenerOrEventListenerObject;

  protected _handleClick = this._onClick.bind(this) as EventListenerOrEventListenerObject;

  protected _handleKeydown = this._onKeydown.bind(this) as EventListenerOrEventListenerObject;

  protected _handleMenuOpened = this._onMenuOpened.bind(this) as EventListenerOrEventListenerObject;

  protected _handleMenuClosed = this._onMenuClosed.bind(this) as EventListenerOrEventListenerObject;

  protected _handleMenuSelected = this._onMenuSelected.bind(this) as EventListenerOrEventListenerObject;

  protected mdcFoundation!: MDCSelectFoundation;

  protected readonly mdcFoundationClass = MDCSelectFoundation;

  createAdapter(): MDCSelectAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      ...(this._nativeControl ? this._getNativeSelectAdapterMethods() : this._getEnhancedSelectAdapterMethods()),
      ...this._getCommonAdapterMethods(),
      ...this._getOutlineAdapterMethods(),
      ...this._getLabelAdapterMethods()
    }
  }

  protected _getNativeSelectAdapterMethods() {
    return {
      getValue: () => this._nativeControl!.value,
      setValue: (value: string) => {
        this._nativeControl!.value = value;
      },
      openMenu: () => undefined,
      closeMenu: () => undefined,
      isMenuOpen: () => false,
      setSelectedIndex: (index: number) => {
        this._nativeControl!.selectedIndex = index;
      },
      setDisabled: (isDisabled: boolean) => {
        this._nativeControl!.disabled = isDisabled;
      },
      setValid: (isValid: boolean) => {
        if (!this._useNativeValidation) return;

        if (isValid) {
          this.mdcRoot.classList.remove(cssClasses.INVALID);
        } else {
          this.mdcRoot.classList.add(cssClasses.INVALID);
        }

        this._setValidity(isValid);
      },
      checkValidity: () => this._nativeControl!.checkValidity(),
    };
  }

  protected _getEnhancedSelectAdapterMethods() {
    return {
      getValue: () => {
        const listItem = this._menuElement!.querySelector(strings.SELECTED_ITEM_SELECTOR);
        if (listItem && listItem.hasAttribute(strings.ENHANCED_VALUE_ATTR)) {
          return listItem.getAttribute(strings.ENHANCED_VALUE_ATTR) || '';
        }
        return '';
      },
      setValue: (value: string) => {
        const element = this._menuElement!.querySelector(`[${strings.ENHANCED_VALUE_ATTR}="${value}"]`);
        this._setEnhancedSelectedIndex(element ? this._menu!.items.indexOf(element) : -1);
      },
      openMenu: () => {
        if (this._menu && !this._menu.open) {
          this._menu.open = true;
          this._isMenuOpen = true;
          this._selectedText!.setAttribute('aria-expanded', 'true');
        }
      },
      closeMenu: () => {
        if (this._menu && this._menu.open) {
          this._menu.open = false;
        }
      },
      isMenuOpen: () => Boolean(this._menu) && this._isMenuOpen,
      setSelectedIndex: (index: number) => this._setEnhancedSelectedIndex(index),
      setDisabled: (isDisabled: boolean) => {
        this._selectedText!.setAttribute('tabindex', isDisabled ? '-1' : '0');
        this._selectedText!.setAttribute('aria-disabled', isDisabled.toString());
        if (this._hiddenInput) {
          this._hiddenInput.disabled = isDisabled;
        }
      },
      checkValidity: () => {
        const classList = this.mdcRoot.classList;
        if (classList.contains(cssClasses.REQUIRED) && !classList.contains(cssClasses.DISABLED)) {
          // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
          // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
          return this.selectedIndex !== -1 && (this.selectedIndex !== 0 || Boolean(this.value));
        } else {
          return true;
        }
      },
      setValid: (isValid: boolean) => {
        this._selectedText!.setAttribute('aria-invalid', (!isValid).toString());

        if (isValid) {
          this.mdcRoot.classList.remove(cssClasses.INVALID);
        } else {
          this.mdcRoot.classList.add(cssClasses.INVALID);
        }

        this._setValidity(isValid);
      },
    };
  }

  protected _getCommonAdapterMethods() {
    return {
      addClass: className => this.mdcRoot.classList.add(className),
      removeClass: className => this.mdcRoot.classList.remove(className),
      hasClass: className => this.mdcRoot.classList.contains(className),
      setRippleCenter: normalizedX => this._lineRipple && this._lineRipple.setRippleCenter(normalizedX),
      activateBottomLine: () => this._lineRipple && this._lineRipple.activate(),
      deactivateBottomLine: () => this._lineRipple && this._lineRipple.deactivate(),
      notifyChange: value => {
        if (value) {
          const index = this.selectedIndex;
          emit(this, 'change', { value, index }, true);
        }
      },
    };
  }

  protected _getOutlineAdapterMethods() {
    return {
      hasOutline: () => Boolean(this._outline),
      notchOutline: labelWidth => this._outline && this._outline.notch(labelWidth),
      closeOutline: () => this._outline && this._outline.closeNotch(),
    };
  }

  protected _getLabelAdapterMethods() {
    return {
      floatLabel: shouldFloat => this._label && this._label.float(shouldFloat),
      getLabelWidth: () => this._label ? this._label.getWidth() : 0,
    };
  }

  static styles = style;

  _renderFloatingLabel() {
    return html`
      <label class="mdc-floating-label" for="form-element">${this.label}</label>
    `;
  }

  _renderNotchedOutline() {
    const hasLabel = this.label;

    return html`
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          ${hasLabel ? this._renderFloatingLabel() : ''}
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>
    `;
  }

  _renderLineRipple() {
    return html`
      <div class="mdc-line-ripple"></div> 
    `;
  }

  _renderHelperText() {
    return html`
      <div class="mdc-select-helper-text"></div>
    `
  }

  render() {
    const hasOutline = this.outlined;
    const hasLabel = this.label;
    const hasHelperText = !!(this.helperTextContent || this.validationMessage);
    const classes = {
      'mdc-select': true,
      'mdc-select--outlined': hasOutline
    }

    return html`
      <div class="${classMap(classes)}">
        <i class="mdc-select__dropdown-icon"></i>
        <slot></slot>
        ${hasLabel && !hasOutline ? this._renderFloatingLabel() : ''}
        ${hasOutline ? this._renderNotchedOutline() : this._renderLineRipple()}
      </div>
      ${hasHelperText ? this._renderHelperText() : ''}
    `;
  }

  firstUpdated() {
    if (this._selectedText) {
      this._enhancedSelectSetup();
    }

    if (this.slottedElement instanceof HTMLSelectElement) {
      this._nativeControl = this.slottedElement;
    } else {
      this._selectedText = this.mdcRoot;
    }

    this.formElement.id = 'form-element';

    this._label = this.labelElement ? labelFactory(this.labelElement) : null;
    this._lineRipple = this.lineRippleElement ? lineRippleFactory(this.lineRippleElement) : null;
    this._outline = this.outlineElement ? outlineFactory(this.outlineElement) : null;
    this._helperText = this.helperTextElement ? helperTextFactory(this.helperTextElement) : null;

    if (this.leadingIconElement) {
      this.mdcRoot.classList.add(cssClasses.WITH_LEADING_ICON);
      this._leadingIcon = iconFactory(this.leadingIconElement);

      if (this._menuElement) {
        this._menuElement.classList.add(cssClasses.WITH_LEADING_ICON);
      }
    }

    // The required state needs to be sync'd before the mutation observer is added.
    this._initialSyncRequiredState();
    this._addMutationObserverForRequired();

    super.firstUpdated();

    this.formElement.addEventListener('change', this._handleChange);
    this.formElement.addEventListener('focus', this._handleFocus);
    this.formElement.addEventListener('blur', this._handleBlur);

    POINTER_EVENTS.forEach((evtType) => {
      this.formElement.addEventListener(evtType, this._handleClick);
    });

    if (this._menuElement) {
      this._selectedText!.addEventListener('keydown', this._handleKeydown);
      this._menu!.addEventListener(menuSurfaceConstants.strings.CLOSED_EVENT, this._handleMenuClosed);
      this._menu!.addEventListener(menuSurfaceConstants.strings.OPENED_EVENT, this._handleMenuOpened);
      this._menu!.addEventListener(menuConstants.strings.SELECTED_EVENT, this._handleMenuSelected);

      if (this._hiddenInput && this._hiddenInput.value) {
        // If the hidden input already has a value, use it to restore the select's value.
        // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
        const enhancedAdapterMethods = this._getEnhancedSelectAdapterMethods();
        enhancedAdapterMethods.setValue(this._hiddenInput.value);
      } else if (this._menuElement.querySelector(strings.SELECTED_ITEM_SELECTOR)) {
        // If an element is selected, the select should set the initial selected text.
        const enhancedAdapterMethods = this._getEnhancedSelectAdapterMethods();
        enhancedAdapterMethods.setValue(enhancedAdapterMethods.getValue());
      }
    }

    // Initially sync floating label
    this.mdcFoundation.handleChange(false);

    if (
      this.mdcRoot.classList.contains(cssClasses.DISABLED) ||
      (this._nativeControl && this._nativeControl.disabled)
    ) {
      this.disabled = true;
    }
  }

  createFoundation() {
    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }

    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), this._getFoundationMap());
    this.mdcFoundation.init();
  }

  /**
   * Handle change event
   */
  protected _onChange(evt) {
    evt.stopImmediatePropagation();
    this.mdcFoundation.handleChange(true);
  }
  
  /**
   * Handle focus event
   */
  protected _onFocus() {
    this.mdcFoundation.handleFocus();
  }

  /**
   * Handle blur event
   */
  protected _onBlur() {

    this.mdcFoundation.handleBlur();
  }

  /**
   * Handle click event
   */
  protected _onClick(evt) {
    if (this._selectedText) {
      this._selectedText.focus();
    }

    this.mdcFoundation.handleClick(this._getNormalizedXCoordinate(evt));
  }

  /**
   * Handle keydown event
   */
  protected _onKeydown(evt) {
    this.mdcFoundation.handleKeydown(evt)
  }

  /**
   * Handle menu opened event
   */
  protected _onMenuOpened() {
    if (this._menu!.items.length === 0) {
      return;
    }

    // Menu should open to the last selected element, should open to first menu item otherwise.
    const focusItemIndex = this.selectedIndex >= 0 ? this.selectedIndex : 0;
    const focusItemEl = this._menu!.items[focusItemIndex] as HTMLElement;
    focusItemEl.focus();
  }

  /**
   * Handle menu closed event
   */
  protected _onMenuClosed() {
    const activeElement = (this as any).getRootNode().activeElement;

    // _isMenuOpen is used to track the state of the menu opening or closing since the menu.open function
    // will return false if the menu is still closing and this method listens to the closed event which
    // occurs after the menu is already closed.
    this._isMenuOpen = false;
    this._selectedText!.removeAttribute('aria-expanded');

    if (activeElement !== this._selectedText) {
      this.mdcFoundation.handleBlur();
    }
  }

  /**
   * Handle menu selected event
   */
  protected _onMenuSelected(evt) {
    this.selectedIndex = evt.detail.index;
  }

  /**
   * Handles setup for the enhanced menu.
   */
  private _enhancedSelectSetup() {
    const isDisabled = this.mdcRoot.classList.contains(cssClasses.DISABLED);
    this._selectedText!.setAttribute('tabindex', isDisabled ? '-1' : '0');
    this._hiddenInput = this.mdcRoot.querySelector(strings.HIDDEN_INPUT_SELECTOR);
    this._menuElement = this.mdcRoot.querySelector(strings.MENU_SELECTOR)!;
    this._menu!.hoistMenuToBody();
    this._menu!.setAnchorElement(this.mdcRoot);
    this._menu!.setAnchorCorner(menuSurfaceConstants.Corner.BOTTOM_START);
    this._menu!.wrapFocus = false;
  }

  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   */
  private _getNormalizedXCoordinate(evt: MouseEvent | TouchEvent): number {
    const targetClientRect = (evt.target as Element).getBoundingClientRect();
    const xCoordinate = this.isTouchEvent_(evt) ? evt.touches[0].clientX : evt.clientX;
    return xCoordinate - targetClientRect.left;
  }

  private isTouchEvent_(evt: MouseEvent | TouchEvent): evt is TouchEvent {
    return Boolean((evt as TouchEvent).touches);
  }

  protected _setValidity(isValid: boolean) {
    if (this._helperText && this.validationMessage) {
      this.mdcFoundation && this.mdcFoundation.setHelperTextContent(isValid ? this.helperTextContent : this.validationMessage);
      this._helperText.foundation.setValidation(!isValid);
    }
  }

  /**
   * Returns a map of all subcomponents to subfoundations.
   */
  protected _getFoundationMap(): Partial<MDCSelectFoundationMap> {
    return {
      helperText: this._helperText ? this._helperText.foundation : undefined,
      leadingIcon: this._leadingIcon ? this._leadingIcon.foundation : undefined,
    };
  }

  private _setEnhancedSelectedIndex(index: number) {
    const selectedItem = this._menu!.items[index];
    this._selectedText!.textContent = selectedItem ? selectedItem.textContent!.trim() : '';
    const previouslySelected = this._menuElement!.querySelector(strings.SELECTED_ITEM_SELECTOR);

    if (previouslySelected) {
      previouslySelected.classList.remove(cssClasses.SELECTED_ITEM_CLASS);
      previouslySelected.removeAttribute(strings.ARIA_SELECTED_ATTR);
    }

    if (selectedItem) {
      selectedItem.classList.add(cssClasses.SELECTED_ITEM_CLASS);
      selectedItem.setAttribute(strings.ARIA_SELECTED_ATTR, 'true');
    }

    // Synchronize hidden input's value with data-value attribute of selected item.
    // This code path is also followed when setting value directly, so this covers all cases.
    if (this._hiddenInput) {
      this._hiddenInput.value = selectedItem ? selectedItem.getAttribute(strings.ENHANCED_VALUE_ATTR) || '' : '';
    }

    this.layout();
  }

  private _initialSyncRequiredState() {
    const isRequired =
        (this.formElement as HTMLSelectElement).required
        || this.formElement.getAttribute('aria-required') === 'true'
        || this.mdcRoot.classList.contains(cssClasses.REQUIRED);
    if (isRequired) {
      if (this._nativeControl) {
        this._nativeControl.required = true;
      } else {
        this._selectedText!.setAttribute('aria-required', 'true');
      }
      this.mdcRoot.classList.add(cssClasses.REQUIRED);
    }
  }

  private _addMutationObserverForRequired() {
    const observerHandler = (attributesList: string[]) => {
      attributesList.some((attributeName) => {
        if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) === -1) {
          return false;
        }

        if (this._selectedText) {
          if (this._selectedText.getAttribute('aria-required') === 'true') {
            this.mdcRoot.classList.add(cssClasses.REQUIRED);
          } else {
            this.mdcRoot.classList.remove(cssClasses.REQUIRED);
          }
        } else {
          if (this._nativeControl!.required) {
            this.mdcRoot.classList.add(cssClasses.REQUIRED);
          } else {
            this.mdcRoot.classList.remove(cssClasses.REQUIRED);
          }
        }

        return true;
      });
    };

    const getAttributesList = (mutationsList: MutationRecord[]): string[] => {
      return mutationsList
          .map((mutation) => mutation.attributeName)
          .filter((attributeName) => attributeName) as string[];
    };
    const observer = new MutationObserver((mutationsList) => observerHandler(getAttributesList(mutationsList)));
    observer.observe(this.formElement, {attributes: true});
    this._validationObserver = observer;
  }

  /**
   * Recomputes the outline SVG path for the outline element.
   */
  public layout() {
    this.mdcFoundation.layout();
  }
}
