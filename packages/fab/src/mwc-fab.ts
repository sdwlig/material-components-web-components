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
  customElement,
  classMap
} from '@material/mwc-base/base-element';
import { ripple } from '@material/mwc-ripple/ripple-directive';

import { style } from './mwc-fab-css';

import '@material/mwc-icon/mwc-icon-font';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-fab': Fab;
  }
}

@customElement('mwc-fab' as any)
export class Fab extends LitElement {

  /**
   * Optional. Default value to false. Modifies the FAB to a smaller size
   */
  @property({ type: Boolean })
  mini = false;

  /**
   * Optional. Default value to false. Animates the FAB out of view
   */
  @property({ type: Boolean })
  exited = false;

  /**
   * Optional. Default value to false. Removes ability to interacted with and have no visual interaction effect
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Optional. Default value to false. Modifies the FAB to wider size and the extended FAB must contain label 
   */
  @property({ type: Boolean })
  extended = false;

  /**
   * Optional. Default value to false. Display an icon at the end of the FAB
   */
  @property({ type: Boolean })
  showIconAtEnd = false;

  /**
   * Mandatory. Indicates the element containing the fab's icon.
   */
  @property()
  icon = '';

  /**
   * Optional. Indicates the element containing the fab's text label
   */
  @property()
  label = '';

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
      'mdc-fab--mini': this.mini,
      'mdc-fab--exited': this.exited,
      'mdc-fab--extended': this.extended,
    };
    const showLabel = this.label !== '' && this.extended;
    return html`
      <button .ripple="${ripple()}" class="mdc-fab ${classMap(classes)}" ?disabled="${this.disabled}" aria-label="${this.label || this.icon}">
        ${showLabel && this.showIconAtEnd ? this.label : ''}
        ${this.icon ? html`<span class="material-icons mdc-fab__icon">${this.icon}</span>` : ''}
        ${showLabel && !this.showIconAtEnd ? this.label : ''}
      </button>`;
  }
}
