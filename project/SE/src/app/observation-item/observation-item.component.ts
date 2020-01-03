import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import { ObservationItemDetailDialog } from "./observation-item-detail.component";

export interface ObservationItem {
  // subject: string;
  item: string;
  unit: string;
  id: number;
}

@Component({
  selector: 'app-observation-item',
  templateUrl: './observation-item.component.html',
  styleUrls: ['./observation-item.component.css']
})

export class ObservationItemComponent implements OnInit {
  @ViewChild(MatTable, {static:false}) table : MatTable<ObservationItem>;
  displayedColumns: string[] = ['select', 'item', 'unit'];
  dataSource;
  editDisabled = true;
  readDisabled = true;
  item: string;
  unit: string;

  currentSelectedRow = null;
  currentCheckedValue = null;

  constructor(private ren: Renderer2, public dialog: MatDialog, private bodyObservationService: BodyObservationService) { 
    bodyObservationService.getAllObservationItem( data => {
      this.dataSource = new MatTableDataSource<ObservationItem>([]);
      if(data.hasOwnProperty("entry")){
        data["entry"].forEach(element => {
          this.setObservationItem(element["resource"]);
        });
      }
    }, this.failureCallback);
  }

  private failureCallback(error){
    console.log("error = ", error);
  }

  setObservationItem(observationItem){
    let item = "無";
    let unit = "無";
    let id = -1;

    if(observationItem.hasOwnProperty("id")){
      id = observationItem['id'];
    }
    if(observationItem.hasOwnProperty("code") && observationItem["code"].hasOwnProperty("text") ){
      // if(observation["code"].hasOwnProperty("coding")){
        // if(observation["code"]["coding"].hasOwnProperty("display"))
          item = observationItem["code"]["text"];
      // }
    }
    if(observationItem.hasOwnProperty("valueQuantity")){
      if(observationItem["valueQuantity"].hasOwnProperty("unit"))
        unit = observationItem["valueQuantity"]["unit"];
    }

    let ob = {
      'item': item,
      'unit': unit,
      'id': id
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
    this.editDisabled = !enable;
  }

  clickNew(){
    const dialogRef = this.dialog.open(ObservationItemDetailDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterClickNew(result);
    });
  }

  afterClickNew(result){
    if(result === undefined) return;
    this.bodyObservationService.getObservation(result, 
      (data)=>{
        this.setObservationItem(data.entry[0].resource);
        this.table.renderRows();
      }, this.failureCallback);
  }

  clickEdit(){
    const dialogRef = this.dialog.open(ObservationItemDetailDialog, {
      width: '500px',
      data: this.currentSelectedRow.id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterClickEdit(result);
      this.table.renderRows();
    });
  }

  afterClickEdit(result){
      if(result === undefined) return;
      if(result.hasOwnProperty("valueQuantity") && result["valueQuantity"].hasOwnProperty("unit")){
        this.currentSelectedRow.unit = result["valueQuantity"]["unit"];
      }
      if(result.hasOwnProperty("code") && result["code"].hasOwnProperty("text")){
        this.currentSelectedRow.item = result["code"]["text"];
      }
  }

  ngOnInit() {
  }

}