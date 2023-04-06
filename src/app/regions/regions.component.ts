import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  constructor(public dataserviceObj: DataService, private _route: ActivatedRoute, private spinner1: NgxSpinnerService) { }
    public global_cases;
    public global_deaths;
    public global_recovered;
    public global_cases_today;
    public global_deaths_today;
    public global_recovered_today;

  ngOnInit() {
    this.spinner1.show();
    this.dataserviceObj.getGlobalData().pipe(map(res => res.data)).subscribe(data => {
      console.log(data);
      this.global_cases = data.confirmed.toLocaleString('en');
      this.global_deaths = data.deaths.toLocaleString('en');
      this.spinner1.hide();
    });
    
  }

}
