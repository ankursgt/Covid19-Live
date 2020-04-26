import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesDetail } from './country';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  globalurl= "https://api.covid19api.com/summary";
  countryurl= "https://api.covid19api.com/dayone/country/";
  start_date=new Date("2020-02-01");
  end_date=new Date();



  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  getCovidData(){
    return this.http.get<CountriesDetail>(this.globalurl);
  }

  getCountryInfo(country){
    console.log(this.datepipe.transform(this.start_date,'yyyy-MM-dd'));
    return this.http.get(this.countryurl+country)
      //+"?from="+this.start_date+"T00:00:00Z"+"&to="+this.end_date+"T00:00:00Z");
  }
}
