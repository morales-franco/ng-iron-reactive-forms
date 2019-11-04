import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { EmailValidators } from '../utils/customValidators/emailMatcher';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  userForm: FormGroup;

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  get experiences(): FormArray {
    return this.userForm.get('experiences') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail : ['', [Validators.required, Validators.email]]
      }, {  validators: EmailValidators.match('email', 'confirmEmail')}
      ),
      countryId: ['', Validators.required],
      sexId:['M', Validators.required],
      comment: ['', [Validators.maxLength(100)]],
      hasDevExperience:[false],
      acceptConditions: [false, [Validators.requiredTrue]],
      skills: this.fb.array([]),
      experiences: this.fb.array([]),
      hasGitHub: [false],
      githubRepository: ['']
    });

    this.userForm.get('hasDevExperience').valueChanges.subscribe(
      value => this.setExperienceSection(value)
    );

    this.userForm.get('hasGitHub').valueChanges.subscribe(
      value => this.setGitHubEntry(value)
    );

  }

  buildSkill(): FormControl{
    return this.fb.control('', [ Validators.required]);
  }

  buildExperience(): FormGroup{
    return this.fb.group({
      companyName: ['', Validators.required],
          from:[null, Validators.required],
          to:[null, Validators.required],
          role:['', Validators.required],
          description:['']
    });
  }

 

  addNewExperience(){
    this.experiences.push(this.buildExperience())
  }

  deleteExperience(experienceIndex: number){
    this.experiences.removeAt(experienceIndex);
  }

  deleteSkill(skillIndex: number){
    this.skills.removeAt(skillIndex);
  }

  addNewSkill(){
    this.skills.push(this.buildSkill());
  }

  setExperienceSection(hasExperience : boolean){
    this.experiences.clear();
    if(hasExperience){
      this.experiences.push(this.buildExperience());
    }
  }

  setGitHubEntry(hasGitHub: boolean){
    const githubRepositoryControl = this.userForm.get('githubRepository');

    if(hasGitHub){
      githubRepositoryControl.setValidators([Validators.required]) //TODO: URL VALIDATOR
    }else{
      githubRepositoryControl.clearValidators();
    }

    githubRepositoryControl.updateValueAndValidity();
  }

  save(){
    console.log(this.userForm);
  }

}
