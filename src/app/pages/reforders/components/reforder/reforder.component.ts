import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CReforder } from 'src/app/model/entities/reforder';

@Component({
    selector: "the-reforder",
    templateUrl: "./reforder.component.html",
})
export class CReforderComponent extends CEntityComponent<CReforder> {}
