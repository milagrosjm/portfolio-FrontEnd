import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{

  experienceList: Experience[] = [];
  username : any = "";

  constructor(private service: ExperienceService, private route : ActivatedRoute){
  }

  getAllExperience() {
    this.service.getAllExperienceFromUser(this.username)
      .subscribe((data : Experience[]) => {this.experienceList = data})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getAllExperience();
  }

}
