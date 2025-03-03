import { Component, h } from "@stencil/core";

@Component({
  tag: 'mc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  onFetchStockPrice(event: Event) {
    event.preventDefault();

  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        Price: {0}
      </div>
    ]
  }
}
//E8T6EIYEPN3WHKBA
