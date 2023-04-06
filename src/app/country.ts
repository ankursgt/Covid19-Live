export class GlobalDetail{
    data: {
        recovered: any,
        deaths: number;
        confirmed: number;
        lastChecked: Date;
        lastReported: Date;
        location: string;
    }
    
    
}

export class CountriesDetail{
    data: {
        lastChecked: Date;
        covid19Stats: countriesdata;
    }
    
    
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
    city: string;
    province: string;
    country: string;
    lastUpdate: Date;
    keyId: string;
    confirmed: number;
    deaths: number;
    recovered: any;
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