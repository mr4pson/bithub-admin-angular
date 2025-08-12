import { Component } from '@angular/core';
import { CArtcat } from 'src/app/model/entities/artcat';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-artcat",
    templateUrl: "./artcat.component.html",
})
export class CArtcatComponent extends CEntityComponent<CArtcat> {}
