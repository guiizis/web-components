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
                top: 1.5rem;
                left: 0.75rem;
                font-weight: normal; 
                box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
            }
            // :host {
            //   background-color: grey;  
            // }
            :host(.important) {
              background-color: var(--color-dash-primary, #ccc);
              padding: 0.15rem 0.5rem;
            }
            // ::slotted(.highlight) {
            //   background-color: orange !important; // the only way to style the slotted element is to use the ::slotted pseudo-element selector, the light style will override the shadow style
            // }
            :host-context(p) {
              font-weight: bold;
            }
            .icon {
              background-color: black;
              color: white;
              padding: 0.15rem 0.5rem;
              text-align: center;
              border-radius: 50%;

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
    tooltipIcon.classList.add('icon')
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
