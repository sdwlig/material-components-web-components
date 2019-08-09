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
import {css} from '@authentic/mwc-base/base-element';

export const style = css`/**
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
.mdc-list {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.009375em;
  text-decoration: inherit;
  text-transform: inherit;
  /* @alternate */
  line-height: 1.5rem;
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
  color: rgba(0, 0, 0, 0.87);
  /* @alternate */
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item__secondary-text {
  color: rgba(0, 0, 0, 0.54);
  /* @alternate */
  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));
}

.mdc-list-item__graphic {
  background-color: transparent;
}

.mdc-list-item__graphic {
  color: rgba(0, 0, 0, 0.38);
  /* @alternate */
  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));
}

.mdc-list-item__meta {
  color: rgba(0, 0, 0, 0.38);
  /* @alternate */
  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38));
}

.mdc-list-group__subheader {
  color: rgba(0, 0, 0, 0.87);
  /* @alternate */
  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
}

.mdc-list--dense {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 0.812rem;
}

.mdc-list-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  padding: 0 16px;
  overflow: hidden;
}
.mdc-list-item:focus {
  outline: none;
}

.mdc-list-item--selected,
.mdc-list-item--activated {
  color: #6200ee;
  /* @alternate */
  color: var(--mdc-theme-primary, #6200ee);
}
.mdc-list-item--selected .mdc-list-item__graphic,
.mdc-list-item--activated .mdc-list-item__graphic {
  color: #6200ee;
  /* @alternate */
  color: var(--mdc-theme-primary, #6200ee);
}

.mdc-list-item--disabled {
  color: rgba(0, 0, 0, 0.38);
  /* @alternate */
  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38));
}

.mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 32px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  fill: currentColor;
}
.mdc-list-item[dir=rtl] .mdc-list-item__graphic, [dir=rtl] .mdc-list-item .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 32px;
  /* @noflip */
  margin-right: 0;
}

.mdc-list .mdc-list-item__graphic {
  display: inline-flex;
}

.mdc-list-item__meta {
  /* @noflip */
  margin-left: auto;
  /* @noflip */
  margin-right: 0;
}
.mdc-list-item__meta:not(.material-icons) {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  text-decoration: inherit;
  text-transform: inherit;
}
.mdc-list-item[dir=rtl] .mdc-list-item__meta, [dir=rtl] .mdc-list-item .mdc-list-item__meta {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: auto;
}

.mdc-list-item__text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.mdc-list-item__text[for] {
  pointer-events: none;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  margin-bottom: -20px;
  display: block;
}
.mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list--dense .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list--dense .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 24px;
  content: "";
  vertical-align: 0;
}
.mdc-list--dense .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  text-decoration: inherit;
  text-transform: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  display: block;
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list--dense .mdc-list-item__secondary-text {
  display: block;
  margin-top: 0;
  /* @alternate */
  line-height: normal;
  font-size: inherit;
}
.mdc-list--dense .mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}

.mdc-list--dense .mdc-list-item {
  height: 40px;
}

.mdc-list--dense .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 36px;
  width: 20px;
  height: 20px;
}
.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic, [dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 36px;
  /* @noflip */
  margin-right: 0;
}

.mdc-list--avatar-list .mdc-list-item {
  height: 56px;
}

.mdc-list--avatar-list .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic, [dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 16px;
  /* @noflip */
  margin-right: 0;
}

.mdc-list--two-line .mdc-list-item__text {
  align-self: flex-start;
}

.mdc-list--two-line .mdc-list-item {
  height: 72px;
}

.mdc-list--two-line.mdc-list--dense .mdc-list-item,
.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {
  height: 60px;
}

.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 20px;
  width: 36px;
  height: 36px;
}
.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic, [dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
  /* @noflip */
  margin-left: 20px;
  /* @noflip */
  margin-right: 0;
}

:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {
  cursor: pointer;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-divider {
  height: 0;
  margin: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.mdc-list-divider {
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

.mdc-list-divider--padded {
  margin: 0 16px;
}

.mdc-list-divider--inset {
  /* @noflip */
  margin-left: 72px;
  /* @noflip */
  margin-right: 0;
  width: calc(100% - 72px);
}
.mdc-list-group[dir=rtl] .mdc-list-divider--inset, [dir=rtl] .mdc-list-group .mdc-list-divider--inset {
  /* @noflip */
  margin-left: 0;
  /* @noflip */
  margin-right: 72px;
}

.mdc-list-divider--inset.mdc-list-divider--padded {
  width: calc(100% - 72px - 16px);
}

.mdc-list-group .mdc-list {
  padding: 0;
}

.mdc-list-group__subheader {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: 0.009375em;
  text-decoration: inherit;
  text-transform: inherit;
  margin: 0.75rem 16px;
}

@keyframes mdc-ripple-fg-radius-in {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);
  }
  to {
    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
  }
}
@keyframes mdc-ripple-fg-opacity-in {
  from {
    animation-timing-function: linear;
    opacity: 0;
  }
  to {
    opacity: var(--mdc-ripple-fg-opacity, 0);
  }
}
@keyframes mdc-ripple-fg-opacity-out {
  from {
    animation-timing-function: linear;
    opacity: var(--mdc-ripple-fg-opacity, 0);
  }
  to {
    opacity: 0;
  }
}
.mdc-ripple-surface--test-edge-var-bug {
  --mdc-ripple-surface-test-edge-var: 1px solid #000;
  visibility: hidden;
}
.mdc-ripple-surface--test-edge-var-bug::before {
  border: var(--mdc-ripple-surface-test-edge-var);
}

:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {
  transform: scale(var(--mdc-ripple-fg-scale, 1));
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {
  top: 0;
  /* @noflip */
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {
  top: var(--mdc-ripple-top, 0);
  /* @noflip */
  left: var(--mdc-ripple-left, 0);
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {
  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {
  top: calc(50% - 100%);
  /* @noflip */
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {
  background-color: #000;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:hover::before {
  opacity: 0.04;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.12;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.12;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.12;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before {
  opacity: 0.12;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {
  background-color: #6200ee;
}
@supports not (-ms-ime-align: auto) {
  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {
    /* @alternate */
    background-color: var(--mdc-theme-primary, #6200ee);
  }
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {
  opacity: 0.16;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.24;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.24;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.24;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before {
  opacity: 0.08;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {
  background-color: #6200ee;
}
@supports not (-ms-ime-align: auto) {
  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {
    /* @alternate */
    background-color: var(--mdc-theme-primary, #6200ee);
  }
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {
  opacity: 0.12;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.2;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.2;
}
:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.2;
}

:not(.mdc-list--non-interactive) > .mdc-list-item--disabled {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::before {
  transform: scale(var(--mdc-ripple-fg-scale, 1));
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::after {
  top: 0;
  /* @noflip */
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--unbounded::after {
  top: var(--mdc-ripple-top, 0);
  /* @noflip */
  left: var(--mdc-ripple-left, 0);
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation::after {
  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation::after {
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {
  top: calc(50% - 100%);
  /* @noflip */
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::after {
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {
  background-color: #000;
}
:not(.mdc-list--non-interactive) > .mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.12;
}

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
.material-icons {
  font-family: var(--mdc-icon-font, "Material Icons");
  font-weight: normal;
  font-style: normal;
  font-size: var(--mdc-icon-size, 24px);
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

:host {
  width: 100%;
}

:host([aria-disabled=true]) > .mdc-list-item:focus::before {
  opacity: 0;
}

:host([modal]) {
  cursor: pointer;
}
:host([modal]) .mdc-list-item--modal {
  cursor: auto;
}

:host([accordion]) {
  cursor: pointer;
}
:host([accordion]) .mdc-list-item {
  flex-wrap: wrap;
  max-height: 55px;
  transition: max-height cubic-bezier(0.865, 0.14, 0.095, 0.87) 0.4s;
}
:host([accordion]) .mdc-list-item--accordion {
  max-height: 60em;
}
:host([accordion]) .mdc-list-item__text {
  flex: 1;
}

.mdc-list-item {
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  white-space: nowrap;
  height: auto;
  position: relative;
}
.mdc-list-item::before, .mdc-list-item::after {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}
.mdc-list-item::before {
  transition: opacity 15ms linear, background-color 15ms linear;
  z-index: 1;
}
.mdc-list-item.mdc-ripple-upgraded::before {
  transform: scale(var(--mdc-ripple-fg-scale, 1));
}
.mdc-list-item.mdc-ripple-upgraded::after {
  top: 0;
  /* @noflip */
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}
.mdc-list-item.mdc-ripple-upgraded--unbounded::after {
  top: var(--mdc-ripple-top, 0);
  /* @noflip */
  left: var(--mdc-ripple-left, 0);
}
.mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {
  animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards;
}
.mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {
  animation: mdc-ripple-fg-opacity-out 150ms;
  transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
}
.mdc-list-item::before, .mdc-list-item::after {
  top: calc(50% - 100%);
  /* @noflip */
  left: calc(50% - 100%);
  width: 200%;
  height: 200%;
}
.mdc-list-item.mdc-ripple-upgraded::after {
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}
.mdc-list-item::before, .mdc-list-item::after {
  background-color: #000;
}
.mdc-list-item:hover::before {
  opacity: 0.04;
}
.mdc-list-item:not(.mdc-ripple-upgraded):focus::before, .mdc-list-item.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.12;
}
.mdc-list-item:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-list-item:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.12;
}
.mdc-list-item.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.12;
}
.mdc-list-item--activated::before {
  opacity: 0.12;
}
.mdc-list-item--activated::before, .mdc-list-item--activated::after {
  background-color: #6200ee;
}
@supports not (-ms-ime-align: auto) {
  .mdc-list-item--activated::before, .mdc-list-item--activated::after {
    /* @alternate */
    background-color: var(--mdc-theme-primary, #6200ee);
  }
}
.mdc-list-item--activated:hover::before {
  opacity: 0.16;
}
.mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, .mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.24;
}
.mdc-list-item--activated.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.24;
}
.mdc-list-item--selected::before {
  opacity: 0.08;
}
.mdc-list-item--selected::before, .mdc-list-item--selected::after {
  background-color: #6200ee;
}
@supports not (-ms-ime-align: auto) {
  .mdc-list-item--selected::before, .mdc-list-item--selected::after {
    /* @alternate */
    background-color: var(--mdc-theme-primary, #6200ee);
  }
}
.mdc-list-item--selected:hover::before {
  opacity: 0.12;
}
.mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, .mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {
  transition-duration: 75ms;
  opacity: 0.2;
}
.mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {
  transition: opacity 150ms linear;
}
.mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {
  transition-duration: 75ms;
  opacity: 0.2;
}
.mdc-list-item--selected.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.2;
}
.mdc-list-item__btn-expand {
  position: absolute;
  right: 16px;
  top: 14px;
  font-family: "Material Icons" !important;
}
.mdc-list-item .mdc-list-item__text {
  text-align: left;
}
.mdc-list-item__invisible-block {
  width: 100%;
  height: 55px;
  display: none;
}
.mdc-list-item__invisible-block--modal {
  display: block;
}
.mdc-list-item--modal {
  overflow: hidden;
  white-space: normal;
  z-index: 10;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
}
.mdc-list-item--modal:before, .mdc-list-item--modal:after {
  background: none !important;
}
.mdc-list-item--modal .mdc-list-item__text {
  opacity: 0;
}
.mdc-list-item--modal .mdc-list-item__modal-close {
  display: block;
}
.mdc-list-item__modal-close {
  display: none;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 1;
  position: absolute;
  width: 25px;
  height: 25px;
  opacity: 0.3;
}
.mdc-list-item__modal-close:hover {
  opacity: 1;
}
.mdc-list-item__modal-close:before, .mdc-list-item__modal-close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 25px;
  width: 2px;
  background-color: #797878;
}
.mdc-list-item__modal-close:before {
  transform: rotate(45deg);
}
.mdc-list-item__modal-close:after {
  transform: rotate(-45deg);
}
.mdc-list-item__modal-content {
  display: flex;
  justify-content: center;
  opacity: 0;
  width: 100%;
  padding: 0;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
  height: 55px;
  background: #fff;
  margin: 0;
  transition: top 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0.15s, opacity 0.3s 0.25s, height 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}
.mdc-list-item__modal-content * {
  opacity: 0;
  transition: opacity 0.15s 0.15s;
}
.mdc-list-item__modal-wrapper {
  height: 0;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0);
  transition: background-color 0.3s 0.15s, height 0.2s 0.45s, top 0s 0.95s;
  width: 100%;
}
.mdc-list-item__modal-wrapper--open {
  height: 100vh;
  transition: background-color 0.15s 0.15s;
  background: rgba(0, 0, 0, 0.5);
}
.mdc-list-item__modal-wrapper--open .mdc-list-item__modal-content {
  opacity: 1;
  height: 100vh;
  transition: top 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s, opacity 0.25s 0.1s, height 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}
.mdc-list-item__modal-wrapper--open .mdc-list-item__modal-content * {
  opacity: 1;
  transition: opacity 0.3s 0.3s;
}
.mdc-list-item--accordion:before, .mdc-list-item--accordion:after {
  background: none;
}
.mdc-list-item__accordion-content {
  display: block;
  position: relative;
  top: auto;
  left: auto;
  width: 100%;
  margin-left: 1px;
}
.mdc-list-item__accordion-content-wrapper {
  margin-left: -17px;
}
.mdc-list-item__accordion-content-wrapper--aligned {
  margin-left: 39px;
}

.mdc-list-item--selected,
.mdc-list-item--activated {
  color: #6200ee;
  /* @alternate */
  color: var(--mdc-theme-primary, #6200ee);
}
.mdc-list-item--selected .mdc-list-item__graphic,
.mdc-list-item--activated .mdc-list-item__graphic {
  color: #6200ee;
  /* @alternate */
  color: var(--mdc-theme-primary, #6200ee);
}`;
