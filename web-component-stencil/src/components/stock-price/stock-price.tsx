import { Component, h, State } from "@stencil/core";

@Component({
  tag: 'mc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() apiData: number;

  componentWillLoad() {
    this.onFetchStockPrice();
  }

  onFetchStockPrice(event: Event = new Event('')) {
    event.preventDefault();
    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo')
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
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        Price: ${this.apiData}
      </div>
    ]
  }
}

