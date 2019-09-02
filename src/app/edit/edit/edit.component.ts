import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import { ServiceService } from 'src/app/service/service.service';
import { InsertItem, PlannedDetails, ActualDetails, CombinedDetails } from 'src/app/details.model';
import Swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/firestore'

declare var $: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editItem:InsertItem[]=[];
  edit_plannedItem : PlannedDetails[] =[];
edit_actualItem  : ActualDetails[]=[];
saveItem:InsertItem[];
  actLen=0;
  actIndex;
  planIndex;
  planLen=0;
  loading:boolean=true;
  plannedSize: number;
  actualSize: number;
  combinedItem : CombinedDetails[]=[];
  section;
  plan;
  constructor(private route: ActivatedRoute, private service:ServiceService, private firestore:AngularFirestore,
    private router:Router) { }

  ngOnInit() {
    // if(!this.service.user)
    // {
    //   this.router.navigate(['/'])
    // }
    let refer=this;
    this.loading=true;
    this.route.params.subscribe((data:any)=>{
    console.log(data)
    this.plan=data.id
    this.service.getDetailsByID(data.id).subscribe((detail:any)=>{
      console.log(detail.items.length)
      detail.items.forEach((element,index) => {
        if(element.actQty!=0)
        {
          console.log(element.actQty)
          this.actLen++;
          this.actIndex=index;
        }
        if(element.planQty!=0)
        {
          console.log(element.planQty)
            this.planLen++;
            this.planIndex=index;
        }
      
      });
      console.log(this.actLen)
      console.log(this.planLen)
      console.log(this.actIndex);
      console.log(this.planIndex)
    this.editItem=detail;
    this.loading=false;
    
     
    })

    })

    $(document).ready(function(){
      
      console.log("ak")

      var editadd = `<div class="row edit-add">
                      <div class="form-group form-inline">
                      <label for="len" class="mr-4"><b>Length</b></label>
                      <input type="number" name="len" id="len" class="form-control col-md-2 mr-3 edit-plan-len edited" >
             
                       <label for="planed" class="mr-3"><b>Plan Qty</b></label>
                        <input type="number" name="planed" id="planned" class="form-control col-md-2 mr-4 edit-plan-qty edited">
                        <button class="btn btn-outline-primary mr-2" type="button" id="dyn-editremove"><b>-</b></button>
                        </div>
                     </div>`;

     var acteditadd=`<div class="row edit-add-act">
                     <div class="form-group form-inline">
                    <label for="actlen" class="mr-4"><b>Length</b></label>
                     <input type="number" name="actlen" id="act-len" class="form-control col-md-2 mr-3 edit-act-len edited" >
            
                     <label for="act" class="mr-3"><b>ActQty</b></label>
                     <input type="number" name="act" id="act" class="form-control col-md-2 mr-4 edit-act-qty edited">
                    <button class="btn btn-outline-dark mr-2" type="button" id="dyn-act-editremove"><b>-</b></button>
              </div>
               </div>`
               
               //Dynamically add the elements....

                     $(document).on("click",'#editAdd',function(){
                      
                     $(".append-item").append(editadd)
                     $(".edited").addClass("remove-arrows");
                     });

                     $(document).on('click','#act-edit-Add',function(){

                      $(".act-append-item").append(acteditadd);
                      $(".edited").addClass("remove-arrows");
                     });

                     //Remove dynamically created elements

                     $(document).on('click','#dyn-editremove',function(){
                      
                          $(this).closest(".edit-add").remove();
                     });

                     $(document).on('click','#dyn-act-editremove',function(){
                      console.log("aka")

                      $(this).closest(".edit-add-act").remove();
                     });

                    $(document).on('click','#editremove',function(){
                      
                  $(this).closest(".original-item").remove();
                     });

                     $(document).on('click','#acteditremove',function(){
                      
              $(this).closest(".original-act-item").remove();
                     });

                     $(document).on('click','#save',function(){

                          console.log("al");
                          var sec, len, qty, actlen,actqty;
                          sec=$("#sec").val();
                          len=$("#len-req").val();
                          qty=$("#planned-req").val();
                          actlen=$('#act-len-req').val();
                          actqty =$('#act-req').val();
                          console.log(sec,len,qty,actlen,actqty)
                          
                          if(sec==''||len==''||qty==''||actlen==''||actqty=='')
                          {
                            Swal.fire({
                              title:'Fill mandatory field',
                              text:'Please provide values to required field',
                              type:"error",
                              showConfirmButton:true
                            })
                          }
                          else{

                            Swal.fire({
                                                      
                            title:"Are you sure you want to save records??",
                            text:"Action cannot be reversed ",
                            type:"info",
                            showCancelButton:true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText:'No' 

                            }).then((result)=>{

                              if(result.value)
                              {
                                refer.section=sec;
                                var length= $(".edit-plan-len");
                                var quantity = $(".edit-plan-qty");
                                var actualLength = $(".edit-act-len");
                                var actualQuantity = $(".edit-act-qty");
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
    
                                  console.log(planLen,planQty,actLen,actQty)
                                  refer.getplannedItems(planLen,planQty,planLen.length)
                                  refer.getactualItem(actLen,actQty,actLen.length)
    
                  //remove dynamically created elements after save
                        $(".append-item").remove()
                        $(".act-append-item").remove()
    
                      // create div after click
                   $(".add-after").after("<div  class=\"append-item \"> </div>")
                   $(".add-after-act").after("<div class=\"act-append-item \"> </div>")
          
                              }
                              else{

                              }
                             

                            })
                            
                          }
                     });

                  

    });
  }


  getplannedItems(planLen:number[],planQty:number[],len:number)
  {
    //console.log(len)

   this.edit_plannedItem=[];  
     for(let i=0;i<len;i++)
     {
       this.edit_plannedItem.push({"length":Number(planLen[i]),"qty":Number(planQty[i])})
      
     }
     //console.log(this.edit_plannedItem)
     for (let i=0;i<len;i++) {
       for (let j=i+1;j<len;j++) {
         if (this.edit_plannedItem[i].length == this.edit_plannedItem[j].length) {
          this.edit_plannedItem[i].qty = this.edit_plannedItem[i].qty + this.edit_plannedItem[j].qty;
          this.edit_plannedItem.splice(j, 1);
          len--;
         }
       }
     }
     this.plannedSize=this.edit_plannedItem.length;
     this.edit_plannedItem.sort(function(a,b){return a.length-b.length});
    
     console.log(this.edit_plannedItem)
     console.log(this.plannedSize)
   
    
  }

  getactualItem (actLen:number[],actQty:number[],len:number)
  {
    this.edit_actualItem =[];
    for(let i=0;i<len;i++)
    {
      this.edit_actualItem .push({"length":Number(actLen[i]),"qty":Number(actQty[i])})
     
    }
    for (let i=0;i<len;i++) {
      for (let j=i+1;j<len;j++) {
        if (this.edit_actualItem [i].length == this.edit_actualItem [j].length) {
         this.edit_actualItem [i].qty = this.edit_actualItem [i].qty + this.edit_actualItem [j].qty;
         this.edit_actualItem .splice(j, 1);
         len--;
        }
      }
    }
   
    this.actualSize=this.edit_actualItem .length;
    this.edit_actualItem .sort(function(a,b){return a.length-b.length});
    console.log(this.edit_actualItem )
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
       if(this.edit_actualItem[i].length===this.edit_plannedItem[j].length)
       {
         this.combinedItem.push({"length":Number(this.edit_actualItem[i].length),
                                "actQty":Number(this.edit_actualItem[i].qty),
                                "planQty":Number(this.edit_plannedItem[j].qty)});
          
          isPresent=true;
          break;
       }
      
     }
     if(isPresent==false)
     {
      this.combinedItem.push({"length":Number(this.edit_actualItem[i].length),
                            "actQty":Number(this.edit_actualItem[i].qty),
                            "planQty":Number(0)});
     }
   }
  // console.log(this.combinedItem)

   for(let i=0;i<this.plannedSize;i++)
   {
     let isPresent =false;
     for(let j=0;j<this.actualSize;j++)
     {
       if(this.edit_plannedItem[i].length===this.edit_actualItem[j].length)
       {
          
          isPresent=true;
       }
      
     }
     if(isPresent==false)
     {
      this.combinedItem.push({"length":Number(this.edit_plannedItem[i].length),
                            "actQty":Number(0),
                            "planQty":Number(this.edit_plannedItem[i].qty)});
     }
   }
   this.combinedItem.sort(function(a,b){return a.length-b.length});
   console.log(this.combinedItem)
   
this.saveDetails();
  }


  saveDetails()
  {
    this.firestore.collection('details').doc(this.plan)
    .set({  plan:this.plan,section:this.section,items: this.combinedItem }).then(()=>{

      Swal.fire({

        title:'Success',
                text:'Your values are saved',
                type:"success",
                timer:2000,
                showConfirmButton:false

      })
    })
    .catch((error:any)=>{
      Swal.fire({

        title:'Sorry!!!',
                text:'Try again later',
                type:"error",
                showConfirmButton:true

      })
      
    })
  }
}
