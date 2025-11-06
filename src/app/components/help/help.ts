// src/app/components/help/help.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material para esta vista
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './help.html',
  styleUrls: ['./help.css'] // Corregido a styleUrls
})
export class Help {

}