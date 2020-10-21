import { NgModule } from "@angular/core";
import { CamelCaseTransform } from './camel-case-transform.pipe';

@NgModule({
  imports: [],
  declarations: [CamelCaseTransform],
  exports: [CamelCaseTransform]
})
export class CamelCaseTransformModule {}