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
  addHasRemoveClass,
  query,
  html,
  property,
  observer,
  emit,
  findAssignedElement
} from '@material/mwc-base/base-element';
import { MDCMenuFoundation, MDCMenuAdapter, Corner } from '@material/menu';
import { cssClasses, DefaultFocusState } from '@material/menu/constants';
import { MDCMenuSurface, MDCMenuSurfaceFactory } from '@material/menu-surface/component';
import MDCMenuSurfaceFoundation from '@material/menu-surface/foundation';
import { MDCMenuDistance } from '@material/menu-surface/types';
import { List as MWCList } from '@material/mwc-list/mwc-list';
import { strings as listStrings } from '@material/mwc-list/_constants';

import { style } from './mwc-menu-css';

const menuSurfaceFactory: MDCMenuSurfaceFactory = el => new MDCMenuSurface(el);

export const EVENTS = {
  selected: 'selected'
};

@customElement('mwc-menu' as any)
export class Menu extends BaseElement {

  @query('.mdc-menu')
  protected mdcRoot!: HTMLElement;

  @query('slot')
  protected slotEl!: HTMLSlotElement;

  @property({ type: Boolean })
  @observer(function (this: Menu, value: boolean) {
    if (this._menuSurface && this._menuSurface.open !== value) {
      this._menuSurface.open = value;
    }
  })
  public open = false;

  @property({ type: Boolean })
  @observer(function (this: Menu, value: boolean) {
    if (this._menuSurface) {
      this._menuSurface.quickOpen = value;
    }
  })
  public quickOpen = false;

  @property({ type: Boolean })
  @observer(function (this: Menu, value: boolean) {
    if (this.listEl) {
      this.listEl.wrapFocus = value;
    }
  })
  public wrapFocus = false;

  public get Corner() {
    return Corner;
  }

  /**
   * Return the items within the menu. Note that this only contains the set of elements within
   * the items container that are proper list items, and not supplemental / presentational DOM
   * elements.
   */
  get items(): Element[] {
    return this.listEl ? this.listEl.listElements as Element[] : [];
  }

  protected get listEl() {
    return this.slotEl && findAssignedElement(this.slotEl, 'mwc-list') as MWCList;
  }

  protected _menuSurface!: MDCMenuSurface;

  protected _handleKeydown = this._onKeydown.bind(this) as EventListenerOrEventListenerObject;

  protected _handleItemAction = this._onItemAction.bind(this) as EventListenerOrEventListenerObject;

  protected _handleMenuSurfaceOpened = this._onMenuSurfaceOpened.bind(this) as EventListener;

  protected _handleMenuSurfaceClosed = this._onMenuSurfaceClosed.bind(this) as EventListener;

  protected mdcFoundationClass = MDCMenuFoundation;

  protected mdcFoundation!: MDCMenuFoundation;

  protected createAdapter(): MDCMenuAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      addClassToElementAtIndex: (index, className) => {
        const list = this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: (index, className) => {
        const list = this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: (index, attr, value) => {
        const list = this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: (index, attr) => {
        const list = this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: (element, className) => element.classList.contains(className),
      closeSurface: () => this.open = false,
      getElementIndex: (element) => {
        return this.items.indexOf(element)
      },
      getParentElement: (element) => element.parentElement,
      getSelectedElementIndex: (selectionGroup) => {
        const selectedListItem = selectionGroup.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);
        return selectedListItem ? this.items.indexOf(selectedListItem) : -1;
      },
      notifySelected: (evtData) => {
        emit(this, EVENTS.selected, {
          index: evtData.index,
          item: this.items[evtData.index],
        }, true)
      },
      getMenuItemCount: () => this.items.length,
      focusItemAtIndex: (index) => {
        this.listEl.focusItemAtIndex(index, true);
      },
      focusListRoot: () => this.listEl.focus()
    }
  }

  static styles = style;

  render() {
    return html`
      <div class="mdc-menu mdc-menu-surface">
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    this._menuSurface = menuSurfaceFactory(this.mdcRoot);

    super.firstUpdated();

    this._menuSurface.listen(MDCMenuSurfaceFoundation.strings.OPENED_EVENT, this._handleMenuSurfaceOpened);
    this._menuSurface.listen(MDCMenuSurfaceFoundation.strings.CLOSED_EVENT, this._handleMenuSurfaceClosed);

    if (this.listEl) {
      this.listEl.addEventListener('keydown', this._handleKeydown);
      this.listEl.addEventListener(listStrings.ACTION_EVENT, this._handleItemAction);
    }
  }

  protected _onKeydown(evt) {
    this.mdcFoundation.handleKeydown(evt);
  }

  protected _onItemAction(evt) {
    this.mdcFoundation.handleItemAction(this.items[evt.detail.listIndex]);
  }

  protected _onMenuSurfaceOpened(evt) {
    this.mdcFoundation.handleMenuSurfaceOpened();
    emit(this, evt.type, evt.detail, true);
  }

  protected _onMenuSurfaceClosed(evt) {
    this.open = false;
    emit(this, evt.type, evt.detail, true);
  }

  /**
   * Sets default focus state where the menu should focus every time when menu
   * is opened. Focuses the list root (`DefaultFocusState.LIST_ROOT`) element by
   * default.
   * @param focusState Default focus state.
   */
  setDefaultFocusState(focusState: DefaultFocusState) {
    this.mdcFoundation.setDefaultFocusState(focusState);
  }

  /**
   * @param corner Default anchor corner alignment of top-left menu corner.
   */
  setAnchorCorner(corner: Corner) {
    this._menuSurface.setAnchorCorner(corner);
  }

  setAnchorMargin(margin: Partial<MDCMenuDistance>) {
    this._menuSurface.setAnchorMargin(margin);
  }

  /**
   * @return The item within the menu at the index specified.
   */
  getOptionByIndex(index: number): Element | null {
    const items = this.items;

    if (index < items.length) {
      return this.items[index];
    } else {
      return null;
    }
  }

  setFixedPosition(isFixed: boolean) {
    this._menuSurface.setFixedPosition(isFixed);
  }

  hoistMenuToBody() {
    this._menuSurface.hoistMenuToBody();
  }

  setIsHoisted(isHoisted: boolean) {
    this._menuSurface.setIsHoisted(isHoisted);
  }

  setAbsolutePosition(x: number, y: number) {
    this._menuSurface.setAbsolutePosition(x, y);
  }

  /**
   * Sets the element that the menu-surface is anchored to.
   */
  setAnchorElement(element: Element) {
    this._menuSurface.anchorElement = element;
  }
}
