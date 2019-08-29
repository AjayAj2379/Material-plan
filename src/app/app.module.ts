import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router'
import {AngularFireModule} from '@angular/fire'
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireAuthModule} from '@angular/fire/auth'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from './detail/details/details.component';
import { DetailIdComponent } from './detail/detail-id/detail-id.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { EditComponent } from './edit/edit/edit.component';

const route : Routes =[

  {path:'',component:NavBarComponent,
  
children:[
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'list',component:DetailsComponent},
  {path:'detail/:id',component:DetailIdComponent},
  {path:'edit/:id',component:EditComponent}
]},
  {path:'**', component:PageNotFoundComponent}
  
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    DetailIdComponent,
    NavBarComponent,
    PageNotFoundComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'Material-Plan'),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(route) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
