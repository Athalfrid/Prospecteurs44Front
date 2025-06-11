import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { AssociationComponent } from './components/main/association/association.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UserComponent } from './components/main/user/user.component';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForumComponent } from './components/main/forum/forum.component';
import { ActualitesComponent } from './components/main/actualites/actualites.component';
import { EventComponent } from './components/main/event/event.component';
import { AlertesosComponent } from './components/main/alertesos/alertesos.component';
import { AlerteActuelleComponent } from './components/main/alerte-actuelle/alerte-actuelle.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'association', component: AssociationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'events', component: EventComponent },
  { path: 'alertesos', component: AlertesosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //ROUTES PRIVÉES -- PROFIL ROLE_USER
  /** ROUTES ROLE_USER */
  {
    path: 'alerteEncours',
    component: AlerteActuelleComponent,
    canActivate: [authGuard],
  },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
  //ROUTES PRIVÉES -- PROFIL ROLE_MODERATEUR
  /** ROUTES ROLE_MODERATEUR */
  //ROUTES PRIVÉES -- PROFIL ROLE_ADMIN
  /** ROUTES ROLE_ADMIN */
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: NotFoundComponent },
];
