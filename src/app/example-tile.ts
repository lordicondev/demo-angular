import { booleanAttribute, Component, input } from '@angular/core';

/** One example: the icon, and the attributes that make it. */
@Component({
  selector: 'app-example-tile',
  template: `
    <figure class="tile" [class.dark]="dark()">
      <ng-content />
      <figcaption>
        <code>{{ code() }}</code>
      </figcaption>
    </figure>
  `,
  // The figure takes the tile's place in the grid.
  styles: ':host { display: contents; }',
})
export class ExampleTile {
  readonly code = input.required<string>();
  readonly dark = input(false, { transform: booleanAttribute });
}
