import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) alow: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

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

    return (
      <aside>
        <header>
          <h1>{this.alow}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id='tabs'>
          <button class="active">Navigation</button>
          <button>Contact</button>
        </section>
        <main>
          <slot>
          </slot>
        </main>
      </aside>
    )
  }
}
