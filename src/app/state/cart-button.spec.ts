import { TestBed } from '@angular/core/testing';
import { CartButton } from './cart-button';

// The test does not call defineElement(): <lord-icon> stays a plain element, with nothing to
// load or play. What is tested is the state the icon follows.
describe('CartButton', () => {
  it('turns aria-pressed on and off', async () => {
    const fixture = TestBed.createComponent(CartButton);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    await fixture.whenStable();
    expect(button.getAttribute('aria-pressed')).toBe('false');

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('starts in the cart when the input says so', async () => {
    const fixture = TestBed.createComponent(CartButton);
    fixture.componentRef.setInput('inCart', true);
    await fixture.whenStable();

    const icon = fixture.nativeElement.querySelector('lord-icon');
    expect(icon.getAttribute('trigger')).toBe('follow');
    expect(icon.closest('button').getAttribute('aria-pressed')).toBe('true');
  });
});
