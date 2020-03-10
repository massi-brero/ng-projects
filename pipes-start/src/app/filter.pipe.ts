import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string, propName: string): any {
    if (value.length === 0 || filter === "") {
      return value;
    }

    const result = [];
    for (const item of value) {
      if (item[propName] === filter) {
        result.push(item);
      }
    }
    return result;
  }
}
