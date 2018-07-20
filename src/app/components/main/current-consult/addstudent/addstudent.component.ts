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
  @Output('onAdd') onAdd = new EventEmitter<boolean>();
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
  }

  loadGroups(){
    this.loading.emit(true);
    this.consults.getGroups().subscribe(e=>{
      this.groups = e['message'];

      if(this.groups.length > 0){
        this.selectedGroupId = this.groups[0].id;
        this.onGroupChange();
      }else {
        this.selectedGroupId = -1;
      }

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
        this.onAdd.emit(true);
      })
    } else {
      this.consults.addStudentsWithGroup(
        this.newStudentData.name,
        this.newStudentData.surname,
        this.newGroupName
      ).subscribe(e=>{
        this.loading.emit(false);
        this.closeWindow();
        this.onAdd.emit(true);
      })
    }
  }

  addStudentToConsult(){
    this.loading.emit(true);
    if(this.selectedStudentId === -1){
      alert("Выберите студента");
      return;
    }
    this.consults.addStudentToConsult(
      this.selectedStudentId
    ).subscribe(e=>{
      this.loading.emit(false);
      if(e["status"] !== "ok"){
        alert("Студент уже там");
        return;
      }
      this.closeWindow();
      this.onAdd.emit(true);
    })
  }

  closeWindow(){
    this.close.emit(true);
  }
  onTest(){
    alert(this.selectedGroupId);
  }

  onGroupChange() {
    this.loading.emit(true);
    this.consults.getStudentsInGroup(this.selectedGroupId).subscribe(e=>{
      this.students = e['message'];
      this.selectedStudentId = this.students.length > 0 ? this.students[0].id : -1;
      this.loading.emit(false);
    })
  }
}
