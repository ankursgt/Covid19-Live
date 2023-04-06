import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesDetail, GlobalDetail } from './country';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  globalurl= "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/";
  countryurl= "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=";

  private headers= new HttpHeaders()
  .set('x-rapidapi-key', '65ba733593mshce38f6da90c0b83p137dcejsn7e793c04a492')
  .set('x-rapidapi-host', 'covid-19-coronavirus-statistics.p.rapidapi.com');

  constructor(private http: HttpClient, public datepipe: DatePipe) {
    
   }

   getGlobalData() {
    return this.http.get<GlobalDetail>(this.globalurl + 'total', { 'headers': this.headers });
   }

  getCovidData(){
    return this.http.get<CountriesDetail>(this.globalurl + 'stats', { 'headers': this.headers });
  }

  getCountryInfo(country){
    return this.http.get(this.countryurl+country, { 'headers': this.headers })
      //+"?from="+this.start_date+"T00:00:00Z"+"&to="+this.end_date+"T00:00:00Z");
  }
}
