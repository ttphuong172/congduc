import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NguoinopService} from "../../../service/nguoinop.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-nguoinop-edit',
  templateUrl: './nguoinop-edit.component.html',
  styleUrls: ['./nguoinop-edit.component.css']
})
export class NguoinopEditComponent implements OnInit{
  nguoinop:any
  nguoinopForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    ten: new FormControl('',[Validators.required]),
    diaChi: new FormControl('',[Validators.required]),
    soTien: new FormControl('',[Validators.required])
  })
  constructor(
    private activatedRoute:ActivatedRoute,
    private nguoinopService:NguoinopService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    this.nguoinopService.findById(id).subscribe(
      (data)=>{
        this.nguoinop=data;
        let soTien =new Intl.NumberFormat().format(this.nguoinop.soTien)
        this.nguoinopForm.controls['id'].setValue(this.nguoinop.id)
        this.nguoinopForm.controls['ten'].setValue(this.nguoinop.ten)
        this.nguoinopForm.controls['diaChi'].setValue(this.nguoinop.diaChi)
        this.nguoinopForm.controls['soTien'].setValue(soTien)
      }
    )
  }

  return() {
  this.router.navigateByUrl("")
  }

  update() {
    // @ts-ignore
    let soTienTam= (this.nguoinopForm.controls['soTien'].value).replaceAll(',','')
    this.nguoinopForm.controls['soTien'].setValue(soTienTam)
    if (this.nguoinopForm.valid){
      this.nguoinopService.update(this.nguoinopForm.value).subscribe(
        ()=>{
          this.router.navigateByUrl("")
        }
      )
    }
  }
}
