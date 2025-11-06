// src/app/components/my-documents/my-documents.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, StatusApiResponse } from '../../services/api.service';

// Importaciones de Angular Material para esta vista
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-my-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './my-documents.html',
  styleUrls: ['./my-documents.css'] // Corregido a styleUrls
})
export class MyDocuments implements OnInit {
  public uploadedFiles: string[] = [];
  public isLoadingStatus = true;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUploadStatus().subscribe({
      next: (data: StatusApiResponse) => {
        this.uploadedFiles = data.uploadedFiles;
        this.isLoadingStatus = false;
      },
      error: (err) => {
        console.error("Error al obtener el estado de los archivos", err);
        this.isLoadingStatus = false;
      }
    });
  }
}