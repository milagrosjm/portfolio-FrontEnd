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
  user!: User; //no lo uso
  isLoggedIn: boolean = isLoggedIn(this.username);
  displayStyle = "none";

  formAboutMe = new FormGroup({
    about_me: new FormControl('', [
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
      .subscribe((data : any) => {this.formAboutMe.patchValue(data); console.log(this.formAboutMe)})
      ;
  }

  save(){
    const formCopy = {...this.formAboutMe.value};
    this.service.updateAboutMe(formCopy)
    .subscribe((data : any) => {this.displayStyle = "block";
     })
    ;
  }

  closePopUp(){
    this.displayStyle = "none"; 
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAboutMeText();
  }

}
