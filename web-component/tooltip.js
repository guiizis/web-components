class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._toolTipContainer
    this._toolTipText = 'no tooltip text'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
        <style>
            span {
                color: black;
                padding: 0.15rem 0.5rem;
                border-radius: 3px;
                cursor: help;
            }
            div {
                position: absolute;
                z-index: 10;
                background-color: black;
                color: white;
                padding: 0.15rem 0.5rem;
                border-radius: 3px;
            }
            ::slotted(.highlight) {
              background-color: orange !important; // the only way to style the slotted element is to use the ::slotted pseudo-element selector, the light style will override the shadow style
            }
        </style>
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
    this.shadowRoot.appendChild(this._toolTipContainer)
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._toolTipContainer)
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
