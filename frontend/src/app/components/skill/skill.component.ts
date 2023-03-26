import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit{

  skillList: Skill[] = [];

  displayStyleMsg = "none";

  displayStyleForm = "none";

  displayStyleCheck = "none";

  skillDelete!: Skill; 

  action = "" ;

  constructor(private service: SkillService, private route : ActivatedRoute){
  }
  
  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);
  submitted = false;

  formSkill = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(2)
    ]),
    username: new FormControl(this.username, []),
    icon: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
    id: new FormControl('', []),
  })

  formInitial = this.formSkill;

  getSkills() {
    this.service.getSkillsFromUser(this.username)
      .subscribe((data : Skill[]) => {this.skillList = data})
      ;
  }

  closePopUp(){
    this.displayStyleMsg = "none"; 
    this.displayStyleForm = "none";
    this.displayStyleCheck = "none"
  }


  edit(sk: Skill){
    this.service.getSkillDetail(sk.id).subscribe((data: any) => {this.formSkill.patchValue(data); this.displayStyleForm= "block" ; this.action = "EDITAR"})

  }
  
  save(){
    this.submitted = true;
    if (this.formSkill.invalid){
      return;
    }
    
    console.log(this.formSkill)
    const formCopy = {...this.formSkill.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACIÓN"
    }
    this.service.updateSkill(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block"; this.getSkills(); this.submitted = false;
     })
    ;
  }

  add(){
    this.formSkill.reset({username: this.username});
    this.displayStyleForm = "block";
    this.action = "AGREGAR";
  }

  deleteCheck(sk : Skill){
    this.displayStyleCheck = "block";
    this.skillDelete = sk; 
  }

  delete(sk : Skill){
    this.service.deleteSkill(sk)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACIÓN"; this.displayStyleMsg = "block";this.getSkills();
     });
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getSkills();
  }

}
