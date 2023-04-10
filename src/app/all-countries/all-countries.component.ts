import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { RestcountriesService } from '../restcountries.service';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { CountriesDetail } from '../country';
import * as $ from 'jquery';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-allcountries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css']
})
export class AllCountriesComponent implements OnInit{

  public countries;
  public region;
  public countriesdata;
  public fcountriesdata=[];
  public p: any;
  public search: any;
  public detailsArr = [];
  public filteredDetailsArr;

  constructor(public restserviceObj:RestcountriesService, public dataserviceObj: DataService, private _route: ActivatedRoute, public loc: Location, private spinner: NgxSpinnerService) { }



  ngOnInit() {
    this.spinner.show();
    this._route.params
      .subscribe(
        (params) => {
          let rCountry = this._route.snapshot.paramMap.get('region');
            this.getCountriesByRegion(rCountry);
        }
      )}

  segregateData(data)   {
      return data.reduce((c, data) => {
          if (!c[data.country]) {
            c[data.country] = {
              confirmed: data.confirmed,
              deaths: data.deaths,
              
            };
          } else {
            c[data.country].confirmed += data.confirmed;
            c[data.country].deaths += data.deaths;
          }
          return c;
        }, {});
    }
   

  getCountriesByRegion(region){
    this.restserviceObj.getCountries(region)
      .subscribe(
        data => {
          this.countries=data;
          this.dataserviceObj.getCovidData().pipe(map(res=>res.data)).subscribe(data=>{
            this.countriesdata=data.covid19Stats;
            this.filteredDetailsArr = this.countriesdata.filter(x => x.province == null).map(country => country.country);
            const result = this.segregateData(this.countriesdata);
            
            for(const i in result){
              let cdata = {country: '', confirmed: 0, deaths: 0, flag: ''}
              cdata.country = i;
              cdata.confirmed = result[i].confirmed;
              cdata.deaths = result[i].deaths;
              this.detailsArr.push(cdata);
            }
            for(var i=0;i<Object.keys(this.detailsArr).length;i++){
              for(var j=0;j<Object.keys(this.countries).length;j++){
                  if(this.detailsArr[i].country==this.countries[j].name.common){
                    this.detailsArr[i].flag=this.countries[j].flags.svg;
                this.fcountriesdata.push(this.detailsArr[i]);
                }
              }
            }
            this.spinner.hide();
          });
        }
      )
  }

  areDetailsAvailable(country){
    return this.filteredDetailsArr.includes(country);
  }

  public goBack(): any{
    this.loc.back();
  } 

}