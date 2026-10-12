import { bootstrapApplication } from '@angular/platform-browser';
import { defineElement } from '@lordicon/element';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Defines <lord-icon> once, before the app starts. From here on it works in any template.
defineElement();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
