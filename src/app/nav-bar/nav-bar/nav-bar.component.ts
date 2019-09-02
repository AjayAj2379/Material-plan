import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { ServiceService } from 'src/app/service/service.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2'
import { AuthServiceService } from 'src/app/auth-service.service';
declare var $:any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  planArray=[];
  constructor(private firestore:AngularFirestore, private authservice:AuthServiceService,
    private route:Router, private fireauth:AngularFireAuth  ) { }

  ngOnInit() {  

      let refer=this;
      
      console.log(this.planArray)
    this.firestore.collection('details').valueChanges().subscribe((data:any)=>{
      this.planArray=[];
            data.forEach(element => {
              this.planArray.push(element.plan)
            });
            console.log(this.planArray)
    })

    $(document).ready(function(){

      $("#searchfield").autocomplete({
        source: function (request, response) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(refer.planArray, function (item) {
                return matcher.test(item);
            }));
        }
    },{minLength:1});

    });

  }

  Onsearch(value)
  {
    console.log(value)
    this.route.navigate(['/main/detail/'+value])
  }

  logout()
  {
    
      this.authservice.logout();
  }
}
