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

  formEducation = new FormGroup({
    degree: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(4)
    ]),
    institution: new FormControl('', [
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
    this.service.getEducationDetail(ed.id).subscribe((data: any) => {this.formEducation.patchValue(data); this.displayStyleForm= "block"})

  }
  
  save(){
    const formCopy = {...this.formEducation.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACION"
    }
    this.service.updateEducation(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block";
     })
    ;
  }

  add(){
    this.formEducation.reset(this.formEducation.value); 
    this.displayStyleForm = "block";
    console.log(this.username)
    console.log(this.formEducation)
  }

  deleteCheck(ed : Education){
    this.displayStyleCheck = "block";
    this.edDelete = ed; 
  }

  delete(ed : Education){
    this.service.deleteEducation(ed)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACION"; this.displayStyleMsg = "block";
     })
    ;

  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAllEducation();
  }

}
