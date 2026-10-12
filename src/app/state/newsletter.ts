import { Injectable } from '@angular/core';

/** A stand-in for your backend: a mailing list, a database, behind an HTTP call. */
@Injectable({ providedIn: 'root' })
export class Newsletter {
  async subscribe(email: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return `Subscribed: ${email}`;
  }
}
