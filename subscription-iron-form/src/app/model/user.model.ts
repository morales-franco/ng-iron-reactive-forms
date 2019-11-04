import { Experience } from './experience.model';
export class User {
    name: string;
    surname: string;
    username:string;
    email: string;
    countryId: number;
    sexId: string;
    skills : string[];
    experiences : Experience[];
    comment: string;

    constructor(){
        this.skills = new Array<string>();
        this.experiences = new Array<Experience>();
    }
}



// constructor(
//     public firstName = '',
//     public lastName = '',
//     public email = '',
//     public sendCatalog = false,
//     public addressType = 'home',
//     public street1?: string,
//     public street2?: string,
//     public city?: string,
//     public state = '',
//     public zip?: string) { }

// export interface Product {
//     id: number;
//     productName: string;
//     productCode: string;
//     tags?: string[];
//     releaseDate: string;
//     price: number;
//     description: string;
//     starRating: number;
//     imageUrl: string;
//   }