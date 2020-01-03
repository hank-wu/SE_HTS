interface iBody {
    [key: string]: any
}
export class ObservationItemDTO{
    item: string;
    unit: string;
    
    constructor(item:string, unit: string){
        this.item = item;
        this.unit = unit;
    }
    getBody(): iBody{
        let body = {
            "resourceType": "Observation",
            "code": {
              "coding": [
                {
                  "code": "unit"
                }
              ],
              "text": this.item
            },
            "valueQuantity": {
              "unit": this.unit
            }
        };
        return body;
    }
}