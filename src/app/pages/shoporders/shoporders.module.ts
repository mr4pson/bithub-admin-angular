import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CShopordersListPage } from './pages/list/shoporders.list.page';
import { CShopordersEditPage } from './pages/edit/shoporders.edit.page';
import { CShoporderComponent } from './components/shoporder/shoporder.component';
import { CShopordersListService } from './services/shoporders.list.service';

let routing = RouterModule.forChild ([
	{path:"", component: CShopordersListPage, pathMatch: "full"},
	{path:"edit/:id", component: CShopordersEditPage},
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
		CShopordersListPage,
		CShopordersEditPage,
		CShoporderComponent,
	],
	providers: [
		CShopordersListService,
	]
})
export class CShopordersModule { }
