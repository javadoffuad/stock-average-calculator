import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors,} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideEventPlugins} from '@taiga-ui/event-plugins';
import {authInterceptor} from '../utils/interceptor.utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideEventPlugins(),
  ]
};
