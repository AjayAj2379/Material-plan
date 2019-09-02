import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loggedIn:boolean;
  loggedout:boolean=false;

  constructor(private fireauth:AngularFireAuth, private route:Router) { }

  login(email,pass)
  {
    
    return this.fireauth.auth.signInWithEmailAndPassword(email,pass).then(()=>{

      this.route.navigate(['/main'])
      

    }).catch((error:any)=>{
      Swal.fire({
      
        title:'Invalid Details',
        text:"Please provide valid details",
        type:"error",
        showCloseButton:true
      })
      
            })


   }

   isAuthenticated()
   {
     const promise = new Promise((resolve,reject)=>{


      this.fireauth.authState.subscribe((data:any)=>{

        if(data)
        {
          this.loggedIn=true;
          resolve(this.loggedIn)
        }
        
        else{
          this.loggedIn=false;
          reject(this.loggedIn)
        }
      
       })
     })
     
     return promise;
   }

   initLogout()
   {
     this.fireauth.auth.signOut().then(()=>{console.log("logout")});
   }

   logout()
  {
    this.loggedout=true;
    Swal.fire({
      title:"Are you sure you want to Logout???",
      type:"warning",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    cancelButtonText:'No' 

    }).then((result)=>{

      if(result.value)
      {
        this.fireauth.auth.signOut().then((data)=>{
          //console.log(data)
            Swal.fire({
          
              title:"Logged out",
              text:"You are logged out successfully",
              type:"success",
              timer:1000
            })
            // this.service.user=false;
            // console.log(this.service.user)
            this.route.navigate(['/'])
          
          })

      }

    })


  }
}
