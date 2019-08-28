import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../../service/service.service'
import { InsertItem } from 'src/app/details.model';

@Component({
  selector: 'app-detail-id',
  templateUrl: './detail-id.component.html',
  styleUrls: ['./detail-id.component.css']
})
export class DetailIdComponent implements OnInit {

  materialDetails: InsertItem[]=[];
  loading: boolean;
  empty=false;
 
  

  constructor(private route:ActivatedRoute,
    private service:ServiceService) { }

  ngOnInit() {
    this.loading = true;
  
    console.log(this.materialDetails.length)
    console.log(this.loading)
    console.log(this.route.pathFromRoot);
    this.route.pathFromRoot[2].params.subscribe((data:any)=>{

      console.log(data.id);
      this.service.getDetailsByID(data.id).subscribe((detail:any)=>{
        if(typeof detail == "undefined")
        {
         
          this.materialDetails = [];
          this.empty= true;
        }
        else
        {
          this.materialDetails=detail;
         
        }
        this.loading=false;
        console.log(this.materialDetails)
      
      
      })
    

    })

  }
  onDelete(id)
  {
    console.log(id);
    this.service.confirmDelete(id)
 
  }

}
