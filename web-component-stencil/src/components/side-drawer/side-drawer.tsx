import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) alow: string;
  // @Prop({ reflect: true }) open: boolean;

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

    return (
      <aside>
        <header>
          <h1>{this.alow}</h1>
        </header>
        <main>
          <slot>
          </slot>
        </main>
      </aside>
    )
  }
}
