import { BaseElement, customElement, html, query, property, queryAll, classMap, observer } from '@material/mwc-base/base-element'
import { emit, findAssignedElements, addHasRemoveClass } from '@material/mwc-base/utils'
import { MDCDialogFoundation } from '@material/dialog/foundation'
import { MDCDialogAdapter } from '@material/dialog/adapter'
import { Button as MWCButton } from '@material/mwc-button'
import { ripple } from '@material/mwc-ripple/ripple-directive'
import { closest, matches } from '@material/dom/ponyfill'
import { strings } from '@material/dialog/constants'
import { styleMap } from 'lit-html/directives/style-map'

// Temporal solution due to focus-trap incompatibility
import { areTopsMisaligned, isScrollable } from './util'

import { style } from './mwc-dialog-css'

const LAYOUT_EVENTS = ['resize', 'orientationchange']

declare global {
  interface HTMLElementTagNameMap {
    'mwc-dialog': Dialog;
  }

  interface Document {
    $blockingElements: {
      push(HTMLElement): void;
      remove(HTMLElement): Boolean;
    }
  }
}

@customElement('mwc-dialog' as any)
export class Dialog extends BaseElement {
  @query('.mdc-dialog')
  protected mdcRoot!: HTMLElement;

  @query('.mdc-dialog__container')
  protected containerEl!: HTMLElement;

  @query('.mdc-dialog__content')
  protected contentEl!: HTMLElement;

  @query('.mdc-dialog__scrim')
  protected scrimEl!: HTMLElement;

  @queryAll('[data-mdc-dialog-action]')
  protected buttons!: MWCButton[];

  @query('slot[name="footer"]')
  protected footerSlot!: HTMLSlotElement;

  @property({ type: String })
  public headerLabel = '';

  @property({ type: String })
  public acceptLabel = 'accept';

  @property({ type: String })
  public declineLabel = 'cancel';

  @property({ type: String })
  public defaultAction = 'accept';

  @property({ type: Boolean })
  public scrollable = false;

  @property({ type: Boolean })
  public popover = false;

  @property({ type: String })
  public popoverSize = 'large';

  @property({ type: String })
  protected popoverStyles = {};

  @property({ type: String })
  @observer(function (this: Dialog, value: string) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setEscapeKeyAction(value)
    }
  })
  public escapeKeyAction = strings.CLOSE_ACTION;

  @property({ type: String })
  @observer(function (this: Dialog, value: string) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setScrimClickAction(value)
    }
  })
  public scrimClickAction = strings.CLOSE_ACTION;

  @property({ type: Boolean })
  @observer(function (this: Dialog, value: boolean) {
    if (this.mdcFoundation) {
      this.mdcFoundation.setAutoStackButtons(value)
    }
  })
  public autoStackButtons = true;

  @property({ type: String })
  for = '';

  protected controller_: HTMLElement | null = this.mdcRoot;

  public get isOpen() {
    return this.mdcFoundation.isOpen()
  }

  protected get _buttons(): MWCButton[] {
    const actionButtons = [...this.buttons] || []
    const slottedButtons = this.footerSlot
      ? findAssignedElements(this.footerSlot, '*')
        .filter(node => node instanceof MWCButton)
      : []

    return [
      ...actionButtons,
      ...slottedButtons
    ] as MWCButton[]
  }

  protected get _defaultButton() {
    return this._buttons.find(item => item.hasAttribute('data-mdc-dialog-default-action'))
  }

  // Commented due to focus-trap incompatibility
  // protected _focusTrap!: FocusTrap;

  protected _handleInteraction = this._onInteraction.bind(this) as EventListenerOrEventListenerObject;

  protected _handleDocumentKeydown = this._onDocumentKeydown.bind(this) as EventListenerOrEventListenerObject;

  protected _handleLayout = this._onLayout.bind(this) as EventListenerOrEventListenerObject;

  protected _handleOpening = this._onOpening.bind(this) as EventListenerOrEventListenerObject;

  protected _handleClosing = this._onClosing.bind(this) as EventListenerOrEventListenerObject;

  protected mdcFoundation!: MDCDialogFoundation;

  protected readonly mdcFoundationClass = MDCDialogFoundation;

  protected calcPosition() {
    const gap = 20;
    this.controller_ = this.for === '' ? this.parentElement : this.parentElement!.querySelector(`#${this.for}`)

    this.mdcRoot.classList.add('mdc-dialog--popover-show')
    const rootPosition = this.mdcRoot.getBoundingClientRect()
    const controllerPosition = this.controller_ != null ? this.controller_.getBoundingClientRect() : {} as DOMRect
    // console.log(controllerPosition, 'controller_ getBoundingClientRect')

    this.mdcRoot.classList.remove('mdc-dialog--popover-show')
    const { top, left } = controllerPosition

    const leftMargin = left

    const rightMargin = window.innerWidth - +leftMargin - rootPosition.width
    
    console.log(left, 'controller left');
    console.log(leftMargin, 'leftMargin');
    console.log(rightMargin, 'rightMargin');
    console.log(rootPosition.width, 'rootPosition.width');

    if (rightMargin < leftMargin) {
      console.log(+left - rootPosition.width - gap, 'to the left');
      return { top: (top + 'px'), left: ((+left - rootPosition.width - gap) + 'px') }
    } else {
      console.log(window.innerWidth - rightMargin + gap, 'to the right ');
      return { top: (top + 'px'), left: ((window.innerWidth - rightMargin + gap) + 'px') }
    }
  }

  protected createAdapter(): MDCDialogAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      addBodyClass: className => document.body.classList.add(className),
      areButtonsStacked: () => areTopsMisaligned(this._buttons),
      clickDefaultButton: () => this._defaultButton && this._defaultButton.click(),
      eventTargetMatches: (target, selector) => target ? matches(target as Element, selector) : false,
      getActionFromEvent: (evt: Event) => {
        if (!evt.target) {
          return ''
        }
        const element = closest(evt.target as Element, `[${strings.ACTION_ATTRIBUTE}]`)
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE)
      },
      isContentScrollable: () => isScrollable(this.contentEl) && this.scrollable,
      notifyClosed: action => emit(this, strings.CLOSED_EVENT, action ? { action } : {}),
      notifyClosing: action => emit(this, strings.CLOSING_EVENT, action ? { action } : {}),
      notifyOpened: () => emit(this, strings.OPENED_EVENT, {}),
      notifyOpening: () => emit(this, strings.OPENING_EVENT, {}),
      releaseFocus: () => {
        document.$blockingElements.remove(this)
      },
      removeBodyClass: className => document.body.classList.remove(className),
      reverseButtons: () => {
        this._buttons.reverse()
        this._buttons.forEach((button) => {
          button.parentElement!.appendChild(button)
        })
      },
      trapFocus: () => {
        document.$blockingElements.push(this)

        if (this._defaultButton) {
          this._defaultButton.focus()
        }
      }
    }
  }

  static styles = style;

  _renderButton(label: String, action: String) {
    const classes = {
      'mdc-button': true,
      'mdc-dialog__button': true
    }

    return html`
      <button
        type="button"
        class="${classMap(classes)}"
        data-mdc-dialog-action="${action}"
        ?data-mdc-dialog-default-action="${this.defaultAction === action}"
        .ripple="${ripple({ unbounded: false })}"
      >
        <span class="mdc-button__label">${label}</span>
      </button>
    `
  }

  render() {
    const { headerLabel, acceptLabel, declineLabel } = this

    return html`
      <aside
        class="mdc-dialog ${this.popover ? 'mdc-dialog--popover' : ''} mdc-dialog--popover-${this.popoverSize}"
        style="${styleMap(this.popoverStyles)}"
        role="alertdialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
      >
        <div class="mdc-dialog_container">
          <div class="mdc-dialog__surface">
            <header class="mdc-dialog__header">
              <h2 id="dialog-title" class="mdc-dialog__title">${headerLabel}</h2>
              <slot name="header"></slot>
            </header>
            <section id="dialog-content" class="mdc-dialog__content">
              <slot></slot>
            </section>
            <footer class="mdc-dialog__actions">
              <slot name="footer"></slot>
              ${this._renderButton(declineLabel, 'cancel')}
              ${this._renderButton(acceptLabel, 'accept')}
            </footer>
          </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
      </aside>
    `
  }

  firstUpdated() {
    super.firstUpdated()

    if (this.popover) {
      this.popoverStyles = this.calcPosition()
    }

    this.mdcRoot.addEventListener('click', this._handleInteraction)
    this.addEventListener('keydown', this._handleInteraction)
    this.addEventListener(strings.OPENING_EVENT, this._handleOpening)
    this.addEventListener(strings.CLOSING_EVENT, this._handleClosing)
  }

  open() {
    this.mdcFoundation.open()
  }

  close(action = '') {
    this.mdcFoundation.close(action)
  }

  _onInteraction(evt: MouseEvent | KeyboardEvent) {
    this.mdcFoundation.handleInteraction(evt)
  }

  _onDocumentKeydown(evt: KeyboardEvent) {
    this.mdcFoundation.handleDocumentKeydown(evt)
  }

  _onLayout() {
    this.mdcFoundation.layout()
  }

  _onOpening() {
    LAYOUT_EVENTS.forEach(evtType => window.addEventListener(evtType, this._handleLayout))
    document.addEventListener('keydown', this._handleDocumentKeydown)
  }

  _onClosing() {
    LAYOUT_EVENTS.forEach(evtType => window.removeEventListener(evtType, this._handleLayout))
    document.removeEventListener('keydown', this._handleDocumentKeydown)
  }
}
