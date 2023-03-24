import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
      
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ])
  })

  constructor(private service: LoginService, 
    private router: Router, 
    private portfolio: PortfolioComponent){

  }
  submitted = false;
  auth : boolean = false;
  displayStyle = "none";

  Login(){

    this.submitted = true;
    
    if (this.formLogin.invalid){
      return;
    }
    
    const formCopy = {...this.formLogin.value}

    this.service.getUser(formCopy)
      .subscribe((data : any) => { if (data){sessionStorage.setItem('username', formCopy.username!); this.router.navigate(['portfolio/edit', formCopy.username])} else{this.formLogin.reset(); this.displayStyle = "block";}})
      ;

  }

  closePopUp(){
    this.displayStyle = "none"; 
  }

}
