import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'angular_project_final';
  ismenurequired=false;
  isadminuser = false;
  constructor(private router:Router, private service: AuthService){
    let role = sessionStorage.getItem('role');
    if(role == 'admin'){
      this.isadminuser = true;
    }
  }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    let role = sessionStorage.getItem('role');
    if(currenturl=='/login'||currenturl=='/register'){
      this.ismenurequired =false;
       }
       else{
        this.ismenurequired=true;
       }
       if(role == 'admin'){
        this.isadminuser = true;
       }
       else{
        this.isadminuser = false;
       }
  }
}
