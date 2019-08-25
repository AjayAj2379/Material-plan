import { Component, OnInit } from '@angular/core';
import {PlannedDetails, ActualDetails} from '../details.model'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

plannedItem : PlannedDetails[] =[];
actualItem : ActualDetails[]=[];
section : string;

  constructor() { }

  ngOnInit() {
    
    let refer = this;
    $(document).ready (function(){


      // $(document).load(function(){

      //   console.log("aja")
      // });

     


      var add= ` <div class="row add-item">
              <div class="form-group form-inline">
              <label for="planLen" class="mr-5"><b>Length</b></label>
              <input type="number" name="planLen" id="" class="form-control col-md-2 mr-4 planLen inputNum">
              <label for="planQty" class="mr-3"><b>Quantity</b></label>
              <input type="number" name="planQty" id="" class="form-control col-md-2 mr-2 planQty inputNum">
              <button class="btn btn-info mr-2"   type="button" id="remove"><b>-</b></button>
              <button class="btn btn-info"  type="button" id="addbutton"><b>+</b></button>
              </div>
                  </div>`;
      var actualAdd =`<div class="row act-add-item">
                    <div class="form-group form-inline">
                    <label for="ActplanLen" class="mr-3"><b>Length</b></label>
                    <input type="number" name="ActplanLen" id="" class="form-control col-md-2 mr-4 ActplanLen inputNum">
                    <label for="ActplanQty" class="mr-3"><b>Quantity</b></label>
                    <input type="number" name="ActplanQty" id="" class="form-control col-md-2 mr-2 ActplanQty inputNum">
                    <button class="btn btn-dark mr-2"  type="button" id="actremove"><b>-</b></button>
                    <button class="btn btn-dark"  type="button" id="actaddbutton"><b>+</b></button>
                    </div>
                      </div>`
      var planLen=[];
      var planQty=[];
      var actLen=[];
      var actQty=[];

    

        // Dynamically add the length and quantity field        

      $("#add").click(function(){

        $(".lenQty").append(add);
      
        $(".inputNum").addClass("remove-arrow")

      });

      $("#actadd").click(function(){

        $(".actLenQty").append(actualAdd);
         $(".inputNum").addClass("remove-arrow")
      });


      // Dynamically remove the length and quantity field
      //REMOVE

      $(document).on('click','#remove',function(){
    
        $(this).closest(".add-item").remove();
       });

       $(document).on('click','#actremove',function(){
    
        $(this).closest(".act-add-item").remove();
       });

       // ADD

       $(document).on('click','#addbutton',function(){
    
        $(".lenQty").append(add);
        $(".inputNum").addClass("remove-arrow");
      
     
        
       });
       $(document).on('click','#actaddbutton',function(){
    
        $(".actLenQty").append(actualAdd);
        $(".inputNum").addClass("remove-arrow")
       });

       // on submit transfer the values

       $(document).on('click','#submit',function(){
        var length= $(".planLen");
        var quantity = $(".planQty");
        var actualLength = $(".ActplanLen");
        var actualQuantity = $(".ActplanQty");

        $.each(length,function(i,ele){
         planLen.push(length[i].value)
        });

        $.each(quantity,function(i,ele){
          planQty.push(quantity[i].value)
         });

         $.each(actualLength,function(i,ele){
          actLen.push(actualLength[i].value)
         });

         $.each(actualQuantity,function(i,ele){
          actQty.push(actualQuantity[i].value)
         });
 
          
         console.log(planLen.length)
         refer.getPlannedItems(planLen,planQty,planLen.length)
         refer.getActualItems(actLen,actQty,actLen.length)

        });

     
    });

  }

  getPlannedItems(planLen,planQty,len)
  {
    console.log(len)

    this.plannedItem=[];
     for(let i=0;i<len;i++)
     {
       this.plannedItem.push({"length":planLen[i],"qty":planQty[i]})
      
     }
     console.log(this.plannedItem)
   
    
  }

  getActualItems(actLen,actQty,len)
  {
    this.actualItem=[];
    for(let i=0;i<len;i++)
    {
      this.actualItem.push({"length":actLen[i],"qty":actQty[i]})
     
    }
    console.log(this.actualItem)
   
  }
}
