import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CMailingsListPage } from './pages/list/mailings.list.page';
import { CMailingsCreatePage } from './pages/create/mailings.create.page';
import { CMailingsEditPage } from './pages/edit/mailings.edit.page';
import { CMailingComponent } from './components/mailing/mailing.component';
import { CMailingsListService } from './services/mailings.list.service';
import { CMailingStatusComponent } from './components/mailing-status/mailing-status.component';

let routing = RouterModule.forChild ([
	{path:"", component: CMailingsListPage, pathMatch: "full"},
	{path:"create", component: CMailingsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CMailingsEditPage},
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
		CMailingsListPage,
		CMailingsCreatePage,
		CMailingsEditPage,
		CMailingComponent,
		CMailingStatusComponent,
	],
	providers: [
		CMailingsListService,
	]
})
export class CMailingsModule { }
