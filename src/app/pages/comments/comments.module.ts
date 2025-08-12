import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CCommentsCreatePage } from './pages/create/comments.create.page';
import { CCommentsEditPage } from './pages/edit/comments.edit.page';
import { CCommentComponent } from './components/comment/comment.component';
import { CCommentsListService } from './services/comments.list.service';
import { CCommentsListPage } from './pages/list/comments.list.page';

let routing = RouterModule.forChild ([
	{path:"", component: CCommentsListPage, pathMatch: "full"},
	{path:"create", component: CCommentsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CCommentsEditPage},
]);

@NgModule({
    imports: [
		CommonModule,
		FormsModule,
		CComponentsModule,
		CDirectivesModule,
		routing,
	],
	declarations: [
		CCommentsListPage,
		CCommentsCreatePage,
		CCommentsEditPage,
		CCommentComponent,
	],
	providers: [
		CCommentsListService,
	]
})
export class CCommentsModule { }
