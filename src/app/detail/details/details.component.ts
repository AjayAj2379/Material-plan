import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { InsertItem } from 'src/app/details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  getItem:any[]=[];
  planArray=[];
  serialNo=1;
  loading: boolean;

  constructor(private service: ServiceService,
    private firestore: AngularFirestore,private route:Router ) { }

  ngOnInit() {
    // if(!this.service.user)
    // {
    //   this.route.navigate(['/'])
    // }
    this.loading = true;
    this.service.getDetails().subscribe((data:any)=>{
      console.log(data)
      this.planArray=[];
      this.getItem = data.map(info =>{
        
       // this.planArray.push(info.payload.doc.data().plan);
        
        return info.payload.doc.data()
       
       
      })
      this.loading = false;
      console.log(this.getItem.length)
      console.log(this.getItem)
      console.log(this.planArray)
    })

   
   
 
  }

  getDetailsbyId(id)
  {
    console.log(id);
    this.service.getDetailsByID(id).subscribe((data:any)=>{
      console.log(data);
    })
  }

 
 
  deteleDetails(id)
  {
    this.service.confirmDelete(id)

 
  }
 
}
