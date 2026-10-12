import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExampleTile } from '../example-tile';

@Component({
  selector: 'app-basics-page',
  imports: [ExampleTile, RouterLink],
  templateUrl: './basics-page.html',
  // <lord-icon> is a custom element, not an Angular component: Angular renders it as it is.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BasicsPage {}
