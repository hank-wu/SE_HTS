import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {BodyObservationDetailDialog} from './body-observation-detail.component'
import { BodyObservationService } from '../body-observation.service';
import * as moment from 'moment';
import item from './item';
export interface Observation {
  // subject: string;
  type: string;
  value: number;
  unit: string;
  id: number;
  date: string;
}

@Component({
  selector: 'app-body-observation',
  templateUrl: './body-observation.component.html',
  styleUrls: ['./body-observation.component.css']
})
export class BodyObservationComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table;
  displayedColumns: string[] = ['select', 'type', 'value', 'unit', 'date'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  deleteDisabled = true;
  selectType = "all";
  value: number;
  unit: string;
  itemOption: item[] = [];
  selected = {
    start: moment(),
    end: moment()
  };
  locale = {
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    format: 'YYYY-MM-DD'
  }

  currentSelectedRow = null;

  currentCheckedValue = null;
  ngOnInit() {
    this.bodyObservationService.getAllObservationItem((data)=>{
      this.getItemSuccess(data, this.bodyObservationService);
    },this.failureCallback);
    
  }
  constructor(private ren: Renderer2, public dialog: MatDialog, private bodyObservationService: BodyObservationService) { 
    
  }

  getItemSuccess(data, bodyObservationService): void{
    if(data.hasOwnProperty("entry")){
      this.setObservationItem(data["entry"]);
    }
    var dateRange = {
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD')
    }
    bodyObservationService.getAllObservation(dateRange, this.selectType, data => {
      this.dataSource = new MatTableDataSource<Observation>([]);
      if(data.hasOwnProperty("entry")){
        data["entry"].forEach(element => {
          this.setObservation(element["resource"]);
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

  private failureCallback(error){
    console.log("error = ", error);
  }

  search(){
    var dateRange = {
      start: this.selected.start.format('YYYY-MM-DD'),
      end: this.selected.end.format('YYYY-MM-DD')
    }
    this.bodyObservationService.getAllObservation(dateRange, this.selectType, data => {
      this.dataSource = new MatTableDataSource<Observation>([]);
      if(data.hasOwnProperty("entry")){
        data["entry"].forEach(element => {
          this.setObservation(element["resource"]);
        });
      }
      this.table.renderRows();
    }, this.failureCallback);
  }


  setObservation(observation){
    let type = "無";
    let value = 0;
    let unit = "無";
    let id = -1;
    let date = "無";

    if(observation.hasOwnProperty("id")){
      id = observation['id'];
    }
    
    if(observation.hasOwnProperty("valueQuantity")){
      if(observation["valueQuantity"].hasOwnProperty("value"))
        value = observation["valueQuantity"]["value"];
    }else{
      return;
    }

    if(observation.hasOwnProperty("derivedFrom")){
      let itemType = observation["derivedFrom"][0]["reference"].split('/')[1];
      this.itemOption.forEach((item)=>{
        if(item.id == itemType){
          unit = item.unit;
          type = item.type;
        }
      });
    }    

    if(observation.hasOwnProperty("effectiveDateTime")){
      date = observation["effectiveDateTime"];
    }
    let ob = {
      // 'subject': subject,
      'type': type,
      'value': value,
      'unit': unit,
      'id': id,
      'date': date
    }
    this.dataSource.data.push(ob);
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

  clickDelete(){
    this.bodyObservationService.deleteObservation(this.currentSelectedRow.id, data=>{
      let index = this.dataSource.data.findIndex((element)=>{
        return element === this.currentSelectedRow;
      })
      this.currentSelectedRow = null;
      this.dataSource.data.splice(index, 1);
      this.table.renderRows();
      this.enableButtonBySelectData(false);
    }, this.failureCallback);
  }

  clickNew(){
    const dialogRef = this.dialog.open(BodyObservationDetailDialog, {
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
      this.bodyObservationService.getObservation(result, 
        (data)=>{
          this.setObservation(data.entry[0].resource);
          this.table.renderRows();
        }, this.failureCallback);
  }

  clickEdit(){
    const dialogRef = this.dialog.open(BodyObservationDetailDialog, {
      width: '500px',
      data: {
        id: this.currentSelectedRow.id,
        itemOption: this.itemOption
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterClickEdit(result);
      });
  }

  afterClickEdit(result){
      if(result === undefined) return;
      
      if(result.hasOwnProperty("valueQuantity")){
        if(result["valueQuantity"].hasOwnProperty("value"))
          this.currentSelectedRow.value = result["valueQuantity"]["value"];
        if(result["valueQuantity"].hasOwnProperty("unit"))
          this.currentSelectedRow.unit = result["valueQuantity"]["unit"];
      }

      if(result.hasOwnProperty("effectiveDateTime")){
        this.currentSelectedRow.date = result["effectiveDateTime"];
      }

      if(result.hasOwnProperty("derivedFrom")){
        let itemType = result["derivedFrom"][0]["reference"].split('/')[1];
        this.itemOption.forEach((item)=>{
          if(item.id == itemType){
            this.currentSelectedRow.unit = item.unit;
            this.currentSelectedRow.type = item.type;
          }
        });
      }

      this.table.renderRows();
  }
}
