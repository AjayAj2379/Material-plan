import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth'
import Swal from 'sweetalert2';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  user:boolean;

  constructor(private firestore: AngularFirestore,private fireauth:AngularFireAuth,private route:Router) { }

  getDetails()
  {
    return this.firestore.collection('details').snapshotChanges();
  }

  deleteDetails(id)
  {
    
    return this .firestore.doc('details/'+id).delete();
  }
  getDetailsByID(id)
  {
    return this. firestore.collection('details').doc(id).valueChanges();
  }

  login(email,pass)
  {
    return this.fireauth.auth.signInWithEmailAndPassword(email,pass).then(()=>{

      this.user=true,
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

  confirmDelete(id)
  {
    Swal.fire({

      title:"Are you sure you want to Delete??",
      text:"All the records will be erased!!",
      type:"warning",
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'No' }).then((result)=>{
    
        if(result.value)
        {
          this.deleteDetails(id).then(()=>{
            Swal.fire({
              title:'Success',
              text:'Your values are Deleted',
              type:"success",
              timer:1000,
              showConfirmButton:false
            })
    
          }).catch(()=>{
    
            Swal.fire({
              title:'Sorry!!',
              text:'Try again later',
              type:"warning",
              timer:1000,
              showConfirmButton:false
            })
          });
        }
    
    })
  }
 
}
