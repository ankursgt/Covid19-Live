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
  yaxis = [];
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


  constructor(private datasvc: DataService, private _route: ActivatedRoute, public loc: Location, private dtpipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    var conf;
    var dth;
    var rcrd;
    this._route.params.subscribe(
      data => {
        this.country = data.country;
        // this.datasvc.getCovidData().pipe(map(res => res.data.covid19Stats)).subscribe(data => {
        //   this.countrydata = data;
        //   for (var i = 0; i < Object.keys(this.countrydata).length; i++) {
        //     if (this.countrydata[i].Country == this.country) {
        //       this.last_updated = new Date(this.countrydata[i].lastChecked);
        //       console.log(this.last_updated);
        //     }
        //   }
        // });
        this.datasvc.getCountryInfo(this.country).subscribe(
          data => {
            this.countryInfo = data;
            this.last_updated = new Date(this.countryInfo.data.lastChecked);
            this.total_cases = this.countryInfo.data.covid19Stats[0].confirmed;
            this.total_deaths = this.countryInfo.data.covid19Stats[0].deaths;

            console.log(this.countryInfo);
            if (this.country == "United States of America" || this.country == "China" || this.country == "Australia" || this.country == "Canada" || this.country == "Denmark") {
              const result = this.segregate(this.countryInfo);
              var temparr = [];
              var special = [];
              const countryclass = function (Confirmed, Deaths, Recovered, Date) {
                return { Confirmed: Confirmed, Deaths: Deaths, Recovered: Recovered, Date: Date }
              }
              temparr.push(result);
              this.countryobj = Object.values(temparr[0]);
              for (var n = 0; n < this.countryobj.length; n++) {
                special.push(this.countryobj[n]);
              }
              this.daily_cases[0] = special[0].Confirmed;
              this.daily_deaths[0] = special[0].Deaths;
              this.daily_recovered[0] = special[0].Recovered;
              for (var j = 0; j < special.length; j++) {
                this.xaxis.push(this.dtpipe.transform(special[j].Date, 'MMM-dd'));
                this.yaxis.push(special[j].Confirmed);
              }
              for (var k = 0; k < special.length-1; k++) {
                conf = Math.abs(special[k + 1].Confirmed - special[k].Confirmed);
                dth = Math.abs(special[k + 1].Deaths - special[k].Deaths);
                rcrd = Math.abs(special[k + 1].Recovered - special[k].Recovered);
                this.daily_cases.push(conf);
                this.daily_deaths.push(dth);
                this.daily_recovered.push(rcrd);
              }
              this.cdata_today = special[special.length-1];
              this.total_cases = this.cdata_today.Confirmed;
              this.total_deaths = this.cdata_today.Deaths;
              this.total_recovered = this.cdata_today.Recovered;
              this.cdata_slw = special[special.length - 7];
              if (this.cdata_slw.Confirmed > 0) {
                this.cases_slw = (((this.cdata_today.Confirmed - this.cdata_slw.Confirmed) / this.cdata_slw.Confirmed) * 100).toFixed(2);
              }
              if (this.cdata_slw.Deaths > 0) {
                this.deaths_slw = (((this.cdata_today.Deaths - this.cdata_slw.Deaths) / this.cdata_slw.Deaths) * 100).toFixed(2);
              }
              if (this.cdata_slw.Recovered > 0) {
                this.recovered_slw = (((this.cdata_today.Recovered - this.cdata_slw.Recovered) / this.cdata_slw.Recovered) * 100).toFixed(2);
              }
              // console.log(this.daily_cases);
              // console.log(this.daily_recovered);
            }
            else {
              this.daily_cases[0] = this.countryInfo[0].Confirmed;
              this.daily_deaths[0] = this.countryInfo[0].Deaths;;
              this.daily_recovered[0] = this.countryInfo[0].Recovered;
              for (var i = 0; i < this.countryInfo.length; i++) {
                this.xaxis.push(this.dtpipe.transform(this.countryInfo[i].Date, 'MMM-dd'));
                this.yaxis.push(this.countryInfo[i].Confirmed);
              }
              for (var j = 0; j < this.countryInfo.length - 1; j++) {
                conf = Math.abs(this.countryInfo[j + 1].Confirmed - this.countryInfo[j].Confirmed);
                dth = Math.abs(this.countryInfo[j + 1].Deaths - this.countryInfo[j].Deaths);
                rcrd = Math.abs(this.countryInfo[j + 1].Recovered - this.countryInfo[j].Recovered);
                this.daily_cases.push(conf);
                this.daily_deaths.push(dth);
                this.daily_recovered.push(rcrd);
              }
              // this.daily_cases.pop();
              // this.daily_deaths.pop();
              // this.daily_recovered.pop();
              this.cdata_today = this.countryInfo[(Object.keys(this.countryInfo).length) - 1];
              this.total_cases = this.cdata_today.Confirmed;
              this.total_deaths = this.cdata_today.Deaths;
              this.total_recovered = this.cdata_today.Recovered;
              this.cdata_slw = this.countryInfo[(Object.keys(this.countryInfo).length) - 7];
              if (this.cdata_slw.Confirmed > 0) {
                this.cases_slw = (((this.cdata_today.Confirmed - this.cdata_slw.Confirmed) / this.cdata_slw.Confirmed) * 100).toFixed(2);
              }
              if (this.cdata_slw.Deaths > 0) {
                this.deaths_slw = (((this.cdata_today.Deaths - this.cdata_slw.Deaths) / this.cdata_slw.Deaths) * 100).toFixed(2);
              }
              if (this.cdata_slw.Recovered > 0) {
                this.recovered_slw = (((this.cdata_today.Recovered - this.cdata_slw.Recovered) / this.cdata_slw.Recovered) * 100).toFixed(2);
              }
            }
            this.recoveryrate = ((this.total_recovered / this.total_cases) * 100).toFixed(2);
          });
      })
    this.spinner.hide();
  }

  segregate(datas) {

    return datas.reduce((c, data) => {
      if (!c[data.Date]) {
        c[data.Date] = {
          Confirmed: data.Confirmed,
          Date: data.Date,
          Deaths: data.Deaths,
          Recovered: data.Recovered
        };
      } else {
        c[data.Date].Confirmed += data.Confirmed;
        c[data.Date].Deaths += data.Deaths;
        c[data.Date].Recovered += data.Recovered;
      }
      return c;
    }, {});

  }

  public goBack(): any {
    this.loc.back();
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = this.xaxis;
  public barChartType = 'bar';
  public barChartLegend: true;

  public confirmedData = [
    { data: this.yaxis, label: 'Confirmed Cases', backgroundColor: 'rgb(31,191,184)', hoverBackgroundColor: 'rgb(3, 17, 99)' },
  ];

  public dailyDeaths = [
    { data: this.daily_deaths, label: 'Daily Deaths', backgroundColor: 'rgb(31,191,184)', hoverBackgroundColor: 'rgb(3, 17, 99)' },
  ]

  public dailyCases = [
    { data: this.daily_cases, label: 'Daily Cases', backgroundColor: 'rgb(31,191,184)', hoverBackgroundColor: 'rgb(3, 17, 99)' },
  ]

  public dailyRecovered = [
    { data: this.daily_recovered, label: 'Daily Recovered', backgroundColor: 'rgb(31,191,184)', hoverBackgroundColor: 'rgb(3, 17, 99)' },
  ]


};


