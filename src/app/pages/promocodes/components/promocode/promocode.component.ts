import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CPromocode } from 'src/app/model/entities/promocode';

@Component({
    selector: "the-promocode",
    templateUrl: "./promocode.component.html",
})
export class CPromocodeComponent extends CEntityComponent<CPromocode> {}
