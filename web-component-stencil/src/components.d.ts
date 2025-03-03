/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface McSideDrawer {
        "alow": string;
        "open": boolean;
        "openMethod": () => Promise<void>;
    }
    interface McStockPrice {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
declare global {
    interface HTMLMcSideDrawerElement extends Components.McSideDrawer, HTMLStencilElement {
    }
    var HTMLMcSideDrawerElement: {
        prototype: HTMLMcSideDrawerElement;
        new (): HTMLMcSideDrawerElement;
    };
    interface HTMLMcStockPriceElement extends Components.McStockPrice, HTMLStencilElement {
    }
    var HTMLMcStockPriceElement: {
        prototype: HTMLMcStockPriceElement;
        new (): HTMLMcStockPriceElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "mc-side-drawer": HTMLMcSideDrawerElement;
        "mc-stock-price": HTMLMcStockPriceElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface McSideDrawer {
        "alow"?: string;
        "open"?: boolean;
    }
    interface McStockPrice {
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "mc-side-drawer": McSideDrawer;
        "mc-stock-price": McStockPrice;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mc-side-drawer": LocalJSX.McSideDrawer & JSXBase.HTMLAttributes<HTMLMcSideDrawerElement>;
            "mc-stock-price": LocalJSX.McStockPrice & JSXBase.HTMLAttributes<HTMLMcStockPriceElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
