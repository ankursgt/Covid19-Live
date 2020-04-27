import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { countrydata } from '../countrydata';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  public country;
  public xaxis = [];
  public yaxis = [];
  public countryInfo;
  public countrydata;
  public cdata_today: countrydata;
  total_cases;
  total_deaths;
  total_recovered;
  public cdata_slw;
  public cases_slw;
  public deaths_slw;
  public recovered_slw;
  public daily_cases = [];
  public daily_deaths = [];
  public daily_recovered = [];
  public recoveryrate;
  public last_updated;


  constructor(private datasvc: DataService, private _route: ActivatedRoute, public loc: Location, private dtpipe: DatePipe) { }
  ngOnInit() {
    var conf;
    var dth;
    var rcrd;
    this._route.params.subscribe(
      data => {
        this.country = data.country;
        this.datasvc.getCovidData().pipe(map(res => res.Countries)).subscribe(data => {
          this.countrydata = data;
          for (var i = 0; i < Object.keys(this.countrydata).length; i++) {
            if (this.countrydata[i].Country == this.country) {
              this.last_updated = new Date(this.countrydata[i].Date);
            }
          }
        });
        this.datasvc.getCountryInfo(this.country).subscribe(
          data => {
            this.countryInfo = data;
            console.log(this.countryInfo);
            if (this.country == "United States of America" || this.country == "China" || this.country == "Australia") {
              const result = this.segregate(this.countryInfo);
              var special = [];
              const countryclass = function (Confirmed, Deaths, Recovered, Date) {
                return { Confirmed: Confirmed, Deaths: Deaths, Recovered: Recovered, Date: Date }
              }
              for (let r in result) {
                //special.push(new countryclass(result[r].Confirmed, result[r].Deaths, result[r].Recovered, result[r].Date));
              }
              special.pop();
              this.daily_cases[0] = special[0].Confirmed;
              this.daily_deaths[0] = special[0].Deaths;;
              this.daily_recovered[0] = special[0].Recovered;
              for (var j = 0; j < special.length; j++) {
                this.xaxis.push(this.dtpipe.transform(special[j].Date, 'MMM-dd'));
                this.yaxis.push(special[j].Confirmed);
              }
              //console.log(special);
              for (var k = 0; k < special.length - 1; k++) {
                conf = Math.abs(special[k + 1].Confirmed - special[k].Confirmed);
                dth = Math.abs(special[k + 1].Deaths - special[k].Deaths);
                rcrd = Math.abs(special[k + 1].Recovered - special[k].Recovered);
                this.daily_cases.push(conf);
                this.daily_deaths.push(dth);
                this.daily_recovered.push(rcrd);

              }
              this.cdata_today = special[special.length - 1];
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
              for (var i = 0; i < Object.keys(this.countryInfo).length; i++) {
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
                //console.log(this.daily_cases);
              }
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
            //console.log(this.xaxis);
            //console.log(this.yaxis);
          });
      })
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


