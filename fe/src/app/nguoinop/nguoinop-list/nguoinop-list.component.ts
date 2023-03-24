import {Component, OnInit} from '@angular/core';
import {NguoinopService} from "../../../service/nguoinop.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import {formatNumber} from "@angular/common";
import {NguoinopDeleteComponent} from "../nguoinop-delete/nguoinop-delete.component";
import {MatDialog} from "@angular/material/dialog";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nguoinop-list',
  templateUrl: './nguoinop-list.component.html',
  styleUrls: ['./nguoinop-list.component.css']
})
export class NguoinopListComponent implements OnInit{
  soLuong:any;
  tongTien=0;
  nguoinop:any;
  nguoinopList:any;
  nguoinopForm = new FormGroup({
    ten: new FormControl('',[Validators.required]),
    diaChi: new FormControl('',[Validators.required]),
    soTien: new FormControl('',[Validators.required,Validators.max(2000000000)])
  })
  constructor(
    private nguoinopService:NguoinopService,
    private matDialog:MatDialog
  ) {
  }
  ngOnInit(): void {
    this.nguoinopService.findAll().subscribe(
      (data)=>{
        this.nguoinopList=data;
        this.soLuong = this.nguoinopList.length;
        let tongTien=0;
        for (let i = 0; i < this.nguoinopList.length;i ++){
          tongTien += this.nguoinopList[i].soTien
        }
        this.tongTien = tongTien;
      }
    )
  }

  save() {
    if (this.nguoinopForm.valid){
      // @ts-ignore
      let soTienTam= (this.nguoinopForm.controls['soTien'].value).replaceAll(',','')
      this.nguoinopForm.controls['soTien'].setValue(soTienTam)

      this.nguoinopService.save(this.nguoinopForm.value).subscribe(
        (data)=>{
          console.log(data)
          this.nguoinop=data;
          this.generatePDF(this.nguoinop)
          this.ngOnInit();
          this.nguoinopForm.reset();
        }
      )
    }
  }

  reset() {
    this.nguoinopForm.reset()
  }

  ChuSo = new Array(" không ", " một", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
  Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
  DocSo3ChuSo(baso:number) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(String(baso / 100));
    chuc = parseInt(String((baso % 100) / 10));
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
      KetQua += this.ChuSo[tram] + " trăm ";
      if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
      KetQua += this.ChuSo[chuc] + " mươi ";
      if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
      case 1:
        if ((chuc != 0) && (chuc != 1)) {
          KetQua += " mốt ";
        }
        else {
          KetQua += this.ChuSo[donvi];
        }
        break;
      case 5:
        if (chuc == 0) {
          KetQua += this.ChuSo[donvi];
        }
        else {
          KetQua += " lăm ";
        }
        break;
      default:
        if (donvi != 0) {
          KetQua += this.ChuSo[donvi];
        }
        break;
    }
    return KetQua;
  }
  DocTienBangChu(SoTien:any) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var ViTri = new Array();
    if (SoTien < 0) return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng !";
    if (SoTien > 0) {
      so = SoTien;
    }
    else {
      so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
      //SoTien = 0;
      return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5]))
      ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4]))
      ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3]))
      ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(String(so / 1000000));
    if (isNaN(ViTri[2]))
      ViTri[2] = "0";
    ViTri[1] = parseInt(String((so % 1000000) / 1000));
    if (isNaN(ViTri[1]))
      ViTri[1] = "0";
    ViTri[0] = parseInt(String(so % 1000));
    if (isNaN(ViTri[0]))
      ViTri[0] = "0";
    if (ViTri[5] > 0) {
      lan = 5;
    }
    else if (ViTri[4] > 0) {
      lan = 4;
    }
    else if (ViTri[3] > 0) {
      lan = 3;
    }
    else if (ViTri[2] > 0) {
      lan = 2;
    }
    else if (ViTri[1] > 0) {
      lan = 1;
    }
    else {
      lan = 0;
    }
    for (i = lan; i >= 0; i--) {
      tmp = this.DocSo3ChuSo(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) KetQua += (this.Tien)[i];
      if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
    KetQua = KetQua.replaceAll("  ", " ")
    return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }

  generatePDF(nguoinop:any) {
    // console.log(nguoinop)
    let ten = nguoinop.ten.toUpperCase();
    let diaChi = nguoinop.diaChi.toUpperCase();
    let soTienTam = nguoinop.soTien
    let soTien = new Intl.NumberFormat().format(nguoinop.soTien);
    let bangChu = this.DocTienBangChu(soTienTam);
    let ngay = new Date(nguoinop.ngay).getDate();
    let thang = new Date(nguoinop.ngay).getMonth() + 1;

    let docDefinition = {
      pageSize:'A5', pageOrientation: 'landscape',
      content: [
        {
          text: ten,margin:[]
        },
        {
          text: diaChi,margin:[]
        },
        {
          text: soTien,margin:[]
        },
        {
          text: bangChu,margin:[]
        },
        {
          text: ngay,margin:[]
        },
        {
          text: thang,margin:[]
        }
      ]
    };
    pdfMake.createPdf(docDefinition).print();
  }

  openDialogDelete(nguoinop: any) {
    const dialogRefDelete = this.matDialog.open(NguoinopDeleteComponent, {
      width: '600px',
      data: nguoinop,
      disableClose: true
    })
    dialogRefDelete.afterClosed().subscribe(
      ()=>{
        this.ngOnInit()
      }
    )
  }
}
