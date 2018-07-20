import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Constants} from "../../utils/constants";
import {map, tap} from "rxjs/internal/operators";
import {StudentsResponse} from "../../utils/entities/StudentsResponse";

@Injectable({
  providedIn: 'root'
})
export class ConsultsService {
  private authTap = tap(e=>{
    if(e['status'] === 'auth_fail') this.auth.invalidateSession();
  });
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
    return this.http.post(Constants.url('api/takeConsult'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] !== 'ok') this.auth.invalidateSession();
      }));
  }
  getGroups(){
    const params = new HttpParams().set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/getGroups'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] !== 'ok') this.auth.invalidateSession();
      }));
  }
  addStudentToGroup(name,surname,group_id){
    const params = new HttpParams()
      .set('name',name)
      .set('surname',surname)
      .set('group_id',group_id)
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/addStudent'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] === 'auth_fail') this.auth.invalidateSession();
      }));
  }

  addStudentToConsult(student_id){
    const params = new HttpParams()
      .set('student_id',student_id)
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/addStudentToConsult'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] === 'auth_fail') this.auth.invalidateSession();
      }));
  }

  addStudentsWithGroup(name,surname,group_name){
    const params = new HttpParams()
      .set('name',name)
      .set('surname',surname)
      .set('group_name',group_name)
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/addStudent'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] === 'auth_fail') this.auth.invalidateSession();
      }));
  }

  getStudents() {
    const params = new HttpParams().set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/getStudents'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] !== 'ok') this.auth.invalidateSession();
      }));
  }

  getStudentsInGroup(group_id){
    const params = new HttpParams()
      .set('id',group_id)
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post<StudentsResponse>(Constants.url('api/getStudentsInGroup'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] !== 'ok') this.auth.invalidateSession();
      }));
  }

  removeStudentFromConsult(student_id){
    const params = new HttpParams()
      .set('student_id',student_id)
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/removeStudentFromConsult'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] === 'auth_fail') this.auth.invalidateSession();
      }));
  }

  closeConsult(){
    const params = new HttpParams()
      .set("token", this.auth.getToken());
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    };
    return this.http.post(Constants.url('api/closeConsult'),params.toString(),{headers})
      .pipe(tap(e=>{
        if(e['status'] === 'auth_fail') this.auth.invalidateSession();
      }));
  }
}
