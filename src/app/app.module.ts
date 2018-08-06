import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf, faCoffee, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsService } from './_services/documents.service';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { ModalComponent } from './document-details/modal.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

library.add(faFilePdf, faSpinner);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentsComponent,
    DocumentDetailsComponent,
    ModalComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', redirectTo: 'documentlist/pending'},
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'documentlist/:status', component: DocumentsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: HomeComponent },
      { path: '**', component: NotFoundComponent }
    ], { useHash: true })
  ],
  providers: [
    DocumentsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
