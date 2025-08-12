import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AppRoutingModule } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(App, {
  providers: [
    (appConfig.providers || []),
    importProvidersFrom(AppRoutingModule)
  ]
  }).catch((err) => console.error(err));
