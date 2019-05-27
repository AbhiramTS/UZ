import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';

import {Web3ServiceService} from './services/web3-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NewstreamComponent } from './newstream/newstream.component';
import { DrafterComponent } from './drafter/drafter.component';
import { TemplatingComponent } from './templating/templating.component';
import { SafePipe } from './safe.pipe';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    NewstreamComponent,
    DrafterComponent,
    TemplatingComponent,
    SafePipe,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    Web3ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
