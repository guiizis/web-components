class Tooltip extends HTMLElement {
  constructor() {
    super()

  }

  connectedCallback() { //WebComponent lifecycle method
    const toolTipIcon = document.createElement('span')
    toolTipIcon.textContent = '(?)'
    
    this.appendChild(toolTipIcon)
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
