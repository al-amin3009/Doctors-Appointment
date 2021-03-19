import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "../Components/calendar/calendar.component";
import { DoctorsListComponent } from "../Components/doctors-list/doctors-list.component";

const appRoutes : Routes = [
    { path: '', redirectTo: '/doctors', pathMatch: 'full'},
    { path: 'doctors', component: DoctorsListComponent },
    { path: 'doctors/:id' , component:  CalendarComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}