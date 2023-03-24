import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NguoinopService} from "../../../service/nguoinop.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nguoinop-delete',
  templateUrl: './nguoinop-delete.component.html',
  styleUrls: ['./nguoinop-delete.component.css']
})
export class NguoinopDeleteComponent implements OnInit{
  nguoinop:any
  constructor(
    private nguoinopService:NguoinopService,
    public dialogRefDelete: MatDialogRef<NguoinopDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
  }
  ngOnInit(): void {
    this.nguoinop=this.data
  }

  closeDialogDelete() {
    this.dialogRefDelete.close();
  }

  delete(nguoinop: any) {
    this.nguoinopService.delete(nguoinop).subscribe(
      ()=>{
        this.dialogRefDelete.close();
      }
    )
  }


}
