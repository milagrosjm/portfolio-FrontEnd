import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {

  about_me=""; 
  username : any = ""; 

  constructor(private service: AboutMeService, private route : ActivatedRoute){

  }

  getAboutMeText() {
    this.service.getAboutMeText(this.username)
      .subscribe((data : any) => {this.about_me = data.about_me})
      ;
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    this.getAboutMeText();
  }

}
