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
import { LitElement, customElement, query, property, html, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { findAssignedElement } from '@material/mwc-base/utils';
import { observer } from '@material/mwc-base/observer';

import { style } from './mwc-table-css';

// elements to be registered ahead of time
import '@material/mwc-icon/mwc-icon-font';
import '@material/mwc-circular-progress/mwc-circular-progress';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-table': Table;
  }
}

export interface IDataItem {
  [name: string]: any;
}

export interface IColumnItem {
  title: string;
  field: string;
  align?: string;
}

export interface ICellItem {
  field: string;
  value: string;
  align?: string;
}

@customElement('mwc-table')
export class Table extends LitElement {

  @query('.mwc-table')
  protected mdcRoot!: HTMLElement;

  @query('slot')
  protected slotEl!: HTMLSlotElement;

  @query('mwc-circular-progress')
  protected progressEl!: HTMLElement;

  @property({ type: String })
  public padding = 'default';

  @property({ type: Number })
  public progressSize = 32;

  @property({ /* type: String|Array */ })
  @observer(function(this: Table, value: any) {
    this._parsedColumns = this._parseData(value);
  })
  public columns;

  @property({ type: String })
  public columnsBreakChar = ',';

  @property({ /* type: String|Array|Function */ })
  @observer(async function(this: Table, value: any) {
    this._parsedData = value instanceof Function
      ? await this._loadData(value)
      : this._parseData(value);
  })
  public data;

  protected get templateEl() {
    return this.slotEl && findAssignedElement(this.slotEl, 'template') as HTMLTemplateElement;
  }

  protected get shouldCreateTableFromData() {
    return this.data || this.columns;
  }

  protected _isLoading!: boolean;
  protected _parsedColumns!: IColumnItem[];
  protected _parsedData!: ICellItem[];
  protected _desiredPadding: string = '';

  static styles = style;

  firstUpdated() {
    this.updateComplete
      .then(() => {
        this.requestUpdate();
      });
  }

  render() {
    const classes = {
      'mwc-table': true,
    };

    return html`
      <div class="${classMap(classes)}">
        ${this.shouldCreateTableFromData ? this._createTableFromData() : this._createTableFromTemplate()}
        <slot></slot>
      </div>
    `;
  }

  _renderProgress() {
    return html`<div class="mwc-table__loader">
      <mwc-circular-progress size="${this.progressSize}"></mwc-circular-progress>
    </div>`;
  }

  /**
   * Parses data if is an instance of string
   */
  protected _parseData(data: any): any[] {
    return typeof data === 'string'
      ? JSON.parse(data)
      : data;
  }

  /**
   * Loads data
   */
  protected _loadData(value: Function): Promise<ICellItem[]> {
    this._isLoading = true;
    this.requestUpdate();

    return value()
      .then(response => {
        setTimeout(() => {
          this._isLoading = false;
          this.requestUpdate();
        }, 0);

        return response;
      });
  }

  /**
   * Creates a table from slotted template
   */
  protected _createTableFromTemplate(): TemplateResult|undefined {
    const head = this.templateEl && this.templateEl.content.querySelector('thead');
    const body = this.templateEl && this.templateEl.content.querySelector('tbody');

    return html`
      <table>
        ${head && html`<thead>
          ${unsafeHTML(head!.innerHTML)}
        </thead>`}
        ${body && html`<tbody>
          ${unsafeHTML(body!.innerHTML)}
        </tbody>`}
      </table>
    `;
  }

  /**
   * Creates a table from data
   */
  protected _createTableFromData(): TemplateResult {
    const head = this._parsedColumns && this._getHead(this._parsedColumns);
    const body = this._parsedData && this._getBody(this._parsedData);
    const loading = this._isLoading ? this._renderProgress() : undefined;

    return html`
      <table>
        ${head}
        ${body}
      </table>
      ${loading}
    `;
  }

  /**
   * 
   * @param data Array of IColumnItem
   */
  protected _getHead(data: IColumnItem[]): TemplateResult {
    const row = data.map(item => ({ field: item.field, value: item.title, align: item.align }));
    return html`
      <thead>
        ${this._getCells(row, true)}
      </thead>
    `;
  }

  /**
   * 
   * @param data Array of IDataItem
   */
  protected _getBody(data: IDataItem[]): TemplateResult {
    return html`
      <tbody>
        ${data.map(item => {
          const row = this._parsedColumns
            ? this._parsedColumns
              .map(col => ({
                  field: col.field,
                  value: item[col.field],
                  align: col.align
              }))
            : Object.keys(item)
              .map(key => ({
                field: key,
                value: item[key]
              }))
          return this._getCells(row);
        })}
      </tbody>
    `;
  }

  /**
   * 
   * @param data Array of ICellItem
   * @param header determines if uses <th> tag
   */
  protected _getCells(data: ICellItem[], header?): TemplateResult {
    return html`
      <tr>
        ${data.map(item => {
          const styles = {
            textAlign: item.align || 'left',
            padding: this._desiredPadding
          };

          return header
            ? html`<th style="${styleMap(styles)}" value="${item.value}">${item.value}</th>`
            : html`<td style="${styleMap(styles)}" value="${item.value}">${item.value}</td>`;
        })}
      </tr>
    `;
  }
}
