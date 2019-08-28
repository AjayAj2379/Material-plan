import { Component, OnInit } from '@angular/core';
import {PlannedDetails, ActualDetails, CombinedDetails, InsertItem} from '../details.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {ServiceService} from '../service/service.service'
import {NgForm, SelectControlValueAccessor} from '@angular/forms';
import Swal from 'sweetalert2'
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

plannedItem : PlannedDetails[] =[];
actualItem : ActualDetails[]=[];
plannedSize: number;
actualSize:number;
section : string;
plan: string='';
buttonActivate= true;
planArray=[];
jquery;

combinedItem : CombinedDetails[]=[];
finalItem : InsertItem;
  getItem: any;
  idexist: boolean;
  constructor(private fireStore : AngularFirestore,
    private service : ServiceService) { 
 
 
  }

  ngOnInit() {
  
  this.resetForm()
    let refer = this;
  
    $(document).ready (function(){
      var len,qty,actLen,actQty;
      
     
    
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
       //
    
     $("#planLen,#planQty,#ActplanLen,#ActplanQty").on('input',function(){

    len= $("#planLen").val();
     qty= $("#planQty").val();
     actLen= $("#ActplanLen").val();
     actQty= $("#ActplanQty").val()

     if(len==''|| qty==''||actLen==''||actQty=='')
     {
          refer.buttonActivate=true;
     }
     else{
       refer.buttonActivate=false;
     }
     })
     
     

       // on submit transfer the values

       $(document).on('click','#submit',function(){
        var confirm;
        
       refer.checkIdExist();
       setTimeout(()=>{
        console.log(refer.idexist)
        if(refer.idexist)
        {
      Swal.fire({
                title:'Plan ID already exist',
                text:'Please provide different name',
                type:"error"
              })
      
        }
        else{
          
        Swal.fire({
          title:"Are you Sure you want to submit??",
          text:"You cannot undo it",
          type:"info",
          showCancelButton:true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText:'No' }).then((result)=>{

            if(result.value)
            {
              confirm = true;
              console.log(confirm);
      
              var length= $(".planLen");
              var quantity = $(".planQty");
              var actualLength = $(".ActplanLen");
              var actualQuantity = $(".ActplanQty");
              var planLen=[];
              var planQty=[];
              var actLen=[];
              var actQty=[];
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
       
                
              // console.log(planLen.length)
               refer.getPlannedItems(planLen,planQty,planLen.length)
               refer.getActualItems(actLen,actQty,actLen.length)
      
               //remove dynamically created elements
      
               $(".lenQty").remove()
               $(".actLenQty").remove()
      
               // reset the form after submit
      
                 $("#planLen").val('');
                 $("#planQty").val('');
                 $("#ActplanLen").val('');
                 $("#ActplanQty").val('')
                 $("#planName").val('');
                 $("#section").val('');
                 refer.buttonActivate=true;

                 // add the removed div
      
                 $(".plan-len-qty").after("<div class=\"lenQty form-group\"> </div>")
                 $(".act-len-qty").after("<div class=\"actLenQty form-group\"> </div>")
             
            }
            else{

            }
          });

        }

       },100)
          
           
      
    
        });

      
    });

  }


  resetForm(form?: NgForm){
if(form != null)
    form.resetForm();
    this.finalItem = {
     plan:'',
     items:'',
     section:''

    }
  }

  getPlannedItems(planLen:number[],planQty:number[],len:number)
  {
    //console.log(len)

   this.plannedItem=[];  
     for(let i=0;i<len;i++)
     {
       this.plannedItem.push({"length":Number(planLen[i]),"qty":Number(planQty[i])})
      
     }
     //console.log(this.plannedItem)
     for (let i=0;i<len;i++) {
       for (let j=i+1;j<len;j++) {
         if (this.plannedItem[i].length == this.plannedItem[j].length) {
          this.plannedItem[i].qty = this.plannedItem[i].qty + this.plannedItem[j].qty;
          this.plannedItem.splice(j, 1);
          len--;
         }
       }
     }
     this.plannedSize=this.plannedItem.length;
     this.plannedItem.sort(function(a,b){return a.length-b.length});
    
     console.log(this.plannedItem)
     console.log(this.plannedSize)
   
    
  }

  getActualItems(actLen:number[],actQty:number[],len:number)
  {
    this.actualItem=[];
    for(let i=0;i<len;i++)
    {
      this.actualItem.push({"length":Number(actLen[i]),"qty":Number(actQty[i])})
     
    }
    for (let i=0;i<len;i++) {
      for (let j=i+1;j<len;j++) {
        if (this.actualItem[i].length == this.actualItem[j].length) {
         this.actualItem[i].qty = this.actualItem[i].qty + this.actualItem[j].qty;
         this.actualItem.splice(j, 1);
         len--;
        }
      }
    }
   
    this.actualSize=this.actualItem.length;
    this.actualItem.sort(function(a,b){return a.length-b.length});
    console.log(this.actualItem)
    console.log(this.actualSize)
     this.formCombinedItem();
   
  }


  formCombinedItem()
  {
    this.combinedItem=[];
   for(let i=0;i<this.actualSize;i++)
   {
     let isPresent =false;
     for(let j=0;j<this.plannedSize;j++)
     {
       if(this.actualItem[i].length===this.plannedItem[j].length)
       {
         this.combinedItem.push({"length":Number(this.actualItem[i].length),
                                "actQty":Number(this.actualItem[i].qty),
                                "planQty":Number(this.plannedItem[j].qty)});
          
          isPresent=true;
          break;
       }
      
     }
     if(isPresent==false)
     {
      this.combinedItem.push({"length":Number(this.actualItem[i].length),
                            "actQty":Number(this.actualItem[i].qty),
                            "planQty":Number(0)});
     }
   }
  // console.log(this.combinedItem)

   for(let i=0;i<this.plannedSize;i++)
   {
     let isPresent =false;
     for(let j=0;j<this.actualSize;j++)
     {
       if(this.plannedItem[i].length===this.actualItem[j].length)
       {
          
          isPresent=true;
       }
      
     }
     if(isPresent==false)
     {
      this.combinedItem.push({"length":Number(this.plannedItem[i].length),
                            "actQty":Number(0),
                            "planQty":Number(this.plannedItem[i].qty)});
     }
   }
   this.combinedItem.sort(function(a,b){return a.length-b.length});
   
   this.addItem();

  }


 checkIdExist()
{
  this.service.getDetails().subscribe((data:any)=>{
    this.planArray=[];
    this.getItem = data.map(info =>{
      
      this.planArray.push(info.payload.doc.data().plan);
      
      return info.payload.doc.data();
     
    })
    if(this.planArray.includes(this.plan))
    {
     this.setValue(true)
 

    }
    else{
        this.setValue(false);
    }

   })

  

   //console.log(this.idexist)
  
}
setValue(check)
{

  if(check)
  {
    this.idexist=true;
  }
  else {
    this.idexist=false;
  }
 
}

  addItem()
  {
    console.log("added",this.plan)
    this.finalItem.plan= this.plan;
    this.finalItem.section=this.section;
    this.finalItem.items=this.combinedItem;
    console.log(this.finalItem)

  
    this.fireStore.collection('details').doc(this.plan).set(this.finalItem).then(() => {
      Swal.fire({
                title:'Success',
                text:'Your values are Inserted',
                type:"success",
                timer:2000,
                showConfirmButton:false
              })

    }).catch(() => {
      Swal.fire({
        title:'Offline!!',
        text:'Check your Internet Connection',
        type:"warning",
        timer:5000,
        showConfirmButton:false
      })

    });
    
  }
 
}


