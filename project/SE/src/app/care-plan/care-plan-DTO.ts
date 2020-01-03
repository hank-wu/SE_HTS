interface iBody {
    [key: string]: any
}
export class CarePlanDTO{
    name:string;
    value:number;
    type:string;
    
    constructor(name: string, value: number, type: string){
        this.name = name;
        this.value = value;
        this.type = type;
    }
    getBody(): iBody{
        let body = {
          "resourceType": "Goal",
          "description": {
            "text": this.name
          },
          "target": [
            {
              "detailQuantity": {
                "value": this.value
              }
            }
          ],
          "outcomeReference": [
            {
              "reference": "Observation/" + this.type
            }
          ]
        };
        return body;
    }
}