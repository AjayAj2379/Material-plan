import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import { ServiceService } from '../service/service.service';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard'
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputtype ="password";
  loading:boolean;
  constructor(private fireauth: AngularFireAuth, private route:Router,private service:ServiceService, private authservice: AuthServiceService,
    private guard:AngularFireAuthGuard) { }

  ngOnInit() {
     console.log("login")
     if(!this.authservice.loggedout)
     {
      this.authservice.initLogout()
     }
  
 
  }

  login(email,pass)
  {
    this.loading=true;
     this.authservice.login(email,pass).then(()=>{

      this.loading=false;
     })

  }
onclick()
{

  if(this.inputtype=="password")
  {
    this.inputtype="text";
  }
  else
  {
    this.inputtype="password";
  }

}

}
