import { dpc, html, css, BaseElement } from "/flow/flow-ux/flow-ux.js";
import { Decimal } from "/flow/flow-ux/extern/decimal.js";
// import {BigNumber} from '/flow/flow-ux/resources/extern/bignumber.js/bignumber.mjs';

// Decimal.set({ precision : 2, rounding : 4 });
// console.log("Decimal:", Decimal('123.123456789999').toFixed(8));

export class FaucetTransactions extends BaseElement {
  static get properties() {
    return {
      //transactions : { type : Array },
      //networks : { type : Array },
      network: { type: String },
      limit: { type: Number },
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin-top: 16px;
      }
      .caption {
        font-family: "Open Sans";
        font-size: 14px;
      }
      .headers {
        font-family: "Open Sans";
        font-size: 10px;
        margin-top: 16px;
        display: flex;
        flex-direction: row;
      }
      .xx-headers div {
        border: 1px solid red;
      }
      .headers :nth-child(1) {
        width: var(--value-column-width);
        text-align: center;
      }
      .headers :nth-child(2) {
        width: var(--blue-score-column-width);
        text-align: center;
      }
      .headers :nth-child(3) {
        width: var(--txid-column-width);
      }
      /*.headers div { border: 1px solid red; }*/
      .transactions {
        /*font-family : "IBM Plex Sans Condensed"; font-size: 18px;*/
        margin-top: 4px;
      }
    `;
  }

  constructor() {
    super();
    this.transactions = {};
    this.limit = 25;
    this.transactionUpdates = {};
  }

  onlineCallback() {
    const { rpc, networks } = flow.app;

    this.transactionUpdates = rpc.subscribe(`utxo-change`);
    (async () => {
      for await (const msg of this.transactionUpdates) {
        const { network, added, removed, seq } = msg.data;
        const transactions =
          this.transactions[network] || (this.transactions[network] = []);
        added.forEach((tx) => {
          transactions.unshift({
            ...tx,
          });
        });
        while (transactions.length > this.limit) transactions.pop();
        if (this.network == network) this.requestUpdate();
      }
    })().then();
  }

  offlineCallback() {
    this.transactionUpdates.stop();
  }

  render() {
    const transactions = this.transactions[this.network] || [];
    return html`
      <div class="wrapper">
        <div class="caption">Faucet Transactions</div>
        <div class="headers">
          <div>VALUE (SPR)</div>
          <div>DAG DAA SCORE</div>
          <div>TXID</div>
        </div>
        <div class="transactions">
          ${transactions.map(
            (tx) =>
              html`<spectre-transaction .data=${tx}></spectre-transaction>`,
          )}
        </div>
      </div>
    `;
  }
}

FaucetTransactions.define("faucet-transactions");
