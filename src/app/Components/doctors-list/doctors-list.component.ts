import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  searchValueFilter : string;
  doctors: any = [];

  p: number =1;

  constructor(private doctorService: DoctorsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.doctors = this.doctorService.getDoctors();
  }

}
