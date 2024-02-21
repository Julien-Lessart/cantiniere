import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilterComponentComponent } from './components/filter-component/filter-component.component';

import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
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
