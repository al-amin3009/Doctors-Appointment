import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<BookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      telephone: '',
      reason: ''
    })
  }

  save() {
        this.dialogRef.close(this.form.value);
  }

    close() {
        this.dialogRef.close();
    }

}
