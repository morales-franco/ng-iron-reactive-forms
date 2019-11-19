import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/*@FM: custom validators with out parameters- In this case we don't receive parameters
we only receive AbstractControl, then we do a validation and finally, return a ValidationErrors.
*/

export function urlValidator(control: AbstractControl):  ValidationErrors {

    if(control.value == null || control.value.trim().length == 0){
        return null;
    }

    let urlPattern = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
    let urlRegularExpression : RegExp = new RegExp(urlPattern);
    let urlValid =  urlRegularExpression.test(control.value);
    return urlValid ? null : { "validUrl" : true }; 
}