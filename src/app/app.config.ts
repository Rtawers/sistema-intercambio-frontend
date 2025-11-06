// src/app/app.config.ts

import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

// 1. Importa 'provideHttpClient', 'withInterceptorsFromDi' y 'HTTP_INTERCEPTORS'
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { KeycloakBearerInterceptor, KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { routes } from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
  
  return () =>
    keycloak.init({
      config: {
        url: 'https://dull-radios-stare.loca.lt',
        realm: 'intercambio-estudiantil',
        clientId: 'angular-app',
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 2. Le decimos a HttpClient que busque interceptores registrados vía DI
    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(KeycloakAngularModule),

    // 3. Registramos nuestro interceptor de clase de la forma tradicional
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },

    // 4. El inicializador de Keycloak se queda como estaba
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ]
};