import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ComptePageComponent } from './pages/compte-page/compte-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { HomePageComponent } from './pages/home-page/home-page.component';

import { NavbarLinkComponent } from './components/navbar-link/navbar-link.component';
import { ConstraintsComponent } from './components/constraints/constraints.component';
import { LogoutComponent } from './components/logout/logout.component';

import { FormsComponent } from './components/form/forms.component';
import { FilterComponentComponent } from './Components/filter-component/filter-component.component';
import { NavbarLinkComponent } from './Components/navbar-link/navbar-link.component';
import { CagnotteComponent } from './components/cagnotte/cagnotte.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FormsComponent,
    HomePageComponent,
    ComptePageComponent,
    CagnotteComponent,
    NavbarLinkComponent,
    ConstraintsComponent,
      LogoutComponent,
    TableComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
