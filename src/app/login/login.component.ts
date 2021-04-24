import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToForgotPassword(){
	  console.log("forgot password");
	  this.router.navigate(['/forgotpassword']).then(page => { window.location.reload(); });
  }
  
  goToSignup(){
	  console.log("sign up");
	  this.router.navigate(['/signup']).then(page => { window.location.reload(); });	  
  }
}
