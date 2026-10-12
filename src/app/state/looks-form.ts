import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

/** Looks from a form: the icon's properties are bound to the form's model, a signal. */
@Component({
  selector: 'app-looks-form',
  imports: [FormField],
  template: `
    <div class="looks">
      <lord-icon
        src="/icons/puzzle.json"
        trigger="hover"
        [stroke]="looks().stroke"
        [colors]="'primary:' + looks().primary"
      />
      <label>
        Stroke
        <select class="input" [formField]="looksForm.stroke">
          <option value="light">light</option>
          <option value="regular">regular</option>
          <option value="bold">bold</option>
        </select>
      </label>
      <label>
        Colour
        <input type="color" [formField]="looksForm.primary" />
      </label>
    </div>
  `,
  styles: `
    .looks {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      align-items: center;
      margin-top: 16px;
    }

    label {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .input {
      min-width: 0;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LooksForm {
  protected readonly looks = signal({ stroke: 'regular', primary: '#08a88a' });
  protected readonly looksForm = form(this.looks);
}
