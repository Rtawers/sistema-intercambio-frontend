// src/app/components/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService, ProtectedApiResponse, StatusApiResponse } from '../../services/api.service';

// Importaciones de Angular Material para el Dashboard
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // Corregido a styleUrls
})
export class Dashboard implements OnInit {
  // Propiedades para el perfil del usuario
  public userProfile: KeycloakProfile | null = null;
  public backendResponse: ProtectedApiResponse | null = null;
  public backendError: string | null = null;

  // Propiedades para el formulario de subida
  public uploadForm: FormGroup;
  public isUploading = false;
  public uploadSuccessMessage: string | null = null;
  public uploadErrorMessage: string | null = null;

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly apiService: ApiService,
    private readonly fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      documentoIdentidad: [null, Validators.required],
      formatoMaterias: [null, Validators.required],
      seguro: [null, Validators.required],
      cartaAceptacion: [null, Validators.required],
      cartaRecomendacion: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.userProfile = await this.keycloakService.loadUserProfile();
    
    this.apiService.getProtectedData().subscribe({
      next: (data: ProtectedApiResponse) => this.backendResponse = data,
      error: (err: any) => this.backendError = `Error al conectar: ${err.status} - ${err.message}`
    });
  }

  onFileSelect(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadForm.patchValue({ [controlName]: file });
      this.uploadForm.get(controlName)?.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.uploadSuccessMessage = null;
    this.uploadErrorMessage = null;
    if (!this.uploadForm.valid) { return; }

    this.isUploading = true;
    const formData = new FormData();
    Object.keys(this.uploadForm.controls).forEach(key => {
      formData.append(key, this.uploadForm.get(key)!.value);
    });

    this.apiService.uploadDocuments(formData).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.uploadSuccessMessage = response.message;
        this.uploadForm.reset();
      },
      error: (err) => {
        this.isUploading = false;
        this.uploadErrorMessage = `Error al subir archivos: ${err.message}`;
      }
    });
  }
}