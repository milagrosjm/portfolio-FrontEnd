import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { isLoggedIn } from 'src/app/auth';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  constructor(private router: Router, private route : ActivatedRoute){
  }

  user : String = this.route.snapshot.paramMap.get('username')!
  isLoggedIn: boolean = isLoggedIn(this.user);

  login(): void{
      this.router.navigate(['/login'])
  }

  logout(){
    sessionStorage.removeItem('username');
    this.router.navigate(['/portfolio', this.user]);
  }

  ngOnInit(){
  }

}
