import { Component } from '@angular/core';
import { CComment } from 'src/app/model/entities/comment';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-comment",
    templateUrl: "./comment.component.html",
})
export class CCommentComponent extends CEntityComponent<CComment> {}
