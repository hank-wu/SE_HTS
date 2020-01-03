import { Component, OnInit } from '@angular/core';
import { BodyObservationService } from '../body-observation.service'
import item from '../body-observation/item';
import { CarePlanService } from "../care-plan/care-plan.service";
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  itemOption: item[] = [];
  messages = [];

  constructor(private bodyObservationService: BodyObservationService, private carePlanService: CarePlanService) { }

  ngOnInit() {
    this.bodyObservationService.getAllObservationItem((data)=>{
      this.getItemSuccess(data);
    },this.failureCallback);
  }

  getItemSuccess(data): void{
    if(data.hasOwnProperty("entry")){
      this.setObservationItem(data["entry"]);
    }

    this.carePlanService.getAllCarePlan(data=>{
      this.getCarePlanSuccess(data, this.bodyObservationService);
    },this.failureCallback);
  }

  setObservationItem(itemSource):void{
    itemSource.forEach((item)=>{
      this.itemOption.push({
        id: item.resource.id,
        type: item.resource.code.text,
        unit: item.resource.valueQuantity.unit
      });
    });
  }

  getCarePlanSuccess(data, bodyObservationService): void {
    if(data.hasOwnProperty("entry")){
      data["entry"].forEach(element=>{
        if(!element["resource"].hasOwnProperty("outcomeReference")){
          return;
        }
        let itemId = element["resource"]["outcomeReference"][0].reference.split('/')[1]; 
        let planName = element["resource"]["description"]["text"];
        let itemName = "";

        var dateRange = {
          start: moment().format('YYYY-MM-DD'),
          end: moment().format('YYYY-MM-DD')
        };
        
        this.itemOption.forEach(item=>{
          if(itemId == item.id){
            itemName = item.type;
            return;
          }
        })
        
        bodyObservationService.getAllObservation(dateRange, itemId, 
          data=>{
            this.getObservationSuccess(data,itemName, planName, this.messages)
          }, this.failureCallback);
      })
    }
  }

  getObservationSuccess(data, itemName, planName, messages){
    if(!data.hasOwnProperty("entry")){
      messages.push({
        "text": planName + "需要今天記錄你的" + itemName
      })
    }else if(data["entry"].length == 1 && !data["entry"][0].resource.hasOwnProperty("valueQuantity")){
      messages.push({
        "text": planName + "需要今天記錄你的" + itemName
      })
    }
  }

  failureCallback(): void{
    console.log("FHIR fail");
  }

}
