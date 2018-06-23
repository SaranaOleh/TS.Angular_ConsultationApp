import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Constants} from "../../utils/constants";
import {map, tap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {

  constructor(private auth:AuthService, private http:HttpClient) { }

  openConsult(time: number){
    const params = new HttpParams().set("token", this.auth.getToken()).set("time",time.toString());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/openConsult'),params.toString(),{headers})
      .pipe(map(e=>e['status'] === 'ok'));

  }
  takeConsult(){
    const params = new HttpParams().set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/takeConsult'),params.toString(),{headers});

  }
}
