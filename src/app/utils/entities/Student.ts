export class Student{
  name:string;
  surname:string;
  id:number;
  group_id:number;

  constructor(name: string, surname: string, id: number = -1, group_id: number = -1) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.group_id = group_id;
  }
}
