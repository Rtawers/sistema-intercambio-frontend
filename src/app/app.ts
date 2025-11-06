// src/app/app.ts (VERSIÓN FINAL)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

// Importa los módulos necesarios para el enrutamiento y el layout
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'sistema-intercambio-frontend';

  // El contenedor SOLO necesita saber cómo cerrar sesión.
  constructor(private readonly keycloakService: KeycloakService) {}

  public logout() {
    this.keycloakService.logout('https://bright-dango-229dba.netlify.app');
  }
}