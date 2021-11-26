import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.css']
})
export class SearchDoctorsComponent implements OnInit {
  @Output() inputValue = new EventEmitter<string>();
  searchValue: string;
  constructor() { }

  ngOnInit(): void {
    
  }

  searchValueChange(){
    this.inputValue.emit(this.searchValue);
  }

}
