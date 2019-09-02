import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../../service/service.service'
import { InsertItem } from 'src/app/details.model';
import {Router} from '@angular/router'

@Component({
  selector: 'app-detail-id',
  templateUrl: './detail-id.component.html',
  styleUrls: ['./detail-id.component.css']
})
export class DetailIdComponent implements OnInit {

  materialDetails: InsertItem[]=[{plan:'',section:'',items:''}];
  loading: boolean;
  empty=false;
 
  

  constructor(private route:ActivatedRoute,
    private service:ServiceService,
    private router:Router) { }

  ngOnInit() {
    // if(!this.service.user)
    // {
    //   this.router.navigate(['/'])
    // }
    this.loading = true;
  
    console.log(this.materialDetails.length)
    console.log(this.loading)
    console.log(this.route.pathFromRoot);
    this.route.params.subscribe((data:any)=>{
      console.log(data.id);
      this.service.getDetailsByID(data.id).subscribe((detail:any)=>{
        if(typeof detail == "undefined")
        {
         
          this.materialDetails = [{plan:'',section:'',items:''}];
          this.empty= true;
        }
        else
        {
          this.materialDetails=detail;
          this.empty=false;
         
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
