import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire'
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireAuthModule} from '@angular/fire/auth'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'Material-Plan'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
