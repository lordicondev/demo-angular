import { Component, CUSTOM_ELEMENTS_SCHEMA, model } from '@angular/core';

/** A toggle: the icon follows the button's `aria-pressed`, which follows a signal. */
@Component({
  selector: 'app-cart-button',
  template: `
    <button
      type="button"
      class="button"
      [attr.aria-pressed]="inCart()"
      (click)="inCart.set(!inCart())"
    >
      <lord-icon
        src="/icons/morph-shopping.json"
        trigger="follow"
        target="button"
        state="morph-select"
        current-color
      />
      In cart
    </button>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartButton {
  readonly inCart = model(false);
}
