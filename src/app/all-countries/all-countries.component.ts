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

  getCountriesByRegion(region){
    this.restserviceObj.getCountries(region)
      .subscribe(
        data => {
          this.countries=data;
          this.dataserviceObj.getCovidData().pipe(map(res=>res.Countries)).subscribe(data=>{
            this.countriesdata=data;
            for(var i=0;i<Object.keys(this.countriesdata).length;i++){
              for(var j=0;j<Object.keys(this.countries).length;j++){
                  if(this.countriesdata[i].Country==this.countries[j].name){
                    this.countriesdata[i].flag=this.countries[j].flag;
                this.fcountriesdata.push(this.countriesdata[i]);
                }
              }
            }
            console.log(this.fcountriesdata);
            this.spinner.hide();
          });
        }
      )
      
  }

  public goBack(): any{
    this.loc.back();
  } 

}