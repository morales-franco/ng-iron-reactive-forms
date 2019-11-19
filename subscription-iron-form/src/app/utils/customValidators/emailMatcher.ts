import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/*@FM: custom validators with parameters
In this case we receive some parameters, and return a funtion a Validator function.
This validator function receive the current AbstractControl (as extension method)
We don't return a ValidationError in this case we return a validation function.
validators: return ValidatorFn  because they receive parameter ==>  Validators.maxLength(100) | EmailValidators.match('email', 'confirmEmail')
validators: return ValidationErrors becasue they don't receive parametrs ==>  Validators.required | | EmailValidators.matchWithOutParameter
 EmailValidators.match != EmailValidators.match(parameter)
*/
export class EmailValidators {

    static match(emailId: string, confirmEmail: string ): ValidatorFn {
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


// /** A hero's name can't match the given regular expression */
// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//     return (control: AbstractControl): {[key: string]: any} | null => {
//       const forbidden = nameRe.test(control.value);
//       return forbidden ? {'forbiddenName': {value: control.value}} : null;
//     };
//   }