interface iBody {
    [key: string]: any
}
export class ObservationDTO{
    value:number;
    type:string;
    date:string;
    
    constructor(value:number, type: string, date:string){
        this.value = value;
        this.type = type;
        this.date = date;
    }
    getBody(): iBody{
        let body = {
            "resourceType": "Observation",
            "valueQuantity": {
              "value": this.value
            },
            "derivedFrom": [
              {
                "reference": "Observation/" + this.type
              }
            ],
            "effectiveDateTime": this.date
        };
        return body;
    }
}