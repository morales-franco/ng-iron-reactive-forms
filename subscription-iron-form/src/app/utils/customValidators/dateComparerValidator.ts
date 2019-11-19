import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/*@FM: custom validators with out parameters- In this case we don't receive parameters
we only receive AbstractControl, then we do a validation and finally, return a ValidationErrors.
*/

export function dateComparer(group: AbstractControl):  ValidationErrors {

    let startDateControl = group.get('from');
    let endDateControl = group.get('to');

    if(startDateControl.pristine || endDateControl.pristine){
        return null; //valid
    }

    let startDate = new Date(startDateControl.value);
    let endDate = new Date(endDateControl.value);

    if( startDate == null ||  endDate == null){
        return { "dateComparer" : true }; 
    }

    return startDate > endDate ? { "dateComparer" : true } : null;
}