import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { InsertItem } from 'src/app/details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  getItem:InsertItem[]=[];
  planArray=[];
  serialNo=1;
  loading: boolean;

  constructor(private service: ServiceService,
    private firestore: AngularFirestore ) { }

  ngOnInit() {
    this.loading = true;
    this.service.getDetails().subscribe((data:any)=>{
      this.planArray=[];
      this.getItem = data.map(info =>{
        
       // this.planArray.push(info.payload.doc.data().plan);
        
        return info.payload.doc.data()
       
      })
      this.loading = false;
      console.log(this.getItem)
      console.log(this.planArray)
    });

   
   
 
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