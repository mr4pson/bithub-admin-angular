import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { COutorder } from 'src/app/model/entities/outorder';

@Component({
    selector: "the-outorder",
    templateUrl: "./outorder.component.html",
})
export class COutorderComponent extends CEntityComponent<COutorder> {}
