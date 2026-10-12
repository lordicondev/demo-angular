# Lordicon × Angular

Animated [Lordicon](https://lordicon.com/) icons in an Angular 22 app, with
[`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element): icons in any template,
icons that follow signals, and icons that load when they are needed.

```sh
npm install
npm start          # http://localhost:4200
```

With Node 22.22, 24.15 or later, as Angular 22 asks.

## Lordicon in your Angular app

**1. Install**

```sh
npm install @lordicon/element
```

**2. Define the element** in `src/main.ts`, before the app starts:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { defineElement } from '@lordicon/element';
import { appConfig } from './app/app.config';
import { App } from './app/app';

defineElement();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

**3. Use it**, in any component that adds `CUSTOM_ELEMENTS_SCHEMA`. The schema tells Angular
that `<lord-icon>` is not a component; without it, the build stops with
`'lord-icon' is not a known element`.

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `<lord-icon src="/icons/lock.json" trigger="hover" />`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Hero {}
```

**4. Give icons a size**, if 32px is not yours, in `src/styles.css`:

```css
@layer base {
  lord-icon {
    width: 64px;
    height: 64px;
  }
}
```

In `@layer base`, the rule gives way to your component styles and classes, so one icon can take
another size. The layer matters with Tailwind: its classes sit in a layer, and a rule outside any
layer would beat them.

Pick icons on [lordicon.com](https://lordicon.com/), give them your style and colours there, and
download them as Lottie JSON into `public/`, as here.

## What's inside

| Page       | Shows                                                                                       | Code                                   |
| ---------- | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| `/`        | Triggers, colours, stroke, a colour from CSS, icons in buttons and links                    | [`src/app/basics/`](src/app/basics/)   |
| `/state`   | Bindings from a form, `follow` with data from `httpResource`, a process, `play()` from code | [`src/app/state/`](src/app/state/)     |
| `/loading` | A placeholder, loading on view or interaction, `@defer` with data that comes later          | [`src/app/loading/`](src/app/loading/) |

The data is in [`public/data/`](public/data/), as a stand-in for your API.

## Good to know

- Attributes go on as they are: `trigger="hover"`. Bound values too: `[src]`, `[colors]` or
  `[stroke]` set the element's properties, which it reads as attributes.
- `follow` watches an attribute of the element around the icon: bind it with `[attr.…]`, as
  `[attr.aria-pressed]="inCart()"` or `[attr.data-state]="stage()"`.
- `viewChild<ElementRef<LordIconElement>>('icon')` gives the element, with `play()` and the
  rest, the type from `@lordicon/element`. Methods wait for the icon to be ready by themselves.
- Events go to `(ready)`, `(complete)`, `(error)` and so on, and `$event` comes typed:
  `CustomEvent<CompleteDetail>` for `complete`.
- Icons do not wait for Angular: in a route loaded lazily, in `@if`, `@for` or `@defer`, they
  load as soon as they are on the page.
- Prefer `src` to `[icon]`: the JSON stays out of your JavaScript, and loads only when the icon
  does. `[icon]="data"` works too: Angular sets it as a property.
- The player adds about 210 kB to the first bundle, 60 kB compressed, and `ng build` warns past
  500 kB. Raise `maximumWarning` in `angular.json`, as here. Or load it beside the app, in
  `main.ts`: `import('@lordicon/element').then(({ defineElement }) => defineElement())`. Icons
  then start once it is in; before calling their methods early, await
  `customElements.whenDefined('lord-icon')`.
- Tests need nothing: without `defineElement()`, `<lord-icon>` stays a plain element. Test the
  state the icon follows, as in
  [`cart-button.spec.ts`](src/app/state/cart-button.spec.ts).
- For a component of your own around the element, the schema goes there only, and the rest of
  the app writes `<app-icon name="lock" />`:

  ```ts
  @Component({
    selector: 'app-icon',
    template: `<lord-icon [src]="'/icons/' + name() + '.json'" [trigger]="trigger()" />`,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class Icon {
    readonly name = input.required<string>();
    readonly trigger = input('hover');
  }
  ```

- `defineElement()` takes options, in the same place: triggers of your own, or
  `motion: 'always'` for every icon.
- Screen readers skip icons: give one an `aria-label` when it means something on its own. When
  the viewer asks for less motion, icons stop animating by themselves.
- Children of `<lord-icon>` show until the icon is ready: a still of the icon, downloaded from
  lordicon.com as SVG, makes a good placeholder.
- With SSR (`ng add @angular/ssr`), nothing changes: `main.ts` runs in the browser only, the
  server sends `<lord-icon>` with its attributes and children, and hydration does not mind, as
  the icon draws in its own shadow DOM.
- Until the element is defined, with SSR or a dynamic import, `<lord-icon>` is a plain inline
  element: it has no size, and a placeholder inside it shows at its own. Two more lines in the
  size rule keep the page still:

  ```css
  @layer base {
    lord-icon {
      display: inline-block;
      width: 64px;
      height: 64px;
    }

    lord-icon:not(:defined) > * {
      width: 100%;
      height: 100%;
    }
  }
  ```

- With `NgModule`s, `CUSTOM_ELEMENTS_SCHEMA` goes in the module's `schemas`. The element asks
  nothing of recent Angular: signals, `httpResource` and Signal Forms are this demo's choice.
- Every attribute and trigger: the
  [`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element) README.

## This project

A new Angular 22 app as `ng new` makes it (standalone, zoneless, CSS, Vitest), with ESLint
through angular-eslint, and Prettier. It builds as a static site; its host has to answer every
path with `index.html`, as for any single-page app.

```sh
npm run lint
npm test
npm run format     # Prettier
npm run build      # dist/demo-angular/browser
```

## License

MIT
