import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesDetail, GlobalDetail } from './country';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly lastUpdatedDate = environment.lastUpdatedDate;
  
  globalurl= "https://covid-19-by-api-ninjas.p.rapidapi.com/v1/covid19";

  private headers= new HttpHeaders()
  .set('x-rapidapi-key', '65ba733593mshce38f6da90c0b83p137dcejsn7e793c04a492')
  .set('x-rapidapi-host', 'covid-19-by-api-ninjas.p.rapidapi.com');

  constructor(private http: HttpClient, public datepipe: DatePipe) {
    
   }

   getGlobalData() {
    return this.http.get<GlobalDetail>(this.globalurl + 'total', { 'headers': this.headers });
   }

  getCovidData(){
    return this.http.get<CountriesDetail[]>(this.globalurl + `?date=${this.lastUpdatedDate}`, { 'headers': this.headers });
  }

  getCountryInfo(country){
    return this.http.get<CountriesDetail[]>(this.globalurl + `?country=${country}`, { 'headers': this.headers })
      //+"?from="+this.start_date+"T00:00:00Z"+"&to="+this.end_date+"T00:00:00Z");
  }

  getDeaths(country?: string){
    return country ? this.http.get<CountriesDetail[]>(this.globalurl + `?country=${country}&type=deaths`, { 'headers': this.headers }) :
     this.http.get<CountriesDetail[]>(this.globalurl + `?date=${this.lastUpdatedDate}&type=deaths`, { 'headers': this.headers });
    
  }
}
