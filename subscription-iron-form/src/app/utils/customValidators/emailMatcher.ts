import { AbstractControl, ValidationErrors } from "@angular/forms";

//@FM: custom validators
export class EmailValidators {

    static match(emailId: string, confirmEmail: string ): ValidationErrors | null{
        return (c : AbstractControl) : { [key: string] : boolean } | null => {
            
            const emailControl = c.get(emailId);
            const confirmEmailControl = c.get(confirmEmail);

            //valid
            if(emailControl.pristine || confirmEmailControl.pristine){
                return null;
            }

            //valid
            if(emailControl.value === confirmEmailControl.value ){
                return null;
            }

            //validation failure
            return { match: true }
        };
    }

}


// export class NumberValidators {

//     static range(min: number, max: number): ValidatorFn {
//       return (c: AbstractControl): { [key: string]: boolean } | null => {
//         if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
//           return { range: true };
//         }
//         return null;
//       };
//     }
//   }