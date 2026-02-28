import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { countrydata } from '../countrydata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';

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
  cases_slw_date;
  recovered_slw;
  daily_cases = [];
  daily_deaths = [];
  daily_recovered = [];
  recoveryrate;
  last_updated = new Date(environment.lastUpdatedDate);
  confirmedChart;
  deathChart;
  url;


  constructor(private datasvc: DataService, private _route: ActivatedRoute, public loc: Location, private dtpipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.url = this.datasvc.globalurl;
    this._route.queryParams
      .subscribe(params => {
        this.total_cases = params.confirmed;
        this.total_deaths = params.deaths
      }
      );
    this._route.params.subscribe(
      data => {
        this.country = data.country;
        forkJoin([
          this.datasvc.getCountryInfo(this.country),
          this.datasvc.getDeaths(this.country)
        ]).subscribe(([cases, deaths]) => {
          this.countryInfo = {
            country: cases[0].country,
            region: cases[0].region,
            cases: cases[0].cases,
            deaths: deaths[0].deaths
          }
          this.spinner.hide();
          this.cases_slw_date = Object.keys(this.countryInfo.cases).reduce((a, b) =>
            this.countryInfo.cases[a].new > this.countryInfo.cases[b].new ? a : b
          );
          this.cases_slw = this.countryInfo.cases[this.cases_slw_date].new;
          const casesCummulativeData = this.cummulativeDataByMonth(this.countryInfo.cases);
          const deathsCummulativeData = this.cummulativeDataByMonth(this.countryInfo.deaths);
          this.xaxis = Object.keys(casesCummulativeData);
          this.daily_deaths = Object.values(deathsCummulativeData);
          this.confirmed_cases = Object.values(casesCummulativeData);

          this.loadChart();
        });
      })
  }

  public goBack(): any {
    this.loc.back();
  }

  cummulativeDataByMonth(type) {
    const months = Object.keys(type);
    const typeByMonth = months.reduce((acc, date) => {
      const monthKey = new Date(date).toLocaleString('default', { month: 'short' });
      const yearKey = new Date(date).getFullYear();

      if (!acc[monthKey] || date > acc[monthKey]) {
        acc[`${monthKey}-${yearKey}`] = (acc[`${monthKey}-${yearKey}`] || 0) + type[date].new;
      }

      return acc;
    }, {});
    return typeByMonth;
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


