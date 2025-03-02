import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) alow: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onContentChange(content: string) {
    console.log(content);
  }

  onCloseDrawer() {
    this.open = false;
  }

  render() {
    // let content = null;

    // if (this.open) {
    //   content = (
    //     <aside>
    //       <header>
    //         <h1>{this.alow}</h1>
    //       </header>
    //       <main>
    //         <slot>
    //         </slot>
    //       </main>
    //     </aside>
    //   );
    // }

    let mainContent = <slot></slot>;
    mainContent = (
      <div id='contact-information'>
        <h2>contact information</h2>
        <p>You can reach us via phone or email.</p>
        <ul>
          <li>Phone: 1234567890</li>
          <li>Email: <a href="mailto:test@test.com">test@test.com</a></li>
        </ul>
      </div>
    )

    return (
      <aside>
        <header>
          <h1>{this.alow}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id='tabs'>
          <button onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
          <button onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    )
  }
}
