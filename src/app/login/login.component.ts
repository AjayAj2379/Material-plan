import { Component, OnInit, COMPILER_OPTIONS } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireauth: AngularFireAuth, private route:Router,private service:ServiceService) { }

  ngOnInit() {

    this.service.user=false;
  }

  login(email,pass)
  {
     this.service.login(email,pass)

  }

}
