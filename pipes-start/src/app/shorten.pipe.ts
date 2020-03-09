import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten"
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const suffix = value.length > limit ? "..." : "";
    console.log(value);

    return `${value.substr(0, limit)}${suffix}`;
  }
}
