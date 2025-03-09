import { Component, Event, h, Prop, State } from "@stencil/core";
import { apiKey } from "../../global/global";
import { EventEmitter } from "stream";

@Component({
  tag: 'mc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() results: Record<string, unknown>[] = []
  @State() loading = false

  @Event({eventName: 'mcSymbolSelected' , bubbles: true, composed: true}) mcSymbolSelected: EventEmitter<any>

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value?.trim()

    this.loading = true

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
      .then(async (res) => {
        const response = await res.json();
        console.log(response);

        this.results = response.bestMatches
        this.loading = false
      })
      .catch(err => {
        console.log("We have an error at stock-finder component ", err);
        this.loading = false
      });

  }

  onStockSelected(symbol: string) {
    this.mcSymbolSelected.emit(symbol)
    console.log('Stock selected: ', symbol)
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
        <li>
          <strong>Name</strong>
          <strong>Symbol</strong>
        </li>
        {this.loading ? <mc-spinner></mc-spinner> : this.results.map((result) => (
          <li onClick={this.onStockSelected.bind(this, result['1. symbol'])}>
            <strong>{result['2. name']}</strong>
            <strong>{result['1. symbol']}</strong>
          </li>
        ))}
      </ul>
    ]
  }
}
