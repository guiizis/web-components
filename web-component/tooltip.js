class Tooltip extends HTMLElement {
  constructor() {
    super()
    this._toolTipText = 'no tooltip text'
    this._toolTipIcon
    this.tooltipVisible = false
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
            :host {
              position: relative; 
            }
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

    this._toolTipIcon = this.shadowRoot.querySelector('span')

    this._toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    this._toolTipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this._toolTipIcon.classList.add('icon')
    this.shadowRoot.appendChild(this._toolTipIcon)
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    if (name === 'text') {
      this._toolTipText = newValue
    }
  }

  disconnectedCallback() { //WebComponent lifecycle method
    console.log('disconnected')
    this._toolTipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._toolTipIcon.removeEventListener('mouseleave', this._hideTooltip)
  }

  _render() {
    let toolTipContainer = this.shadowRoot.querySelector('div')
    if (this.tooltipVisible) {
      toolTipContainer = document.createElement('div')
      toolTipContainer.textContent = this._toolTipText
      this.shadowRoot.appendChild(toolTipContainer)
    }
    else {
      if (toolTipContainer) {
        this.shadowRoot.removeChild(toolTipContainer)
      }
    }

  }


  static get observedAttributes() {
    return ['text']
  }

  _showTooltip() { 
    this.tooltipVisible = true
    this._render()
  }

  _hideTooltip() { 
    this.tooltipVisible = false
    this._render()
  }

}

customElements.define('mcintosh-tooltip', Tooltip)
