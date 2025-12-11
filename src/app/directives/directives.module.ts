import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CSortableDirective } from './sortable.directive';
import { CTrimDirective } from './trim.directive';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [CTrimDirective, CSortableDirective, ClickOutsideDirective],
  exports: [CTrimDirective, CSortableDirective, ClickOutsideDirective],
  providers: [NgModel],
})
export class CDirectivesModule {}
