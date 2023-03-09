import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  projectsList: Project[] = [];
  username : any = "";

  constructor(private service: ProjectService, private route : ActivatedRoute){
  }

  getAllProjects() {
    this.service.getAllProjectsFromUser(this.username)
      .subscribe((data : Project[]) => {this.projectsList = data})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getAllProjects();
    console.log(this.projectsList)
  }

}
