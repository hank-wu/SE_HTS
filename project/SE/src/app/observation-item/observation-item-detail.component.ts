import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import { ObservationItemDTO } from './observation-item-DTO'

export interface DialogData {
    item: string;
    unit: string;
}

@Component({
    selector: 'observation-item-detail',
    templateUrl: './observation-item-detail.html',
})

export class ObservationItemDetailDialog implements OnInit {
    title: string;
    item: string;
    unit: string;

    constructor(
        public dialogRef: MatDialogRef<ObservationItemDetailDialog>,
        @Inject(MAT_DIALOG_DATA) public id: DialogData, 
        private bodyObservationService: BodyObservationService) {
          if(this.id == undefined){
            this.title = "Create new observation item";
          }else{
            this.title = "Edit observation item";
            bodyObservationService.getObservation(this.id, result =>{
              if(result.hasOwnProperty("entry")){
                let data = result["entry"][0]["resource"];
                if(data.hasOwnProperty("valueQuantity")){
                  if(data["valueQuantity"].hasOwnProperty("unit"))
                    this.unit = data["valueQuantity"]["unit"];
                }
                if(data.hasOwnProperty("code")){
                  this.item = data["code"]["text"];
                }
              }
            },error=>{
              console.log("error = ", error)
            });
          }
        }

    private httpBody(){
      var body = new ObservationItemDTO(this.item, this.unit).getBody();
      if (this.id!= undefined){
        body.id = this.id;
      }
      return body;
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    onOkClick(): void {
      let body = this.httpBody();
      this.bodyObservationService.createObservation(body, data=>{
          this.dialogRef.close(data.id);
      }, error=>{
        console.log("error = ", error);
      });
    }

    onUpdateClick(): void {
      let body = this.httpBody();
      this.bodyObservationService.editObservation(this.id, body, data=>{
        this.dialogRef.close(data);
      }, error=>{
        console.log("error = ", error);
      });
    }
    
    ngOnInit() {}
}