import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CShopitemsListPage } from './pages/list/shopitems.list.page';
import { CShopitemsCreatePage } from './pages/create/shopitems.create.page';
import { CShopitemsEditPage } from './pages/edit/shopitems.edit.page';
import { CShopitemComponent } from './components/shopitem/shopitem.component';
import { CShopitemsListService } from './services/shopitems.list.service';

let routing = RouterModule.forChild ([
	{path:"", component: CShopitemsListPage, pathMatch: "full"},
	{path:"create", component: CShopitemsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CShopitemsEditPage},
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
		CShopitemsListPage,
		CShopitemsCreatePage,
		CShopitemsEditPage,
		CShopitemComponent,
	],
	providers: [
		CShopitemsListService,
	]
})
export class CShopitemsModule { }
