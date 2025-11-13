import { Component } from '@angular/core';
import { CToolcat } from 'src/app/model/entities/toolcat';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
  selector: 'the-toolcat',
  templateUrl: './toolcat.component.html',
})
export class CToolcatComponent extends CEntityComponent<CToolcat> {}
