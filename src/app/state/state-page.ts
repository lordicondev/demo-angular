import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartButton } from './cart-button';
import { DownloadButton } from './download-button';
import { LooksForm } from './looks-form';
import { SubscribeForm } from './subscribe-form';

interface Product {
  id: number;
  name: string;
  price: string;
  inCart: boolean;
}

@Component({
  selector: 'app-state-page',
  imports: [CartButton, DownloadButton, LooksForm, RouterLink, SubscribeForm],
  templateUrl: './state-page.html',
  styleUrl: './state-page.css',
})
export class StatePage {
  // A stand-in for your API: public/data/products.json.
  protected readonly products = httpResource<Product[]>(() => '/data/products.json');
}
