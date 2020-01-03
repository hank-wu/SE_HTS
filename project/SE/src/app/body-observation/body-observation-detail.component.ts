import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BodyObservationService } from '../body-observation.service';
import * as moment from 'moment';
import item from './item';
import { ObservationDTO } from './observation-DTO';

export interface DialogData {
    itemOption: item[];
    id: number;
}
export interface Unit {
  value: string;
}

@Component({
    selector: 'app-body-observation-detail',
    templateUrl: './body-observation-detail.html',
  })

export class BodyObservationDetailDialog implements OnInit {
    value: number;
    unit: string;
    title: string;
    date: Date;
    selectedType: string;
    itemOption: item[] = [];
    ngOnInit() {}
    constructor(
      public dialogRef: MatDialogRef<BodyObservationDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public dialogdata: DialogData,
      private bodyObservationService: BodyObservationService) {
        this.itemOption = this.dialogdata.itemOption;
        if (this.dialogdata.id == undefined){
          this.title = 'Create new observation';
          this.date = new Date();
        } else {
          this.title = 'Edit observation';
          bodyObservationService.getObservation(this.dialogdata.id, result => {
            if (result.hasOwnProperty('entry')) {
              const data = result.entry[0].resource;
              if (data.hasOwnProperty('valueQuantity')) {
                if (data.valueQuantity.hasOwnProperty('value')) {
                  this.value = data.valueQuantity.value;
                }

              }
              // this.selectedType = this.itemOption[this.dialogdata.id].type;

              if (data.hasOwnProperty('effectiveDateTime')) {
                this.date = new Date(data.effectiveDateTime);
              }

              if (data.hasOwnProperty('derivedFrom')) {
                const itemType = data.derivedFrom[0].reference.split('/')[1];
                this.selectedType = itemType;
              }
            }
          }, error => {
            console.log('referenceerror = ', error);
          });
        }
      }
    onNoClick(): void {
      this.dialogRef.close();
    }
    private httpBody() {
      const dateString = moment(this.date).format('YYYY-MM-DD');

      const body = new ObservationDTO(this.value, this.selectedType, dateString).getBody();

      if (this.dialogdata.id !== undefined) {
        body.id = this.dialogdata.id;
      }
      return body;
    }

    onOkClick(): void {
        const body = this.httpBody();
        this.bodyObservationService.createObservation(body, data => {
            this.dialogRef.close(data.id);
        }, error => {
          console.log('error = ', error);
        });
    }
    onUpdateClick(): void {
      const body = this.httpBody();
      this.bodyObservationService.editObservation(this.dialogdata.id, body, data => {
        this.dialogRef.close(data);
      }, error => {
        console.log('error = ', error);
      });
    }

    getUnit(): string {
      let unit = '';
      this.itemOption.forEach((element) => {
        if (this.selectedType === element.id) {
          unit = element.unit;
          this.unit = element.unit;
        }
      });
      return unit;
    }
}
