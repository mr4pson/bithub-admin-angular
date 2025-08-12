import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CLinktype } from 'src/app/model/entities/linktype';

@Component({
    selector: "the-linktype",
    templateUrl: "./linktype.component.html",
})
export class CLinktypeComponent extends CEntityComponent<CLinktype> {}
