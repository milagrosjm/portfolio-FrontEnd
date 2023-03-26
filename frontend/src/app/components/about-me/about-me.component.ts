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
  submitted = false;
  
  displayStyle = "none";
  displayStyleForm = "none";

  formAboutMe = new FormGroup({
    about_me: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
      
    ]),
    username: new FormControl(this.username),
    photo: new FormControl('', [
      Validators.required,
    ]),
  })

  constructor(private service: AboutMeService, private route : ActivatedRoute){
    this.getAboutMe();

  }

  getAboutMe() {
    this.service.getAboutMeText(this.username)
      .subscribe((data : any) => {this.formAboutMe.patchValue(data); console.log(this.formAboutMe)})
      ;
  }

  save(){
    this.submitted = true;
    if (this.formAboutMe.invalid){
      return;
    }
    
    const formCopy = {...this.formAboutMe.value};
    this.service.updateAboutMe(formCopy)
    .subscribe((data : any) => {this.displayStyleForm = "none";this.displayStyle = "block";
     })
    ;
  }

  uploadImage($event : any){
    console.log($event.target.value)
  }

  edit(){
    this.service.getAboutMeText(this.username).subscribe((data: any) => {this.formAboutMe.patchValue(data); this.displayStyleForm= "block"})
  }

 

  closePopUp(){
    this.displayStyleForm = "none"; 
    this.displayStyle = "none"
  }


  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getAboutMe();
  }

}
