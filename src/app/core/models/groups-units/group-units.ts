export interface IGroupUnitsIndependent {
    id?: number;
    name: string;
    independentAmount: number;

}

export class GroupUnitsIndependent implements IGroupUnitsIndependent {
    id?: number;
    name: string;
    independentAmount: number;
    estateUnit: number;

    constructor(group: IGroupUnitsIndependent) {
        this.id = group.id;
        this.name = group.name;
        this.independentAmount = group.independentAmount;
    }

}
