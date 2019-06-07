/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { MDCFoundation } from '@material/base/foundation';
import { MDCTooltipAdapter } from './adapter';
export declare class MDCTooltipFoundation extends MDCFoundation<MDCTooltipAdapter> {
    static readonly cssClasses: {
        ROOT: string,
        SHOW: string,
        ANIMATION: string,
        PLACEMENT_BELOW: string,
        PLACEMENT_AFTER: string,
        PLACEMENT_BEFORE: string,
        PLACEMENT_ABOVE: string,
    };
    /** The default Adapter for the switch. */
    static readonly defaultAdapter: MDCTooltipAdapter;
    constructor(adapter?: Partial<MDCTooltipAdapter>);
    handleTouchEnd(): void;
    handleBlur(): void;
    handleMouseLeave(): void;
    handleTouchStart(): void;
    handleFocus(): void;
    handleMouseEnter(): void;
    handleClick(): void;
    calcPosition_(): {
      top: number,
      left: number,
    };
    setDirection_(): void;
    resetPlacement(): void;
    showDelayed(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}
export default MDCTooltipFoundation;
