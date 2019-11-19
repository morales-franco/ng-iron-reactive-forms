import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';

//move to the service
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
const USERS_NAMES = ['fmorales', 'test1', 'test2'];

/*@FM: validate BIND 
username: ['', [Validators.required, Validators.maxLength(50)],  this.usernameValidator.validate.bind(this.usernameValidator) ],
*/

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
//   constructor(private userService: UserService) {} - implement user service

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // return this.heroesService.isAlterEgoTaken(ctrl.value).pipe(
    //   map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
    //   catchError(() => null)
    // );

    return this.usernameAvailable(control.value).pipe(
        map(isAvailable => ( isAvailable ? { userNameAvailable: true } : null )),
        catchError(() => null)
    );
  }

    //TODO: Move to the service
    usernameAvailable(username: string):  Observable<boolean>{
        const isUsernameAvailable= USERS_NAMES.includes(username);
        return of(isUsernameAvailable).pipe(delay(400));
      }
}