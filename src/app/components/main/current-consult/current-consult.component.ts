import { Component, OnInit } from '@angular/core';
import {ConsultsService} from "../../../services/consults/consults.service";
import {isObject} from "rxjs/internal/util/isObject";

@Component({
  selector: 'app-current-consult',
  templateUrl: './current-consult.component.html',
  styleUrls: ['./current-consult.component.css']
})
export class CurrentConsultComponent implements OnInit {
  firstConsult = null;
  time = "";
  private date= new Date();
  constructor(private consults:ConsultsService) {
    consults.takeConsult().subscribe(e=>{
    if(isObject(e['message'])){
      this.firstConsult = e['message'];
      let date= new Date(Number(e['message'].starttime));
      this.time =
        date.getDay() + '.' +
        date.getMonth() + '.' +
        date.getFullYear() + '  ' +
        date.getHours() + ':' +
        date.getMinutes()+ ':' +
        date.getSeconds();
    }else{
      this.time =
        this.date.getDay() + '.' +
        this.date.getMonth() + '.' +
        this.date.getFullYear() + '  ' +
        this.date.getHours() + ':' +
        this.date.getMinutes()+ ':' +
        this.date.getSeconds();
    }
    });

  }

  ngOnInit() {
  }
  openConsult(){
    let time = Date.parse(this.time);
    let date = new Date(time);
    this.consults.openConsult(Date.parse(''+this.date)).subscribe(e=>{
      alert(e);
    })
  }
  takeConsult(){
    this.consults.takeConsult().subscribe(e=>{
      let date = new Date(Number(e['message'].starttime));
      console.log(e['message']);
      console.log(date.getHours())
    })
  }
}
