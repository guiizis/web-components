import { Component, h} from "@stencil/core";
import { apiKey } from "../../global/global";

@Component({
  tag: 'mc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value?.trim()

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
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
        <li>
          <strong>MSFT</strong> - Microsoft
        </li>
        <li>
          <strong>GOOGL</strong> - Google
        </li>
      </ul>
    ]
  }
}
