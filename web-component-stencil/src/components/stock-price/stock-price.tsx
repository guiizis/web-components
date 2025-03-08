import { Component, Element, h, Listen, Prop, State, Watch } from "@stencil/core"
import { apiKey } from "./../../global/global"

@Component({
  tag: 'mc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() apiData: number
  @State() stockUserInput: string
  @State() stockUserInputValid = false
  @State() error: string
  @Element() el: HTMLElement

  @Listen('mcSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    event.preventDefault()
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail
    }
  }

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue
      this.stockUserInputValid = true
      this.fetchStockPrice(newValue)
    }
  }
  // stockInput: HTMLInputElement

  @Prop({ mutable: true, reflect: true }) stockSymbol: string
  // initialStockSymbol: string

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value
    if (this.stockUserInput.trim().length) {
      this.stockUserInputValid = true
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault()

    // const stockSymbolInput = this.el.shadowRoot.querySelector('input')
    // const stockSymbol = stockSymbolInput.value

    // const stockSymbol = this.stockInput.value
    const stockSymbol = this.stockUserInput
    this.fetchStockPrice(stockSymbol)
  }

  componentWillLoad() {
    console.log('componentWillLoad')
    this.apiData = 0
  }

  componentDidLoad() {
    console.log(this.stockSymbol)
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol
      this.stockUserInput = this.stockSymbol
      this.stockUserInputValid = true
      this.fetchStockPrice(this.stockSymbol)
    }
  }

  componentWillUpdate() {
    // console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
    // if (this.initialStockSymbol !== this.stockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol
    //   this.fetchStockPrice(this.stockSymbol)
    // }
  }

  disconnectedCallback() {
    // console.log('componentDidUnload')
  }

  fetchStockPrice(symbol: string) {

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
      .then(async (res) => {
        const parsedResponse = await res.json()
        if (!parsedResponse['Global Quote']['05. price']) {
          throw new Error('Invalid symbol')
        }
        this.error = null
        this.apiData = +parsedResponse['Global Quote']['05. price']
      })
      .catch(err => {
        this.error = err.message
        console.error('We have an error:', err)
      })
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>

    if (this.apiData) {
      dataContent = <p>Price: ${this.apiData}</p>
    }

    if (this.error) {
      dataContent = <p>{this.error}</p>
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        {/* <input id="stock-symbol" ref={el => this.stockInput = el}/> */}
        {
          <input
            id="stock-symbol"
            value={this.stockUserInput}
            onInput={this.onUserInput.bind(this)}
          />
        }
        <button disabled={!this.stockUserInputValid} type="submit">Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ]
  }
}

