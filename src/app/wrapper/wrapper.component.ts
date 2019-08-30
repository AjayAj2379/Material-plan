import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(private service:ServiceService, private route:Router) { }

  ngOnInit() {
    if(!this.service.user)
    {
      this.route.navigate(['/'])
    }
  }

}
