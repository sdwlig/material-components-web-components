/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCFoundation from '@material/base/foundation';
import { MDCTooltipAdapter } from './adapter';
import { cssClasses } from './constants';

/**
 * @extends {MDCFoundation<!MDCTooltipAdapter>}
 */
export class MDCTooltipFoundation extends MDCFoundation {
    /** @return enum {cssClasses} */
    static get cssClasses() {
        return cssClasses;
    }

  /** @return {!MDCTooltipAdapter} */
    static get defaultAdapter() {
        return /** @type {!MDCTooltipAdapter} */ ({
            addClass: (/* className: string */) => {},
            removeClass: (/* className: string */) => {},
            getClassList: () => /* [classNames: string] */ [],
            getRootWidth: () => /* type: number */ 0,
            getRootHeight: () => /* type: number */ 0,
            getControllerWidth: () => /* type: number */ 0,
            getControllerHeight: () => /* type: number */ 0,
            getControllerBoundingRect: () => /* {width: number, height: number} */
                ({width: 0, height: 0, offsetTop: 0, offsetBottom: 0}),
            setStyle: (/* propertyName: string, value: string */) => {},
        });
    }

  constructor(adapter) {
    super(Object.assign(MDCTooltipFoundation.defaultAdapter, adapter));

    /** @private {boolean} */
    this.displayed_ = false;

    /** @private {?string} */
    this.direction_ = null;

    /** @private {?string} */
    this.placement = 'below';

    /** @private {?number} */
    this.showTimeout_ = null;

    /** @private {boolean} */
    this.checkHideFlag_ = false;

    /** @public {number} */
    this.gap = 12;

    /** @public {number} */
    this.showDelay = 1500;
  }

  /**
   * Touch End handler to hide the tooltip.
   */
  handleTouchEnd() {
    this.hide();
  }

  /**
   * Blur handler to hide the tooltip.
   */
  handleBlur() {
    this.hide();
  }

  /**
   * Mouse Leave handler to hide the tooltip.
   */
  handleMouseLeave() {
    this.hide();
  }

  /**
   * Touch Start handler to show the tooltip delayed.
   */
  handleTouchStart() {
    this.showDelayed();
  }

  /**
   * Focus handler to show the tooltip delayed.
   */
  handleFocus() {
    this.showDelayed();
  }

  /**
   * Mouse Enter handler to show the tooltip delayed.
   */
  handleMouseEnter() {
    this.showDelayed();
  }

  /**
   * Click handler to hide tooltip on user action.
   */
  handleClick() {
    this.hide();
  }

  calcPosition_() {
    const ctrlRect = this.adapter_.getControllerBoundingRect();

    const tooltipHeight = this.adapter_.getRootHeight();
    const tooltipWidth = this.adapter_.getRootWidth();
    const ctrlOffsetTop = ctrlRect.top;
    const ctrlOffsetLeft = ctrlRect.left;
    const ctrlHeight = this.adapter_.getControllerHeight();
    const ctrlWidth = this.adapter_.getControllerWidth();

    let top = ctrlOffsetTop + ctrlHeight / 2 - tooltipHeight / 2;
    let left = ctrlOffsetLeft + ctrlWidth / 2 - tooltipWidth / 2;

    if (this.placement.includes('above')) {
      top = ctrlOffsetTop - tooltipHeight - this.gap;
    }
    if (this.placement.includes('before')) {
      left = ctrlOffsetLeft - tooltipWidth - this.gap;
    }
    if (this.placement.includes('after')) {
      left = ctrlOffsetLeft + ctrlWidth + this.gap;
    }
    if (this.placement.includes('below')) {
      top = ctrlOffsetTop + ctrlHeight + this.gap;
    }
    // TODO: Implement RTL logic

    return {
      top,
      left,
    };
  }

  setDirection_() {
    this.resetPlacement();
    let placements = this.placement.split(' ');
    placements.forEach((dir) => this.adapter_.addClass(cssClasses['PLACEMENT_'+dir]));

    const calculatedPos = this.calcPosition_();
    this.adapter_.setStyle('top', calculatedPos.top.toString() + 'px');
    this.adapter_.setStyle('left', calculatedPos.left.toString() + 'px');
  }

  resetPlacement() {
    this.adapter_.removeClass(cssClasses.PLACEMENT_BELOW);
    this.adapter_.removeClass(cssClasses.PLACEMENT_ABOVE);
    this.adapter_.removeClass(cssClasses.PLACEMENT_BEFORE);
    this.adapter_.removeClass(cssClasses.PLACEMENT_AFTER);
  }

  showDelayed() {
    this.checkHideFlag_ = false;
    this.showTimeout_ = setTimeout(() => {
      if (!this.checkHideFlag_) {
        this.show();
      }
    }, this.showDelay);
  }

  show() {
    this.setDirection_();
    this.displayed_ = true;
    this.adapter_.addClass(cssClasses.SHOW);
  }

  hide() {
    this.checkHideFlag_ = true;
    clearTimeout(this.showTimeout_);

    this.adapter_.addClass(cssClasses.ANIMATION);
    this.adapter_.removeClass(cssClasses.SHOW);
    this.displayed_ = false;
  }

  destroy() {
    clearTimeout(this.showTimeout_);
    this.showTimeout_ = null;
  }
}

export default MDCTooltipFoundation;
