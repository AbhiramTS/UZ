import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component'
import { LoginComponent } from './login/login.component'
import { NewstreamComponent } from './newstream/newstream.component'
import { DrafterComponent } from './drafter/drafter.component'
import { ViewarticleComponent } from './viewarticle/viewarticle.component'

const routes: Routes = [
  {path : "", component: NewstreamComponent },
  {path : "register", component: RegistrationComponent },
  {path : "login", component: LoginComponent },
  {path : "newArticle", component: DrafterComponent },
  {path : "viewArticle", component: ViewarticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
