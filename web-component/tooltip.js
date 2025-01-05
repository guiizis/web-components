class Tooltip extends HTMLElement {
  constructor() {
    super()
    console.log('is working')
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
