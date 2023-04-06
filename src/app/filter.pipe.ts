import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(country: any[], searchText: string): any[] { //getting searchText as input from searchbox
    if(!country) return [];
    if(!searchText) return country;
searchText = searchText.toLowerCase();
return country.filter( card => { //filter countries and return
      return card.country.toLowerCase().includes(searchText);
    });
   }

}