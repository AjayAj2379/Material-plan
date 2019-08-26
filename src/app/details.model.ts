export class PlannedDetails {
    length : number;
    qty : number;
}

export class ActualDetails{
    length : number;
    qty : number
}

export class CombinedDetails{
    length:number;
    actQty:number;
    planQty:number;
}

export class InsertItem {

    plan : string;
    section : string;
    items : any;
}