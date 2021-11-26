import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  

  @Input() doctor:any;
  @Input() index:number;

  weekday = ['sun', 'mon', 'wed', 'thu']

  constructor() { }

  ngOnInit(): void {
    // console.log(this.doctor);
  }

}
