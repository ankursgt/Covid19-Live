import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { globaldata } from '../country';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  constructor(public dataserviceObj: DataService, private _route: ActivatedRoute,) { }
    public global_cases;
    public global_deaths;
    public global_recovered;
    public global_cases_today;
    public global_deaths_today;
    public global_recovered_today;

  ngOnInit() {
    this.dataserviceObj.getCovidData().pipe(map(res => res.Global)).subscribe(data => {
      console.log(data);
      this.global_cases = data.TotalConfirmed.toLocaleString('en');
      this.global_deaths = data.TotalDeaths.toLocaleString('en');    
      this.global_recovered = data.TotalRecovered.toLocaleString('en');
      this.global_cases_today = data.NewConfirmed.toLocaleString('en');
      this.global_deaths_today = data.NewDeaths.toLocaleString('en');
      this.global_recovered_today = data.NewRecovered.toLocaleString('en');
    });
    
  }

}
