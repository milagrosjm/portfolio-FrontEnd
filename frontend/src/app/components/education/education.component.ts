import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  educationList: Education[] = [];
  username : any = "";

  constructor(private service: EducationService, private route : ActivatedRoute){
  }

  getAllEducation() {
    this.service.getAllEducationFromUser(this.username)
      .subscribe((data : Education[]) => {this.educationList = data; console.log(this.educationList)})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getAllEducation();
  }

}
