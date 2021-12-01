
import { BookingComponent } from '../Components/calendar/schedules/booking/booking.component';
import demodata from '../data/data.json';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DoctorsService {

    constructor(private http: HttpClient) {}

    booking: any[] =[];

    weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    doctors: any[]=demodata;

    selectedDoctorId: string;

    url: string = 'http://localhost:3000/doctors';
    // selectedDate: Date;

    getData() {
        console.log('start');

        return this.http.get(this.url);
                
    }
    

    getDoctors() {
        // this.getData().subscribe((data:any) => {
        //                     data.map(doctor => 
        //                         {
        //                             this.doctors.push(doctor)
        //                         })
        //                 });
        // console.log(this.doctors);
        
        return this.doctors;
    }

    // getDoctor(id: number) {
    //     return this.doctors[id];
    // }
    getDoctor(id: string) {
        return this.doctors.find(doctor => doctor.id === id);
    }

    // getWeekEnds(id: string) {
    //     const weekEnds = []
    //     for (let day of this.weekDays) {
    //         if (!this.doctors[id].availibility[day]) {
    //             weekEnds.push(this.weekDays.findIndex(x => x === day));
    //         }
    //     }

    //     return weekEnds;
    // }

    getWeekEnds(id: string) {
        const weekEnds = [];
        const doctor = this.doctors.find(doctor => doctor.id === id);
        for (let day of this.weekDays) {
            if (!doctor.availibility[day]) {
                weekEnds.push(this.weekDays.findIndex(x => x === day));
            }
        }

        return weekEnds;
    }

    getSelectedDateSchedule(date: Date) {
        const day = this.weekDays[date.getDay()];
        const selectedDateTime = this.doctors.find(doctor => doctor.id === this.selectedDoctorId).availibility[day];
        return selectedDateTime.split(' - ');
    }

    getAllSchedules(startingTime: Date, endingTime: Date, durationTime: number) {
        let schedules = [];

        let preBooking: any[] = this.booking.filter(d => d.id === this.selectedDoctorId);

        let booked = preBooking.filter(doctor => doctor.date.getFullYear() === startingTime.getFullYear() &&
                                                    doctor.date.getMonth() === startingTime.getMonth() && 
                                                    doctor.date.getDate() === startingTime.getDate());
        
        while (startingTime < endingTime) {

            if (booked.find(doctor => this.convertDateToTime(doctor.date) === this.convertDateToTime(startingTime)) )
            {  
                console.log("already booked");
                
                startingTime.setMinutes(startingTime.getMinutes() + durationTime);
            }

            else {
                schedules.push(this.convertDateToTime(startingTime));
                this.convertDateToTime(startingTime);
                startingTime.setMinutes(startingTime.getMinutes() + durationTime);
            }

        }
        return schedules;
    }

    convertTimeToDate(date: Date, time: any) {
       
        const ScheduleTime = new Date(date);
        ScheduleTime.setHours(time.substr(0, 2));
        ScheduleTime.setMinutes(time.substr(3, 2));
        if (time.substr(6, 2) === 'PM' && ScheduleTime.getHours() !== 12) {
            ScheduleTime.setHours(ScheduleTime.getHours() + 12)
        }
        else if(time.substr(6, 2) === 'AM' && ScheduleTime.getHours() === 12) {
            ScheduleTime.setHours(ScheduleTime.getHours() - 12)
        }
        // console.log(ScheduleTime);
        return ScheduleTime;
    }

    convertDateToTime(date: Date) {
        let stringTime = '';
        let hours = date.getHours();
        let min = date.getMinutes();

        if (hours >= 12) {
            if (hours > 12)
                hours = hours - 12;
            stringTime = (hours < 10 ? '0' + hours : hours) + ':' + (min > 0 ? min : '00') + ' PM';
        }
        else {
            if (hours == 0)
                hours = 12;
            stringTime = (hours < 10 ? '0' + hours : hours) + ':' + (min > 0 ? min : '00') + ' AM';
        }
        return stringTime;
    }

    onSaveBooking(id: string, date: Date, name: string, telephone: string, reason: string) {
        let newBooking = {
            id: id,
            date: date,
            name: name,
            telephone: telephone,
            reason: reason
        };
        //console.log(newBooking);

        this.booking.push(newBooking);
        //console.log(this.booking);

    }

}