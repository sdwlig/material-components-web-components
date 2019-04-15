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
  LitElement,
  html,
  property,
  query,
  customElement,
  classMap,
} from '@material/mwc-base/base-element.js';
import { List as MWCList } from './mwc-list';

// import { closest, matches } from '@material/dom/ponyfill';
// import { ripple } from '@material/mwc-ripple/ripple-directive';
// import { strings, cssClasses } from '@material/list/constants';
import { style } from './mwc-list-item-css';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-list-item': ListItem;
  }
}

@customElement('mwc-list-item' as any)
export class ListItem extends LitElement {

  @query('.mdc-list-item')
  protected mdcRoot!: HTMLElement;

  @property({type: String})
  variant = 'single-line';

  @property({type: Boolean})
  disabled = false;

  @property({type: Boolean})
  focused = false;

  @property({type: Boolean})
  selected = false;

  @property({type: Boolean})
  activated = false;

  @property({type: Boolean})
  checkbox = false;

  @property({type: Boolean})
  radio = false;

  @property({type: Boolean})
  trailingInput = false;

  @property({type: Number})
  tabindex = -1;

  protected _lines = 1;
  protected _ripple = false;
  protected _avatarList = false;
  protected _nonInteractive = false;
  protected _inputType = 'none';
  protected _inputAction = '';

  static styles = style;

  render() {
    const classes = {
      "mdc-list-item" : true,
      "mdc-list-item__avatar-list": this._avatarList,
      "mdc-list-item__two-line": this._lines === 2,
      "mdc-list-item--disabled": this.disabled,
      "mdc-list-item--non-interactive": this._nonInteractive,
      "mdc-list-item--selected": this.selected,
      "mdc-list-item--activated": this.activated,
    };
    const arias = {
      "aria-current" : this.focused,
      "aria-selected" : this.selected || this.activated,

    }
    return html`
      <li
        class="${classMap(classes)}"
        tabindex="${this.tabindex}"
        ${classMap(arias)}>
        ${this.renderGraphic()}
        <span class="mdc-list-item__text">
          ${this._lines === 1 ? this.renderSingleLine() : this.renderDoubleLine()}
        </span>
        ${this.renderMeta()}
      </li>
    `;
  }

  firstUpdated(changed) {
    super.firstUpdated(changed);

    this.updateComplete
      .then(() => {
        this.setParentType();
      });
  }


  renderSingleLine() {
    return html`
      <slot></slot>
    `;
  }

  renderDoubleLine() {
    return html`
      <span class="mdc-list-item__primary-text"><slot></slot></span>
      <span class="mdc-list-item__secondary-text"><slot name='secondary'></slot></span>
    `;
  }

  renderGraphic() {
    return html`
      <span class="mdc-list-item__graphic"><slot name='graphic'></slot></span>
    `;
  }

  renderMeta() {
    return html`
      <span class="mdc-list-item__meta"><slot name='meta'></slot></span>
    `;
  }

  public addClass(className) {
    this.mdcRoot.classList.add(className)
  }

  public removeClass(className) {
    this.mdcRoot.classList.remove(className)
  }

  public getAttribute(attr) {
    return this[attr];
  }

  public setAttribute(attr, value) {
    this[attr] = value;
  }

  public setFocused(focus:boolean) {
    if (focus) {
      // TODO: children of this will be focusable with tabindex
    } else {
      // TODO: children need to have their tabindex set to -1
    }
  }

  public setParentType(parentElement = this.parentElement) {
    if (parentElement instanceof MWCList) {
      this._lines = parentElement.lines;
      this._ripple = parentElement.ripple;
      this._avatarList = parentElement.avatarList;
      this._nonInteractive = parentElement.nonInteractive;
      this._inputType = parentElement.inputType;
      this._inputAction = parentElement.inputAction;
      this.requestUpdate();
    }
  }

}
