import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConsultsService} from "../../../services/consults/consults.service";



@Component({
  selector: 'app-current-consult',
  templateUrl: './current-consult.component.html',
  styleUrls: ['./current-consult.component.css']
})
export class CurrentConsultComponent implements OnInit {
  isOpen = false;
  loading = true;
  time = "";
  private date= new Date();
  addingStudent = false;
  students = [];

  constructor(private consults:ConsultsService, private cdRef: ChangeDetectorRef) {
    this.takeConsult();
  }
  takeConsult(){
    this.consults.takeConsult().subscribe(e=>{
      this.loading = false;
      if(e['message'][0]){
        this.isOpen = true;
        this.date= new Date(Number(e['message'][0].starttime));
        this.students = e['message'][1];
      }

      this.time = this.date.toLocaleString();
    });
  }
  ngOnInit() {

  }
  openConsult(){
    this.consults.openConsult(this.date.getTime()).subscribe(e=>{
      alert(e);
    })
  }

  addStudent() {
    this.addingStudent = true;
  }

  onLoadingChange(event: boolean) {
    this.loading = event;
    this.cdRef.detectChanges();
  }
}
