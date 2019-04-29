var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { customElement, query, html, property, observer } from "@material/mwc-base/base-element.js";
import { LitElement } from "lit-element";
import { ripple } from "@material/mwc-ripple/ripple-directive";
import { style } from "./mwc-list-item-css.js";
let ListItem = class ListItem extends LitElement {
    constructor() {
        super(...arguments);
        this.listIsExpanded = false;
        this.expandable = false;
        this.modal = false;
        this.value = "";
        this.label = "";
        this.icon = "";
        this.tabindex = 0;
        this.leading = 0;
        this.disabled = false;
    }
    get classList() {
        return this.mdcRoot.classList;
    }
    get setAttribute() {
        return this.mdcRoot ? this.mdcRoot.setAttribute : () => { };
    }
    changeWrapperStyles(wrapperWidth, wrapperLeft) {
        this.wrapper.style.width = wrapperWidth;
        this.wrapper.style.left = wrapperLeft;
    }
    closeListItem(e) {
        if (this.modal) {
            this.wrapper.classList.remove("mdc-list-item__wrapper--modal");
            this.modalContent.style.transform = "translateY(0)";
            setTimeout(() => {
                this.wrapper.style.top = "0";
                this.modalContent.style.top = "0";
                this.mdcRoot.classList.remove("mdc-list-item--modal");
                this.changeWrapperStyles("100%", "0");
                this.lockScrollFor("html", false);
                this.lockScrollFor("body", false);
            }, 1200);
        }
        e.stopPropagation();
    }
    firstUpdated() {
        this.mdcRootPosition = this.mdcRoot.getBoundingClientRect();
    }
    focus() {
        this.mdcRoot.focus();
    }
    lockScrollFor(element, status) {
        const el = document.querySelector(element);
        if (el) {
            el.style.height = status ? "100%" : "auto";
            el.style.overflow = status ? "hidden" : "auto";
        }
    }
    openModal() {
        if (this.modal) {
            this.lockScrollFor("html", true);
            this.lockScrollFor("body", true);
            setTimeout(() => {
                this.mdcRoot.classList.add("mdc-list-item--modal");
                this.changeWrapperStyles(`calc(100% + ${this.mdcRootPosition.left * 2}px)`, `-${this.mdcRootPosition.left}px`);
                this.wrapper.classList.add("mdc-list-item__wrapper--modal");
                this.modalContent.style.top = `${this.mdcRootPosition.top}px`;
                this.modalContent.style.transform = `translateY(-${this.mdcRootPosition.top}px)`;
                this.wrapper.style.top = `-${this.mdcRootPosition.top}px`;
            }, 170);
        }
    }
    render() {
        const { disabled, tabindex } = this;
        return html `
      <div
        class="mdc-list-item "
        role="menuitem"
        @click="${this.openModal}"
        tabindex="${tabindex}"
        aria-disabled="${this.modal ? true : disabled}"
        .ripple="${!this.expandable ? ripple({ unbounded: false }) : false}"
      >
        ${this.expandable
            ? html `
              <mwc-icon
                class="mdc-list-item__btn-expand"
                @click="${this.toggleList}"
              >
                ${this.listIsExpanded ? 'expand_less' : 'expand_more'}
              </mwc-icon>
            `
            : null}
        ${this._renderLeading()} ${this.label || ""}
        <slot name="text"></slot>
        <span class="mdc-list-item__text" @click="${this.toggleList}">
          <span class="mdc-list-item__primary-text">
            <slot name="primary-text"></slot>
          </span>
          <span class="mdc-list-item__secondary-text">
            <slot name="secondary-text"></slot>
          </span>
        </span>
        <span class="mdc-list-item__meta">
          <slot name="meta"></slot>
        </span>

        ${this.modal
            ? html `
              <div class="mdc-list-item__wrapper">
                <div class="mdc-list-item__modal-content">
                  <div>
                    <span
                      class="mdc-list-item__close"
                      @click="${this.closeListItem}"
                    ></span>
                    <slot name="expanded"></slot>
                  </div>
                </div>
              </div>
            `
            : null}
        ${this.expandable
            ? html `
              <div class="mdc-list-item__expanded-content">
                <div
                  class="mdc-list-item__expanded-content-wrapper ${this.leading
                ? "mdc-list-item__expanded-content-wrapper--aligned"
                : ""}"
                >
                  <slot name="expanded"></slot>
                </div>
              </div>
            `
            : null}

        <slot></slot>
      </div>
    `;
    }
    _renderLeading() {
        if (this.leading) {
            return html `
        <span class="mdc-list-item__graphic">
          <slot name="graphic"></slot>
        </span>
      `;
        }
        if (this.icon) {
            return html `
        <span class="mdc-list-item__graphic material-icons">
          ${this.icon}
        </span>
      `;
        }
        return "";
    }
    toggleList() {
        if (this.expandable) {
            this.listIsExpanded = !this.listIsExpanded;
            this.mdcRoot.classList.toggle("mdc-list-item--expanded");
        }
    }
};
ListItem.styles = style;
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "listIsExpanded", void 0);
__decorate([
    query(".mdc-list-item__modal-content")
], ListItem.prototype, "modalContent", void 0);
__decorate([
    query(".mdc-list-item__wrapper")
], ListItem.prototype, "wrapper", void 0);
__decorate([
    query(".mdc-list-item")
], ListItem.prototype, "mdcRoot", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "expandable", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "modal", void 0);
__decorate([
    property({ type: String })
], ListItem.prototype, "value", void 0);
__decorate([
    property({ type: String })
], ListItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ListItem.prototype, "icon", void 0);
__decorate([
    property({ type: Number })
], ListItem.prototype, "tabindex", void 0);
__decorate([
    property({ type: Boolean })
], ListItem.prototype, "leading", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (value) {
        this.setAttribute("aria-disabled", String(value));
    })
], ListItem.prototype, "disabled", void 0);
ListItem = __decorate([
    customElement("mwc-list-item")
], ListItem);
export { ListItem };
//# sourceMappingURL=mwc-list-item.js.map