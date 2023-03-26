import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{

  educationList: Education[] = [];

  displayStyleMsg = "none";

  displayStyleForm = "none";

  displayStyleCheck = "none";

  edDelete!: Education; 

  action = "" ;

  constructor(private service: EducationService, private route : ActivatedRoute){
  }

  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);
  submitted = false;

  formEducation = new FormGroup({
    degree: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(5)
    ]),
    institution: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
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
    id: new FormControl('', []),
  })

  getAllEducation() {
    this.service.getAllEducationFromUser(this.username)
      .subscribe((data : Education[]) => {this.educationList = data})
      ;
  }

  closePopUp(){
    this.displayStyleMsg = "none"; 
    this.displayStyleForm = "none";
    this.displayStyleCheck = "none"
  }


  edit(ed: Education){
    this.service.getEducationDetail(ed.id).subscribe((data: any) => {this.formEducation.patchValue(data); this.displayStyleForm= "block"; this.action = "EDITAR"})

  }
  
  save(){
    this.submitted = true;
    if (this.formEducation.invalid){
      return;
    }
    
    const formCopy = {...this.formEducation.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACIÓN"
    }
    this.service.updateEducation(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block"; this.getAllEducation(); this.submitted = false;
     })
    ;
  }

  add(){
    this.formEducation.reset({username: this.username});
    this.displayStyleForm = "block";
    this.action = "AGREGAR";
  }

  deleteCheck(ed : Education){
    this.displayStyleCheck = "block";
    this.edDelete = ed; 
  }

  delete(ed : Education){
    this.service.deleteEducation(ed)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACIÓN"; this.displayStyleMsg = "block"; this.getAllEducation();
     })
    ;

  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAllEducation();
  }

}
