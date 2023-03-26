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
  submitted = false;

  formExperience = new FormGroup({
    company_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(2)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(5)
    ]),
    end_date: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
    username: new FormControl(this.username),
    start_date: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
      Validators.minLength(4)
    ]),
    is_current: new FormControl('', [
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
      .subscribe((data : Experience[]) => {this.experienceList = data;})
      ;
  }

  closePopUp(){
    this.displayStyleMsg = "none"; 
    this.displayStyleForm = "none";
    this.displayStyleCheck = "none"
  }


  edit(exp: Experience){
    this.service.getExperienceDetail(exp.id).subscribe((data: any) => {this.formExperience.patchValue(data); this.displayStyleForm= "block"; this.action = "EDITAR"})

  }
  
  save(){
    this.submitted = true;

    if (this.formExperience.invalid){
      return;
    }
    
    const formCopy = {...this.formExperience.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACIÓN"
    }
    this.service.updateExperience(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block"; this.getAllExperience();
     })
    ;
    
  }

  add(){
    this.formExperience.reset({username: this.username});
    this.displayStyleForm = "block";
    this.action = "AGREGAR";
  }

  deleteCheck(exp : Experience){
    this.displayStyleCheck = "block";
    this.expDelete = exp; 
  }

  delete(exp : Experience){
    this.service.deleteExperience(exp)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACIÓN"; this.displayStyleMsg = "block"; this.getAllExperience();
     })
    ;

  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAllExperience();
  }

}
