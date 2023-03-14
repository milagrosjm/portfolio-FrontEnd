import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{

  experienceList: Experience[] = [];

  displayStyleMsg = "none";

  displayStyleForm = "none";

  displayStyleCheck = "none";

  expDelete!: Experience; 

  action = "" ;

  constructor(private service: ExperienceService, private route : ActivatedRoute){
  }

  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);

  formExperience = new FormGroup({
    company_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(3)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    end_date: new FormControl('', [
      Validators.maxLength(250),
    ]),
    username: new FormControl(this.username),
    start_date: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    is_current: new FormControl('', [
      Validators.required,
    ]),
    role: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    id: new FormControl('', []),
  })


  getAllExperience() {
    this.service.getAllExperienceFromUser(this.username)
      .subscribe((data : Experience[]) => {this.experienceList = data; console.log(this.experienceList)})
      ;
  }

  closePopUp(){
    this.displayStyleMsg = "none"; 
    this.displayStyleForm = "none";
    this.displayStyleCheck = "none"
  }


  edit(exp: Experience){
    this.service.getExperienceDetail(exp.id).subscribe((data: any) => {this.formExperience.patchValue(data); this.displayStyleForm= "block"})

  }
  
  save(){
    const formCopy = {...this.formExperience.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACION"
    }
    this.service.updateExperience(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block";
     })
    ;
  }

  add(){
    this.formExperience.reset(this.formExperience.value); 
    this.displayStyleForm = "block";
  }

  deleteCheck(exp : Experience){
    this.displayStyleCheck = "block";
    this.expDelete = exp; 
  }

  delete(exp : Experience){
    this.service.deleteExperience(exp)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACION"; this.displayStyleMsg = "block";
     })
    ;

  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAllExperience();
  }

}
