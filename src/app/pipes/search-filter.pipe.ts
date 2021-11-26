import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(doctors: any[], searchValue: string): any {

    if(!doctors || !searchValue){
      return doctors;
    }

    return doctors.filter(function(doctor){
      return doctor.name.toLowerCase().includes(searchValue.toLowerCase());
  }) 
  }

}
