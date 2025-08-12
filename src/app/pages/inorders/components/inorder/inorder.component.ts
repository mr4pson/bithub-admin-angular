import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CInorder } from 'src/app/model/entities/inorder';

@Component({
    selector: "the-inorder",
    templateUrl: "./inorder.component.html",
})
export class CInorderComponent extends CEntityComponent<CInorder> {}
