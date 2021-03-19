import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DoctorsService } from '../../services/doctor.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  minDate = new Date();
  selectedDate: Date;

  weekEnds: number[] = [];
  
  id: number;
  doctor: any ;

  scheduleView= false;

  constructor(private doctorsService: DoctorsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.doctor = this.doctorsService.getDoctor(this.id);
      }
    )
    this.weekEnds = this.doctorsService.getWeekEnds(this.id);
    
  }

  valueChanged(date: any){
    //console.log(date.target.value);
    this.doctorsService.selectedDoctorId = this.id;
    this.selectedDate = date.target.value;
    this.scheduleView = true;
    // console.log(this.scheduleView);
  }

  weekendsDatesFilter = (d: Date): boolean => {
    const day = (d || new Date()).getDay();
    const temp = this.weekEnds.find(x=> x === day);
    
    return day !== temp;
  }


}
