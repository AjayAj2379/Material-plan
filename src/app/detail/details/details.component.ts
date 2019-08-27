import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { InsertItem } from 'src/app/details.model';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  getItem:InsertItem[];
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.service.getDetails().subscribe((data:any)=>{
      
      this.getItem = data.map(info =>{
        return info.payload.doc.data();
       
      })
      console.log(this.getItem)
    });

  }

}
