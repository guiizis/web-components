class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._toolTipContainer
    this._toolTipText = 'no tooltip text'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
        <slot></slot><span> (?)</span>
    `
  }

  connectedCallback() { //WebComponent lifecycle method
    if (this.hasAttribute('text')) {
      this._toolTipText = this.getAttribute('text')
    }

    const tooltipIcon = this.shadowRoot.querySelector('span')

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.shadowRoot.appendChild(tooltipIcon)
  }

  _showTooltip() {
    this._toolTipContainer = document.createElement('div')
    this._toolTipContainer.textContent = this._toolTipText
    this._toolTipContainer.style.backgroundColor = 'black'
    this._toolTipContainer.style.color = 'white'
    this._toolTipContainer.style.position = 'absolute'
    this.style.position = 'relative'
    this._toolTipContainer.style.zIndex = 10
    this.shadowRoot.appendChild(this._toolTipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._toolTipContainer)
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
