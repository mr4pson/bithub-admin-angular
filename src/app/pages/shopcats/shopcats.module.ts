import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CShopcatsCreatePage } from './pages/create/shopcats.create.page';
import { CShopcatsEditPage } from './pages/edit/shopcats.edit.page';
import { CShopcatComponent } from './components/shopcat/shopcat.component';
import { CShopcatsListService } from './services/shopcats.list.service';
import { CShopcatsListPage } from './pages/list/shopcats.list.page';

let routing = RouterModule.forChild ([
	{path:"", component: CShopcatsListPage, pathMatch: "full"},
	{path:"create", component: CShopcatsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CShopcatsEditPage},
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
		CShopcatsListPage,
		CShopcatsCreatePage,
		CShopcatsEditPage,
		CShopcatComponent,
	],
	providers: [
		CShopcatsListService,
	]
})
export class CShopcatsModule { }
