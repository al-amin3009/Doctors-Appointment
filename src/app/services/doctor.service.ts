
import { BookingComponent } from '../Components/calendar/schedules/booking/booking.component';
import demodata from '../data/data.json';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DoctorsService {

    constructor(private http: HttpClient) {}

    booking: any[] ;

    weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    doctors: any[]=demodata;

    selectedDoctorId: number;

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

    getDoctor(id: number) {
        return this.doctors[id];
    }

    getWeekEnds(id: number) {
        const weekEnds = []
        for (let day of this.weekDays) {
            if (!this.doctors[id].availibility[day]) {
                weekEnds.push(this.weekDays.findIndex(x => x === day));
            }
        }

        return weekEnds;
    }

    getSelectedDateSchedule(date: Date) {
        const day = this.weekDays[date.getDay()];
        const selectedDateTime = this.doctors[this.selectedDoctorId].availibility[day];
        return selectedDateTime.split(' - ');
    }

    getAllSchedules(startingTime: Date, endingTime: Date, durationTime: number) {
        // console.log(durationTime);

        let schedules = [];

        let preBooking: any[] = this.booking.filter(d => d.id === this.selectedDoctorId);

        // console.log(this.booking);
        // console.log(preBooking);

        while (startingTime < endingTime) {

            if (preBooking.find(doctor => doctor.date.getFullYear() === startingTime.getFullYear()) &&
                preBooking.find(doctor => doctor.date.getMonth() === startingTime.getMonth()) &&
                preBooking.find(doctor => doctor.date.getDate() === startingTime.getDate()) &&
                preBooking.find(doctor => doctor.date.getHours() === startingTime.getHours()) &&
                preBooking.find(doctor => doctor.date.getMinutes() === startingTime.getMinutes())) {

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
        //console.log(ScheduleTime);
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

    onSaveBooking(id: number, date: Date, name: string, telephone: string, reason: string) {
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