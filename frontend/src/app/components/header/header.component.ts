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

  first_name=""; 

  constructor(private headerService: HeaderService, private route : ActivatedRoute){

  }

  username: String = this.route.snapshot.paramMap.get('username')!; 
  isLoggedIn: boolean = isLoggedIn(this.username);

  formHeader = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(5)
    ]),
    secondname: new FormControl('', [
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
    ])
  })

  getHeader() {
    this.headerService.getHeader(this.username)
      .subscribe((data : any) => {this.user = data});
      //console.log(this.header)
  }

  ngOnInit(){
    this.isLoggedIn= isLoggedIn(this.username);
    console.log(this.username);
    this.getHeader();
    //console.log(this.first_name)
  }
 

}
