import { Component, createNgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isLoggedIn } from 'src/app/auth';
import { User } from 'src/app/models/user';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user!: User; 

  displayStyle = "none";

  constructor(private headerService: HeaderService, private route : ActivatedRoute){

  }

  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);
  submitted = false;

  formHeader = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    second_name: new FormControl('', [
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    degree: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
      Validators.minLength(5)
    ]),
    username: new FormControl(this.username)
  })

  getHeader() {
    this.headerService.getHeader(this.username)
      .subscribe((data : any) => {this.formHeader.patchValue(data); console.log(this.formHeader)});
      //console.log(this.header)
  }

  saveName(){
    this.submitted = true;
    if (this.formHeader.invalid){
      return;
    }

    const formCopy = {...this.formHeader.value};
    this.headerService.updateHeaderName(formCopy)
    .subscribe((data : any) => {this.displayStyle = "block";
     })
    ;
  }

  saveDegree(){
    const formCopy = {...this.formHeader.value};
    this.headerService.updateHeaderDegree(formCopy)
    .subscribe((data : any) => {this.displayStyle = "block";
     })
    ;
  }


  closePopUp(){
    this.displayStyle = "none"; 
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    this.getHeader();
  }
 

}
