import { Component, Element, h, State } from "@stencil/core";
import { apiKey } from "./../../global/global";

@Component({
  tag: 'mc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() apiData: number;
  @Element() el: HTMLElement;
  stockInput: HTMLInputElement;

  onFetchStockPrice(event: Event) {
    event.preventDefault();

    // const stockSymbolInput = this.el.shadowRoot.querySelector('input');
    // const stockSymbol = stockSymbolInput.value;

    const stockSymbol = this.stockInput.value;

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`)
      .then(async (res) => {
        const parsedResponse = await res.json();
        this.apiData = +parsedResponse['Global Quote']['05. price'];
      })
      .catch(err => {
        console.error('We have an error:', err)
      })
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => this.stockInput = el}/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        Price: ${this.apiData}
      </div>
    ]
  }
}

