import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, DoCheck {

  constructor(private dialog: MatDialog, private api: ApiService, private router: Router) { }
  isadminuser = false;

  ngDoCheck(): void {
    let currenturl=this.router.url;
    let role = sessionStorage.getItem('role');
    //if(currenturl=='/login'||currenturl=='/register'){

       if(role == 'admin'){
        this.isadminuser = true;
       }
       else{
        this.isadminuser = false;
       //}
      }
    }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: companymodel[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = ["id", "name", "empcount", "revenue", "address", "isactive", "action"]

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.Getallcompany().subscribe(response => {
      this.companydata = response;
      this.finaldata=new MatTableDataSource<companymodel>(this.companydata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
   this.api.RemoveCompanybycode(id).subscribe( res =>{
    this.LoadCompany();
   });
    }




}
