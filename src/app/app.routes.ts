// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';


import { Dashboard } from './components/dashboard/dashboard'; 
import { MyDocuments} from './components/my-documents/my-documents'; 
import { Help } from './components/help/help'; 
export const routes: Routes = [
    // Ruta principal que muestra el dashboard con el formulario
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [AuthGuard]
    },
    // Ruta para la sección "Mis Documentos"
    {
        path: 'documents',
        component: MyDocuments,
        canActivate: [AuthGuard]
    },
    // Ruta para la sección "Ayuda"
    {
        path: 'help',
        component: Help,
        canActivate: [AuthGuard]
    },
    // Si el usuario entra a la raíz, lo redirigimos al dashboard
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    // Opcional: una ruta comodín por si el usuario introduce una URL que no existe
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];