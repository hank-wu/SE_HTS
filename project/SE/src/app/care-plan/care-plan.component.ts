import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import { CarePlanService } from "./care-plan.service";
import item from '../body-observation/item';
import { CarePlanDetailDialog } from "./care-plan-detail.component";

export interface CarePlan {
  // subject: string;
  type: string;
  value: number;
  name: string;
  id: number;
}
@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrls: ['./care-plan.component.css']
})
export class CarePlanComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table : MatTable<CarePlan>;
  displayedColumns: string[] = ['select', 'name', 'type', 'value'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  deleteDisabled = true;
  selectType = "all";
  value: number;
  name: string;
  itemOption: item[] = [];

  currentSelectedRow = null;

  currentCheckedValue = null;
  constructor(private ren: Renderer2, public dialog: MatDialog, private bodyObservationService: BodyObservationService,
    private carePlanService: CarePlanService) { }

  ngOnInit() {
    this.bodyObservationService.getAllObservationItem((data)=>{
      this.getItemSuccess(data, this.carePlanService);
    },this.failureCallback);
  }

  getItemSuccess(data, carePlanService): void{
    if(data.hasOwnProperty("entry")){
      this.setObservationItem(data["entry"]);
    }
    carePlanService.getAllCarePlan(data => {
      this.dataSource = new MatTableDataSource<CarePlan>([]);
      if(data.hasOwnProperty("entry")){
        data["entry"].forEach(element => {
          this.setCarePlan(element["resource"]);
        });
      }
    }, this.failureCallback);
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

  setCarePlan(carePlan){
    let type = "無";
    let value = 0;
    let name = "無";
    let id = -1;

    if(carePlan.hasOwnProperty("id")){
      id = carePlan['id'];
    }
    
    if(carePlan.hasOwnProperty("target")){
      if(carePlan["target"][0].hasOwnProperty("detailQuantity"))
        if(carePlan["target"][0]["detailQuantity"].hasOwnProperty("value"))
        value = carePlan["target"][0]["detailQuantity"]["value"];
    }else
      return;

    if(carePlan.hasOwnProperty("description"))
      if(carePlan["description"].hasOwnProperty("text"))
        name = carePlan["description"]["text"];
      
    if(carePlan.hasOwnProperty("outcomeReference")){
      let itemType = carePlan["outcomeReference"][0]["reference"].split('/')[1];
      this.itemOption.forEach((item)=>{
        if(item.id == itemType)
          type = item.type;
      });
    }
    let ob = {
      // 'subject': subject,
      'type': type,
      'value': value,
      'name': name,
      'id': id
    }
    this.dataSource.data.push(ob);
  }

  private failureCallback(error){
    console.log("error = ", error);
  }

  checkState(el, row) {
    setTimeout(() => {
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
        this.currentSelectedRow = null;
        this.enableButtonBySelectData(false);
      } else {
        this.currentCheckedValue = el.value;
        this.currentSelectedRow = row;
        this.enableButtonBySelectData(true);
      }
      
    })
  }

  private enableButtonBySelectData(enable){
    this.readDisabled = !enable;
    this.editDisabled = !enable;
    this.deleteDisabled = !enable;
  }

  clickNew(){
    const dialogRef = this.dialog.open(CarePlanDetailDialog, {
      width: '500px',
      data: {
        id: null,
        itemOption: this.itemOption
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterClickNew(result);
    });
  }

  afterClickNew(result){
    if(result === undefined) return;
      this.carePlanService.getCarePlan(result, 
        (data)=>{
          this.setCarePlan(data.entry[0].resource);
          this.table.renderRows();
        }, this.failureCallback);
  }

  clickEdit(){
    const dialogRef = this.dialog.open(CarePlanDetailDialog, {
      width: '500px',
      data: {
        id: this.currentSelectedRow.id,
        itemOption: this.itemOption
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) return;
        
      this.afterClickEdit(result);    
      this.table.renderRows();
      });
  }

  clickDelete(){
    this.carePlanService.deleteCarePlan(this.currentSelectedRow.id,data=>{
      let index = this.dataSource.data.findIndex((element)=>{
        return element === this.currentSelectedRow;
      })
      this.currentSelectedRow = null;
      this.dataSource.data.splice(index, 1);
      this.table.renderRows();
      this.enableButtonBySelectData(false);
    },this.failureCallback)
  }

  afterClickEdit(result){
    if(result.hasOwnProperty("target")){
      if(result["target"][0].hasOwnProperty("detailQuantity"))
        if(result["target"][0]["detailQuantity"].hasOwnProperty("value"))
        this.currentSelectedRow.value = result["target"][0]["detailQuantity"]["value"];
    }

    if(result.hasOwnProperty("description"))
      if(result["description"].hasOwnProperty("text"))
        this.currentSelectedRow.name = result["description"]["text"];
      
    if(result.hasOwnProperty("outcomeReference")){
      let itemType = result["outcomeReference"][0]["reference"].split('/')[1];
      this.itemOption.forEach((item)=>{
        if(item.id == itemType)
          this.currentSelectedRow.type = item.type;
      });
    }
  }

}
