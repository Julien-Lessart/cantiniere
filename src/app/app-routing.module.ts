import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConstraintsComponent } from './components/constraints/constraints.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ComptePageComponent } from './pages/compte-page/compte-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'parameters', component: ConstraintsComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'compte', component:ComptePageComponent }, 
  { path: 'home', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
