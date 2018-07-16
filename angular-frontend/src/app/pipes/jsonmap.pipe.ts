import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'jsonmap'
})
export class JsonmapPipe implements PipeTransform {

  transform(value: String, args?: any): String {


    return null;
  }

}
