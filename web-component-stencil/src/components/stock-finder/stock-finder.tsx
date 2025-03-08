import { Component, h, Prop, State } from "@stencil/core";
import { apiKey } from "../../global/global";

@Component({
  tag: 'mc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() results: Record<string, unknown>[] = [];

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value?.trim()

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
      .then(async (res) => {
        const response = await res.json();
        console.log(response);

        this.results = response.bestMatches
      })
      .catch(err => {
        console.log("We have an error at stock-finder component ", err);
      });

  }

  render() {
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input
          type="text"
          id="stock-symbol"
          ref={el => this.stockNameInput = el}
        />
        <button type="submit">Find</button>
      </form>,
      <ul>
        {this.results.map((result) => (
          <li>
            <strong>{result['2. name']} </strong>
            <strong>{result['1. symbol']}</strong>
          </li>
        ))}
      </ul>
    ]
  }
}
