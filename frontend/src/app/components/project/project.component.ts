import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  projectsList: Project[] = [];
  displayStyleMsg = "none";

  displayStyleForm = "none";

  displayStyleCheck = "none";

  projDelete!: Project; 

  action = "" ;

  constructor(private service: ProjectService, private route : ActivatedRoute){
  }

  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);
  submitted = false;

  formProject = new FormGroup({
    photo: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
    username: new FormControl(this.username),
    tittle: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    link_deploy: new FormControl('', [
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
    id: new FormControl('', []),
    link_github: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
  })

  getAllProjects() {
    this.service.getAllProjectsFromUser(this.username)
      .subscribe((data : Project[]) => {this.projectsList = data})
      ;
  }

  closePopUp(){
    this.displayStyleMsg = "none"; 
    this.displayStyleForm = "none";
    this.displayStyleCheck = "none"
  }


  edit(proj: Project){
    this.service.getProjectDetail(proj.id).subscribe((data: any) => {this.formProject.patchValue(data); this.displayStyleForm= "block"; this.action = "EDITAR"})

  }
  
  save(){
    this.submitted = true;
    if (this.formProject.invalid){
      this.submitted = false;
      return;
    }
    
    const formCopy = {...this.formProject.value};
    console.log(formCopy);
    if (!formCopy.id){
      this.action = "AGREGAR"
    }
    else{
      this.action = "MODIFICACIÓN"
    }
    this.service.updateProject(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyleMsg = "block"; this.submitted = false; this.getAllProjects();
     })
    ;
  }

  add(){
    this.formProject.reset({username: this.username});
    this.displayStyleForm = "block";
    this.action = "AGREGAR";
  }

  deleteCheck(proj : Project){
    this.displayStyleCheck = "block";
    this.projDelete = proj; 
  }

  delete(proj : Project){
    this.service.deleteProject(proj)
    .subscribe((data : any) => {this.displayStyleCheck = "none"; this.action = "ELIMINACIÓN"; this.displayStyleMsg = "block"; this.getAllProjects();
     });
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAllProjects();
  }

}
