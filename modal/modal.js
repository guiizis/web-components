class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          z-index: 100;
          top: 15vh;
          left: 25%;
          width: 50%;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
        }

        header {
          padding: 1rem;
        }

        header h1 {
          font-size: 1.25rem;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        
        #actions button {
          margin: 0 0.25rem;
        }

        :host([opened]) #backdrop, :host([opened]) #modal {
          opacity: 1;
          pointer-events: all;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
        }
      </style>
      
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title">Please confirm doggo status</slot>       
        </header>
        <section id="main" name="title">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Okay</button>
        </section>

      </div>
    `;

    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', event => {
      console.dir(slots[1].assignedNodes());
    });

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'opened') {
      if (this.hasAttribute('opened')) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }
}

customElements.define('modal-mcintosh', Modal);