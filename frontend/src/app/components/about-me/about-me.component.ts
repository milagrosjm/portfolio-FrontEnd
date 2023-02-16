import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {

  username : any = ""; 
  user!: User; 

  constructor(private service: AboutMeService, private route : ActivatedRoute){

  }

  getAboutMeText() {
    this.service.getAboutMeText(this.username)
      .subscribe((data : User) => {this.user = data})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getAboutMeText();
  }

}
