import { Component, OnInit } from '@angular/core';
import { NguoinopService } from 'src/service/nguoinop.service';

@Component({
  selector: 'app-nguoinop-list',
  templateUrl: './nguoinop-list.component.html',
  styleUrls: ['./nguoinop-list.component.css']
})
export class NguoinopListComponent implements OnInit {
  nguoinopList:any;
  constructor(
    private nguoinopSerice:NguoinopService
  ) { }

  ngOnInit(): void {
    this.nguoinopSerice.findAll().subscribe(
      (data)=>{
        console.log(data)
        this.nguoinopList=data
      }
    )
  }

}
