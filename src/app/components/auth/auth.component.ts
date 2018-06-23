import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mode = 'login';
  formData = {
    login:"",
    pass:""
  };
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onRegister() {
    this.auth.register(this.formData.login,this.formData.pass).subscribe(e=>{
      if(e){
        this.mode = 'login';
        alert("success")
      } else{
        alert("fail")
      }
    })
  }

  onLogin() {
    this.auth.login(this.formData.login,this.formData.pass).subscribe(e=>{
      if(e){
        this.router.navigate(['/']);
        alert("sycces")
      } else {
        alert("fail")
      }
    })
  }
}
