import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { COutordersListPage } from './pages/list/outorders.list.page';
import { COutordersEditPage } from './pages/edit/outorders.edit.page';
import { COutorderComponent } from './components/outorder/outorder.component';
import { COutordersListService } from './services/outorders.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: COutordersListPage, pathMatch: "full"},
	{path:"edit/:id", component: COutordersEditPage},
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
		COutordersListPage,
		COutordersEditPage,
		COutorderComponent,
	],  
	providers: [
		COutordersListService,
	]  
})
export class COutordersModule { }
