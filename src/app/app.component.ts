import { Component,OnInit } from '@angular/core';
import {get} from 'scriptjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'material-plan';

  ngOnInit()
  {
    get("https://code.jquery.com/jquery-1.12.4.js",()=>{

    });
    get("https://code.jquery.com/ui/1.12.1/jquery-ui.js",()=>{});

  }
}

// apiKey: "AIzaSyDk80bmtxeOXVitJCgBqjnI-MXYo69RrvU",
//     authDomain: "material-plan.firebaseapp.com",
//     databaseURL: "https://material-plan.firebaseio.com",
//     projectId: "material-plan",
//     storageBucket: "",
//     messagingSenderId: "631817761829",
//     appId: "1:631817761829:web:1f28034051f084b9"

// https://github.com/angular/angularfire2