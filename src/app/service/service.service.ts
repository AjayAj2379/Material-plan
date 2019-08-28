import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private firestore: AngularFirestore) { }

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
