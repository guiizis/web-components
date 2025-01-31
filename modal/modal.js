class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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

      </style>
      
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <h1>Please Confirm</h1>          
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-button">Cancel</button>
          <button id="confirm-button">Okay</button>
        </section>

      </div>
    `;
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'opened') {
  //     if (this.hasAttribute('opened')) {
  //       this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
  //       this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
  //       this.shadowRoot.querySelector('#modal').style.top = '15vh';
  //     } else {
  //       this.shadowRoot.querySelector('#backdrop').style.opacity = 0;
  //       this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'none';
  //       this.shadowRoot.querySelector('#modal').style.top = '-100vh';
  //     }
  //   }
  // }

  // static get observedAttributes() {
  //   return ['opened'];
  // }
}

customElements.define('modal-mcintosh', Modal);