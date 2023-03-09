import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit{

  skillList: Skill[] = [];
  username : any = "";

  constructor(private service: SkillService, private route : ActivatedRoute){
  }

  getSkills() {
    this.service.getSkillsFromUser(this.username)
      .subscribe((data : Skill[]) => {this.skillList = data})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getSkills();
  }

}
