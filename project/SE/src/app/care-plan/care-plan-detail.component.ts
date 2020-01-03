import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import { CarePlanService } from "./care-plan.service";
import item from '../body-observation/item'
import { CarePlanDTO } from './care-plan-DTO'

export interface DialogData {
    itemOption: item[];
    id: number;
}
export interface Unit {
  value: string;
}

@Component({
    selector: 'care-plan-detail',
    templateUrl: './care-plan-detail.html',
  })

export class CarePlanDetailDialog implements OnInit {
    value: number;
    name: string;
    title: string;
    selectedType: string;
    
    itemOption: item[] = [];

    constructor(
      public dialogRef: MatDialogRef<CarePlanDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public dialogdata:DialogData, 
      private carePlanService: CarePlanService) {
        this.itemOption = this.dialogdata.itemOption;
        if(this.dialogdata.id == null){
          this.title = "Create new care plan";
        }else{
          this.title = "Edit care plan";
          carePlanService.getCarePlan(this.dialogdata.id, data =>{
            let result = data["entry"][0]["resource"];
            if(result.hasOwnProperty("target")){
              if(result["target"][0].hasOwnProperty("detailQuantity"))
                if(result["target"][0]["detailQuantity"].hasOwnProperty("value"))
                this.value = result["target"][0]["detailQuantity"]["value"];
            }
        
            if(result.hasOwnProperty("description"))
              if(result["description"].hasOwnProperty("text"))
                this.name = result["description"]["text"];
              
            if(result.hasOwnProperty("outcomeReference")){
              let itemType = result["outcomeReference"][0]["reference"].split('/')[1];
              this.itemOption.forEach((item)=>{
                if(item.id == itemType)
                  this.selectedType = item.id;
              });
            }
          },error=>{
            console.log("error = ", error)
          });
        }
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    private httpBody(){

      var body = new CarePlanDTO(this.name, this.value, this.selectedType).getBody();

      if (this.dialogdata.id!= undefined){
        body.id = this.dialogdata.id;
      }
      return body;
    }

    onOkClick(): void {
        let body = this.httpBody();
        this.carePlanService.createCarePlan(body, data=>{
            this.dialogRef.close(data.id);
        }, error=>{
          console.log("error = ", error);
        });
    }
    onUpdateClick(): void {
      let body = this.httpBody();
      this.carePlanService.editCarePlan(this.dialogdata.id, body, data=>{
        this.dialogRef.close(data);
      }, error=>{
        console.log("error = ", error);
      });
    }

    ngOnInit() {}
}