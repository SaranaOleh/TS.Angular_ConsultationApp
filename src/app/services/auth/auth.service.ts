import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Constants} from "../../utils/constants";
import {map, tap} from "rxjs/internal/operators";
import {of} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(){
    const t = localStorage.getItem('token');
    return t?t:null;
  }
  private setToken(token:string){
    localStorage.setItem('token',token);
  }
  private clearToken(){
    localStorage.removeItem('token');
  }

  constructor(private http:HttpClient) { }

  public register(login:string,pass:string){
    const params = new HttpParams().set("login",login).set("pass",pass);
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('auth/register'),params.toString(),{headers})
      .pipe(map(r=>r['status']==='ok'))
  }

  public login(login:string,pass:string){
    const params = new HttpParams().set("login",login).set("pass",pass);
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('auth/login'),params.toString(),{headers})
      .pipe(tap(r=>{
        if(r['status']==='ok') this.setToken(r['token']);
      }))
      .pipe(map(r=>r['status']==='ok'))
  }

  public isAuth(){
    return of(this.getToken() !== null);
  }

  logout() {
    const params = new HttpParams().set("token", this.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('auth/logout'),params.toString(),{headers})
      .pipe(map(r=>r['status']==='ok')).pipe(tap(e=>this.clearToken()))
  }
}
