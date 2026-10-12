import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExampleTile } from '../example-tile';
import { Recommendations } from './recommendations';

@Component({
  selector: 'app-loading-page',
  imports: [ExampleTile, Recommendations],
  templateUrl: './loading-page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoadingPage {}
