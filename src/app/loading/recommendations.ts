import { httpResource } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Recommendation {
  id: number;
  title: string;
  icon: string;
}

/** A part of the page that comes later: its code with `@defer`, its data with `httpResource`. */
@Component({
  selector: 'app-recommendations',
  template: `
    @if (recommendations.hasValue()) {
      <div class="grid">
        @for (item of recommendations.value(); track item.id) {
          <figure class="tile">
            <lord-icon [src]="item.icon" intro="in-reveal" trigger="hover" target="figure" />
            <figcaption>{{ item.title }}</figcaption>
          </figure>
        }
      </div>
    } @else {
      <p class="note">Loading recommendations…</p>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Recommendations {
  // A stand-in for your API: public/data/recommendations.json.
  protected readonly recommendations = httpResource<Recommendation[]>(
    () => '/data/recommendations.json',
  );
}
