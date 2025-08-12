import { Component } from '@angular/core';
import { CDrop } from 'src/app/model/entities/drop';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-drop",
    templateUrl: "./drop.component.html",
})
export class CDropComponent extends CEntityComponent<CDrop> {}
