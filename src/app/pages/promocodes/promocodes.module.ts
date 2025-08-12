import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CPromocodesListPage } from './pages/list/promocodes.list.page';
import { CPromocodesCreatePage } from './pages/create/promocodes.create.page';
import { CPromocodesEditPage } from './pages/edit/promocodes.edit.page';
import { CPromocodeComponent } from './components/promocode/promocode.component';
import { CPromocodesListService } from './services/promocodes.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CPromocodesListPage, pathMatch: "full"},
	{path:"create", component: CPromocodesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CPromocodesEditPage},
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
		CPromocodesListPage,
		CPromocodesCreatePage,
		CPromocodesEditPage,
		CPromocodeComponent,
	],  
	providers: [
		CPromocodesListService,
	]  
})
export class CPromocodesModule { }
