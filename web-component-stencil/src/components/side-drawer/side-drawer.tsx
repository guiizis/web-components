import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({reflect: true}) alow: string;

  render() {
    console.log(this.alow)
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
