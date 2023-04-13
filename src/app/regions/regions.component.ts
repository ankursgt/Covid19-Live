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
    public last_updated;

  ngOnInit() {
    this.spinner1.show();
    this.dataserviceObj.getGlobalData().pipe(map(res => res.data)).subscribe(data => {
      this.global_cases = data.confirmed;
      this.global_deaths = data.deaths;
      this.last_updated = new Date(data.lastChecked);
      this.spinner1.hide();
    });
    
  }

}
