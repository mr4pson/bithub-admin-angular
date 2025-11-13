import { Component } from '@angular/core';
import { CTool } from 'src/app/model/entities/tool';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';

@Component({
  selector: 'the-tool',
  templateUrl: './tool.component.html',
})
export class CToolComponent extends CSlugableEntityComponent<CTool> {}
