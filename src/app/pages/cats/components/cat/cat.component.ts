import { Component } from '@angular/core';
import { CCat } from 'src/app/model/entities/cat';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-cat",
    templateUrl: "./cat.component.html",
})
export class CCatComponent extends CEntityComponent<CCat> {}
