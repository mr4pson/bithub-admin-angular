import { Component } from '@angular/core';
import { CBaxer } from 'src/app/model/entities/baxer';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-baxer",
    templateUrl: "./baxer.component.html"
})
export class CBaxerComponent extends CEntityComponent<CBaxer> {}
