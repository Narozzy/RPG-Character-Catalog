import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'camelCaseTransform'
})
export class CamelCaseTransform implements PipeTransform {
  transform(value: string) {
    const addedSpace = value.replace(/([A-Z])/g, ' $1');
    return addedSpace.charAt(0).toUpperCase() + addedSpace.slice(1);
  }
}