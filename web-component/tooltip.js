class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._toolTipContainer
    this._toolTipText = 'no tooltip text'
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() { //WebComponent lifecycle method
    this._toolTipText = this.getAttribute('text')
    const toolTipIcon = document.createElement('span')
    toolTipIcon.textContent = ' (?)'
    toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.appendChild(toolTipIcon)
  }

  _showTooltip() {
    this._toolTipContainer = document.createElement('div')
    this._toolTipContainer.textContent = this._toolTipText
    this._toolTipContainer.style.backgroundColor = 'black'
    this._toolTipContainer.style.color = 'white'
    this._toolTipContainer.style.position = 'absolute'
    this.style.position = 'relative'
    this._toolTipContainer.style.zIndex = 10
    this.appendChild(this._toolTipContainer)
  }

  _hideTooltip() {
    this.removeChild(this._toolTipContainer)
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
