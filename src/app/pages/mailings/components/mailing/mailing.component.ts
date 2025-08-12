import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CMailing } from 'src/app/model/entities/mailing';

@Component({
    selector: "the-mailing",
    templateUrl: "./mailing.component.html",
})
export class CMailingComponent extends CEntityComponent<CMailing> {}
