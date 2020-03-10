import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(value: any, propname: string): any {
    return value.sort((a, b) => {
      if (a[propname] > b[propname]) {
        return 1;
      }
      return -1;
    });
  }
}
