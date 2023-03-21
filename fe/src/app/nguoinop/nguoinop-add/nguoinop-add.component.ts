import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-nguoinop-add',
  templateUrl: './nguoinop-add.component.html',
  styleUrls: ['./nguoinop-add.component.css']
})
export class NguoinopAddComponent implements OnInit {
  nguoinopForm = new FormGroup({
    ten: new FormControl(''),
    diaChi: new FormControl(''),
    soTien: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {

  }

}
