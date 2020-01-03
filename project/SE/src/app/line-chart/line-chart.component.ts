import { Component, NgModule } from '@angular/core';
import item from '../body-observation/item';
import { BodyObservationService } from '../body-observation.service'
import { CarePlanService } from '../care-plan/care-plan.service'
import carePlanItem from '../care-plan/care-plan-item'

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  multi: any[];
  view: any[] = [900, 520];

  itemOption: item[] = [];
  planOption: carePlanItem[] =[];
  selectedType = "";
  selectedPlan = "";
  selected = null;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = '';
  timeline: boolean = true;
  chartGenerated: boolean = false;
  balanceValue: string;
  unit: string;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private bodyObservationService: BodyObservationService, private carePlanService: CarePlanService) {
    carePlanService.getAllCarePlan((data)=>{
      if(data.hasOwnProperty("entry")){
        this.setCarePlanItem(data["entry"]);
      }
    }, (err)=>{
      console.log(err);
    })
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  setCarePlanItem(planSource): void{
    planSource.forEach((plan)=>{
      let type = plan.resource.outcomeReference[0].reference.split('/')[1];
      if(plan.resource.target[0].hasOwnProperty("detailQuantity")){
        this.planOption.push({
          text: plan.resource.description.text,
          observetype: type,
          balance: plan.resource.target[0].detailQuantity.value
        });
      }
    })
  }

  generateClick(): void{
    this.chartGenerated = false;
    this.multi = [];
    var dateRange = {
      start: this.selected.start.format('YYYY-MM-DD'),
      end: this.selected.end.format('YYYY-MM-DD')
    }
    this.bodyObservationService.getAllObservation(dateRange, this.selectedPlan, (data)=>{
      this.generateChart(this.planOption, data);
    }, (err)=>{
      console.log(err);
    })
  }

  generateChart(planOption, data){
    planOption.forEach((element)=>{
      if(element.observetype == this.selectedPlan){
        this.balanceValue = element.balance;
        return;
      }
    })
    if(data.hasOwnProperty("entry")){
      this.yAxisLabel = this.unit;
      this.multi.push({
        "name": "",
        "series": []
      });
      this.multi.push({
        "name": "",
        "series": []
      });
      data["entry"].forEach((element)=>{
        this.multi[0].series.push({
          value: element.resource.valueQuantity.value,
          name: new Date(element.resource.effectiveDateTime)
        })
        this.multi[1].series.push({
          value: this.balanceValue,
          name: new Date(element.resource.effectiveDateTime)
        })
      });
      this.multi[0].name = this.selectedType;
      this.multi[1].name = "標準值";
    }
    this.chartGenerated = true;
  }

  selectedPlanChange(event): void{
    this.bodyObservationService.getObservation(event.source.value,(data)=>{
      if(data.hasOwnProperty("entry")){
        this.selectedType = data["entry"][0].resource.code.text;
        this.unit = data["entry"][0].resource.valueQuantity.unit;
      }
    },(err)=>{
      console.log(err);
    });
  }

  getSelectedType():string{
    return this.selectedType;
  }

  generateDisabled(): boolean{
    if((this.selected!=null && this.selected.start !=null) && this.selectedType != ""){
      return false;
    }else 
      return true;
  }
}
