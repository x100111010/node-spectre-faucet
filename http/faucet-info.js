import {
  dpc,
  html,
  css,
  BaseElement,
  FlowFormat,
} from "/flow/flow-ux/flow-ux.js";
import { SPR } from "./spr.js";

export class FaucetInfo extends BaseElement {
  static get properties() {
    return {
      limit: { type: Number },
      available: { type: Number },
      address: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: "Open Sans";
      }
      .caption {
        font-size: 22px;
      }
      .info-content {
        font-size: 16px;
      }
      .address-box {
        background: #fff;
        font-size: 0.82rem;
        font-weight: bold;
        /* border: 1px solid; */
        padding: 9px;
        border-radius: 5px;
        box-shadow: var(--flow-input-box-shadow);
        margin: 10px 0px;
        display: block;
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    this.limit = 0;
    this.available = 0;
    this.address = "";
  }

  render() {
    return html`
      <div class="info">
        <div class="caption">Welcome to Spectre Faucet</div>
        <div class="info-content">
          <p>Spectre Faucet sends Spectre to anyone requesting.</p>
          <p>
            It has a defined address, where you can send or mine Spectre. If the
            faucet address has enough Spectre, it will send it to an address you
            provide.
          </p>
          <p>Faucet can receive funds at the following address:</p>
          <p><b class="address-box">${this.address}</b></p>
          <p>
            Requests are limited to the maximum of
            <b>${SPR(this.limit)} SPR</b> per IP address, per <b>24 hours</b>.
          </p>
          <p>
            You currently have <b>${SPR(this.available)} SPR</b> ${this.limit ==
            this.available
              ? "available"
              : "remaining"}.
          </p>
        </div>
      </div>
    `;
  }
}

FaucetInfo.define("faucet-info");
