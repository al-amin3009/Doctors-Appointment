
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DoctorsService } from 'src/app/services/doctor.service';
import { BookingComponent } from './booking/booking.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  @Input() dateSelected: Date;
  @Input() doctor: any;

  id: string;

  selectedScheduleTime : string ;
  appointmentView = false;

  name: string;
  telephone: string;
  reason: string;

  scheduleTimes = [];

  startedScheduleTime : Date;
  endedScheduleTime : Date;

  constructor(private doctorsService: DoctorsService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.doctorsService.booking);
    
  }

  ngOnChanges() {
    this.dateChanges(this.dateSelected);
  }

  private dateChanges(input: Date){
    this.id = this.doctorsService.selectedDoctorId;

    const times = this.doctorsService.getSelectedDateSchedule(this.dateSelected);
    const startTime = times[0];
    const endTime = times[1];

    //console.log(startTime + " " + endTime);
    

    this.startedScheduleTime = this.doctorsService.convertTimeToDate(this.dateSelected,startTime);
    this.endedScheduleTime = this.doctorsService.convertTimeToDate(this.dateSelected,endTime);

    //console.log(this.startedScheduleTime + ' ' + this.endedScheduleTime);
    //console.log(this.doctor);
    
    this.scheduleTimes = this.doctorsService
                              .getAllSchedules(this.startedScheduleTime, 
                              this.endedScheduleTime,
                              this.doctor.visitDurationInMin);
    console.log(this.scheduleTimes);
    
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { name: "",
                          telephone: "",
                          reason: ''};

    const dialogRef =this.dialog.open(BookingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.telephone = result.telephone;
      this.reason = result.reason;
      // console.log(`Dialog result: ${result}`);
      // console.log(`Dialog result: ${this.name} ${this.telephone} ${this.reason}`);
      this.onGetBookings();
    });
  }
  onGetBookings(){
    let date = this.doctorsService.convertTimeToDate(this.dateSelected,this.selectedScheduleTime);  
    //console.log(this.id);
    
    this.doctorsService.onSaveBooking(this.id, date, this.name, this.telephone, this.reason);
  }

  
}
