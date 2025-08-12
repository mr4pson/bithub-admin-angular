import { Component } from '@angular/core';
import { CAward } from 'src/app/model/entities/award';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-award",
    templateUrl: "./award.component.html",
})
export class CAwardComponent extends CEntityComponent<CAward> {}
