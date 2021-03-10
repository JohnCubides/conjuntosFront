export interface IUser {
    id?: number;
    identificationTypeId: number;
    identificationNumber: number;
    names: string;
    surnames: string;
    email: string;
    phone: number;
    rolesList: number[];
    image: any;
    userName: string;
}
export class User implements IUser {
    id?: number;
    identificationTypeId: number;
    identificationNumber: number;
    names: string;
    surnames: string;
    email: string;
    phone: number;
    rolesList: number[];
    image: any;
    userName: string;
    constructor(user: IUser) {
        this.id = user.id;
        this.identificationTypeId = user.identificationTypeId;
        this.identificationNumber = user.identificationNumber;
        this.names = user.names;
        this.surnames = user.surnames;
        this.email = user.email;
        this.phone = user.phone;
        this.rolesList = user.rolesList;
        this.image = user.image;
        this.userName = user.userName;
    }
}
