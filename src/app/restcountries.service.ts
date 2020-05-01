import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  public url = "https://restcountries.eu/rest/v2";

  constructor(private _http:HttpClient) { }

  getCountries(region): any{
    let response = this._http.get(this.url+"/region/"+region);  
    return response;
  }

  getCountryInfo(country){
    let response = this._http.get(this.url+"/name/"+country+"?fullText=true");
    return response
  }

}
