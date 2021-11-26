import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";


import { AppComponent } from './app.component';
import { DoctorsListComponent } from './Components/doctors-list/doctors-list.component';
import { DoctorComponent } from './Components/doctors-list/doctor/doctor.component';
import { DoctorsService } from './services/doctor.service';
import { AppRouteModule } from './routes/app-routes.module';
import { HeaderComponent } from './Components/header/header.component';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { SchedulesComponent } from './Components/calendar/schedules/schedules.component';
import { BookingComponent } from './Components/calendar/schedules/booking/booking.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SearchDoctorsComponent } from './Components/doctors-list/search-doctors/search-doctors.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    DoctorComponent,
    HeaderComponent,
    CalendarComponent,
    SchedulesComponent,
    BookingComponent,
    SearchFilterPipe,
    SearchDoctorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouteModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [DoctorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
