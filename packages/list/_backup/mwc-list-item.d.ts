import { LitElement } from "lit-element";
import { TemplateResult } from "lit-html";
declare global {
    interface HTMLElementTagNameMap {
        "mwc-list-item": ListItem;
    }
}
export declare class ListItem extends LitElement {
    mdcRootPosition: any;
    protected listIsExpanded: boolean;
    modalContent: HTMLElement;
    wrapper: HTMLElement;
    mdcRoot: HTMLElement;
    expandable: boolean;
    modal: boolean;
    value: string;
    label: string;
    icon: string;
    tabindex: number;
    leading: number;
    disabled: boolean;
    readonly classList: DOMTokenList;
    readonly setAttribute: (qualifiedName: string, value: string) => void;
    static styles: import("lit-element").CSSResult;
    protected changeWrapperStyles(wrapperWidth: string, wrapperLeft: string): void;
    protected closeListItem(e: any): void;
    firstUpdated(): void;
    focus(): void;
    protected lockScrollFor(element: string, status: boolean): void;
    protected openModal(): void;
    render(): TemplateResult;
    _renderLeading(): TemplateResult | string;
    protected toggleList(): void;
}
