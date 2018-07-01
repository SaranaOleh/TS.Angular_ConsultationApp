import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConsultsService} from "../../../../services/consults/consults.service";

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {
  @Output('loading') loading = new EventEmitter<boolean>();
  @Output('close') close = new EventEmitter<boolean>();
  old = true;
  groups = [];
  students = [];
  newGroup = false;
  newStudentData = {
    name:"",
    surname:""
  };
  newGroupName = '';
  selectedGroupId = -1;
  selectedStudentId = -1;

  constructor(private consults: ConsultsService) { }

  ngOnInit() {
    this.loadGroups();
    this.loadStudents();
  }

  loadGroups(){
    this.loading.emit(true);
    this.consults.getGroups().subscribe(e=>{
      this.groups = e['message'];
      this.loading.emit(false);
    })
  }
  loadStudents(){
    this.loading.emit(true);
    this.consults.getStudents().subscribe(e=>{
      this.students = e['message'];
      this.loading.emit(false);
    })
  }

  addNewStudent() {
    this.loading.emit(true);
    if(!this.newGroup){
      this.consults.addStudentToGroup(
        this.newStudentData.name,
        this.newStudentData.surname,
        this.selectedGroupId
      ).subscribe(e=>{
        this.loading.emit(false);
        this.closeWindow();
      })
    } else {
      this.consults.addStudentsWithGroup(
        this.newStudentData.name,
        this.newStudentData.surname,
        this.newGroupName
      ).subscribe(e=>{
        this.loading.emit(false);
        this.closeWindow();
      })
    }
  }

  addStudentToConsult(){
    this.loading.emit(true);
    this.consults.addStudentToConsult(
      this.selectedStudentId
    ).subscribe(e=>{
      this.loading.emit(false);
      this.closeWindow();
    })
  }

  closeWindow(){
    this.close.emit(true);
  }
  onTest(){
    alert(this.selectedGroupId);
  }
}
