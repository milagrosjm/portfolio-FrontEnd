import { Component, createNgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  header = {"first_name": "",
  "second_name": "",
  "lastname":"",
  "degree":""
  }

  first_name=""; 

  constructor(private headerService: HeaderService, private route : ActivatedRoute){

  }

  username : any = ""; 

  getHeader() {
    this.headerService.getHeader(this.username)
      .subscribe((data : any) => {console.log(data.degree); this.header.lastname=data.lastname; this.header.degree=data.degree; this.header.first_name=data.first_name; this.header.second_name=data.second_name})
      ;
      //console.log(this.header)
  }

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username');
    //console.log(this.username);
    this.getHeader();
    //console.log(this.first_name)
  }
 

}
