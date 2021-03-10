export interface IIndependentUnit {
    id?: number;
    Name: string;
    Cadastre: number;
    SquareMeter: number;
    Status: number;
    GroupId: number;
}
export class Independentunit implements IIndependentUnit {
    id?: number;
    Name: string;
    Cadastre: number;
    SquareMeter: number;
    Status: number;
    GroupId: number;
    constructor(independentunit: IIndependentUnit) {
        this.id = independentunit.id;
        this.Name = independentunit.Name;
        this.Cadastre = independentunit.Cadastre;
        this.SquareMeter = independentunit.SquareMeter;
        this.Status = independentunit.Status;
        this.GroupId = independentunit.GroupId;
    }
}