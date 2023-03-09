import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { User } from 'src/app/models/user';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  username : String = this.route.snapshot.paramMap.get('username')!; 
  user!: User; 
  isLoggedIn: boolean = isLoggedIn(this.username);

  formAboutMe = new FormGroup({
    aboutMe: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
      
    ]),
    username: new FormControl(this.username)
  })

  constructor(private service: AboutMeService, private route : ActivatedRoute){
    this.getAboutMeText();

  }

  getAboutMeText() {
    this.service.getAboutMeText(this.username)
      .subscribe((data : User) => {this.user = data})
      ;
  }

  save(){
    const formCopy = {...this.formAboutMe.value};
    this.service.updateAboutMe(formCopy)
    .subscribe((data : any) => {console.log("salio bien");
     })
    ;
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAboutMeText();
  }

}
