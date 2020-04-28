export class  CountriesDetail{
    Global: globaldata;
    Countries: countriesdata
    
}


export class globaldata{
     NewConfirmed : any;
     TotalConfirmed : any;
     NewDeaths : any;
     TotalDeaths : any;
     NewRecovered : any;
     TotalRecovered : any;
     flag: any;
    }
     
export class countriesdata{
     Country :  any;
     CountryCode : any;
     Slug :  any;
     NewConfirmed : any;
     TotalConfirmed : any;
     NewDeaths : any;
     TotalDeaths : any;
     NewRecovered : any;
     TotalRecovered : any;
     Date :  any;
    }
// class countryDetail{
//         ourid?: any;
//         title: any;
//         code: any;
// }

// class timelineDetails{
//     new_daily_cases: any;
//     new_daily_deaths: any;
//     total_cases:any;
//     total_recoveries: any;
//     total_deaths: any
// }