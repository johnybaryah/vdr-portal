import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsService } from './documents/documents.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { CommonModalComponent } from './common-modal/common-modal.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentsComponent,
    NavTabsComponent,
    DocumentDetailsComponent,
    TopNavBarComponent,
    CommonModalComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'documentList/:status', component: DocumentsComponent },
      { path: 'profile', component: HomeComponent },
      { path: 'document/:id', component: DocumentDetailsComponent}
    ], { useHash: true })
  ],
  providers: [ DocumentsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
