export interface IAssociatedUser {
    id?: number;
    personTypeId: number;
    identificationTypeId: number;
    identificationNumber: string;
    names: string;
    peopleIncome: number;
    surnames: string;
    email: string;
    phone: string;
    mobile: string;
    vehiclepeopleIncome: number;
}
export class AssociatedUser implements IAssociatedUser {
    id?: number;
    personTypeId: number;
    identificationTypeId: number;
    identificationNumber: string;
    names: string;
    peopleIncome: number;
    surnames: string;
    email: string;
    phone: string;
    mobile: string;
    vehiclepeopleIncome: number;
    constructor(user: IAssociatedUser) {
        this.id = user.id;
        this.personTypeId = user.personTypeId;
        this.identificationTypeId = user.identificationTypeId;
        this.identificationNumber = user.identificationNumber;
        this.names = user.names;
        this.peopleIncome = user.peopleIncome;
        this.surnames = user.surnames;
        this.email = user.email;
        this.phone = user.phone;
        this.mobile = user.mobile;
        this.vehiclepeopleIncome = user.vehiclepeopleIncome;
    }
}