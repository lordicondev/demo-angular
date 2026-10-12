import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import type { LordIconElement } from '@lordicon/element';
import { Newsletter } from './newsletter';

/** A form that sends a request; the icon plays once the answer is in. */
@Component({
  selector: 'app-subscribe-form',
  imports: [FormField, FormRoot],
  template: `
    <form class="form" [formRoot]="subscribeForm">
      <lord-icon #icon src="/icons/confetti.json" />
      <input
        type="email"
        placeholder="you@example.com"
        aria-label="Email"
        class="input"
        [formField]="subscribeForm.email"
      />
      <button class="button">Subscribe</button>
      <p role="status" class="status">{{ message() }}</p>
    </form>
  `,
  styles: `
    .form {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-top: 16px;
    }

    .status {
      flex-basis: 100%;
      min-height: 1.5em;
      color: var(--muted);
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubscribeForm {
  private readonly newsletter = inject(Newsletter);
  private readonly icon = viewChild.required<ElementRef<LordIconElement>>('icon');

  protected readonly message = signal('');
  protected readonly subscribeForm = form(
    signal({ email: '' }),
    (path) => {
      required(path.email);
      email(path.email);
    },
    {
      submission: {
        action: async (field) => {
          this.message.set(await this.newsletter.subscribe(field.email().value()));
          void this.icon().nativeElement.play({ from: 'start' });
        },
      },
    },
  );
}
