import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { RegionsComponent } from './regions/regions.component';
import { AllCountriesComponent } from './all-countries/all-countries.component';
import { FilterPipe } from './filter.pipe';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  {path:'regions',component:RegionsComponent},
  {path:'',redirectTo: 'regions', pathMatch:'full'},
  {path:'countries/:region', component:AllCountriesComponent},
  {path:'acountry/:country', component:CountryDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryDetailComponent,
    RegionsComponent,
    AllCountriesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, NgxPaginationModule, ChartsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
