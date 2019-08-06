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
import { LitElement, html, property, customElement, classMap } from '@material/mwc-base/base-element';
import { ripple } from '@material/mwc-ripple/ripple-directive';

import { style } from './mwc-button-css';

import '@material/mwc-icon/mwc-icon-font';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-button': Button;
  }
}

@customElement('mwc-button' as any)
export class Button extends LitElement {

  /**
   * Optional. Default value sets to false. Styles a contained button that is elevated above the surface.
   */
  @property({ type: Boolean })
  raised = false;

  /**
   * Optional. Default value sets to false. Styles a contained button that is flush with the surface.
   */
  @property({ type: Boolean })
  unelevated = false;

  /**
   * Optional. Default value sets to false. Styles an outlined button that is flush with the surface.
   */
  @property({ type: Boolean })
  outlined = false;

  /**
   * Optional. Default value sets to false. Makes the button text and container slightly smaller.
   */
  @property({ type: Boolean })
  dense = false;

  /**
   * Optional. Default value sets to false. Removes ability to interacted with and have no visual interaction effect
   */
  @property({type: Boolean, reflect: true})
  disabled = false;

  /**
   * Optional. Default value sets to false. Use to display an icon after the button's text label
   */
  @property({ type: Boolean })
  trailingIcon = false;

  /**
   * Optional. Indicates the element containing the button's icon.
   */
  @property()
  icon = '';

  /**
   * Recommended. Indicates the element containing the button's text label
   */
  @property()
  label = '';

  /**
   * Optional. The href is use to specifies the link's destination
   */
  @property({ type: String, reflect: true })
  href = '';

  /**
   * Optional. Default value sets to _self. Use to specifies where to open the linked document. You can use one of the following values: _blank|_self|_parent|_top|framename
   */
  @property({ type: String, reflect: true })
  target = '_self';

  /**
   * Returns the node into which the element should render and by default creates and returns an open shadowRoot
   */
  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static styles = style;

  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    const classes = {
      'mdc-button': true,
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense,
    };
    
    const mdcButtonIcon = html`
      <i class="material-icons mdc-button__icon" aria-hidden="true">${this.icon}</i>
    `;

    return html`
      ${this.href
        ? html`
          <a
            .ripple="${ripple({ unbounded: false })}"
            class="${classMap(classes)}"
            ?disabled="${this.disabled}"
            aria-label="${this.label || this.icon}"
            href="${this.href}"
            target="${this.target}"
          >
            ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
            <span class="mdc-button__label">${this.label}</span>
            ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
            <slot></slot>
          </a>
        `
        : html`
          <button
            .ripple="${ripple({ unbounded: false })}"
            class="${classMap(classes)}"
            ?disabled="${this.disabled}"
            aria-label="${this.label || this.icon}"
          >
            ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
            <span class="mdc-button__label">${this.label}</span>
            ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
            <slot></slot>
          </button>
        `
      }
    `;
  }
}
