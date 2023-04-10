import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { countrydata } from '../countrydata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  country;
  xaxis = [];
  confirmed_cases = [];
  countryInfo;
  countrydata;
  cdata_today: countrydata;
  countryobj;
  total_cases;
  total_deaths;
  total_recovered;
  cdata_slw;
  cases_slw;
  deaths_slw;
  recovered_slw;
  daily_cases = [];
  daily_deaths = [];
  daily_recovered = [];
  recoveryrate;
  last_updated;
  confirmedChart;
  deathChart;


  constructor(private datasvc: DataService, private _route: ActivatedRoute, public loc: Location, private dtpipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this._route.queryParams
      .subscribe(params => {
        this.total_cases = params.confirmed;
        this.total_deaths = params.deaths
      }
    );
    this._route.params.subscribe(
      data => {
        this.country = data.country;
        this.datasvc.getCountryInfo(this.country).subscribe(
          res => {
            this.spinner.hide();
            this.countryInfo = res.data;
            this.last_updated = new Date(this.countryInfo.lastChecked);
            const maxCases = Math.max(...this.countryInfo.covid19Stats.map(x => x.confirmed));
            const maxDeaths = Math.max(...this.countryInfo.covid19Stats.map(x => x.deaths));

            this.cases_slw = this.countryInfo.covid19Stats.find(element => element.confirmed === maxCases).province;
            this.deaths_slw = this.countryInfo.covid19Stats.find(element => element.deaths === maxDeaths).province;
            for (var i = 0; i < this.countryInfo.covid19Stats.length; i++) {
              this.xaxis.push(this.countryInfo.covid19Stats[i].province);
              this.confirmed_cases.push(this.countryInfo.covid19Stats[i].confirmed);
              this.daily_deaths.push(this.countryInfo.covid19Stats[i].deaths);
            }
            this.loadChart();
          });
      })
  }

  public goBack(): any {
    this.loc.back();
  }

  loadChart(){
   this.confirmedChart = { 
    datasets: [
      {
        data: this.confirmed_cases,
        label: 'Confirmed Cases',
        type: 'bar',
        backgroundColor: '#FC8D02',
        hoverBackgroundColor: '#ffa726',
        fillColor: '#000000',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        datalabels: {
          align: 'bottom',
          color: 'black',
        },
      }
    ],
    labels: this.xaxis,
    options: {
      responsive: true,
      tooltipTemplate: '<%= value %>',
      tooltipFillColor: 'rgba(0,0,0,0)',
      tooltipFontColor: '#444',
      tooltipEvents: [],
      tooltipCaretSize: 0,
      title: { display: true },
      showDatapoints: true,
    },
  };

  this.deathChart = { 
    datasets: [
      {
        data: this.daily_deaths,
        label: 'Deaths',
        type: 'bar',
        backgroundColor: '#D40000',
        hoverBackgroundColor: '#ff0000',
        fillColor: '#000000',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        datalabels: {
          align: 'bottom',
          color: 'black',
        },
      }
    ],
    labels: this.xaxis,
    options: {
      responsive: true,
      tooltipTemplate: '<%= value %>',
      tooltipFillColor: 'rgba(0,0,0,0)',
      tooltipFontColor: '#444',
      tooltipEvents: [],
      tooltipCaretSize: 0,
      title: { display: true },
      showDatapoints: true,
    },
  };
}
};


