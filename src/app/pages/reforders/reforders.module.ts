import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CRefordersListPage } from './pages/list/reforders.list.page';
import { CRefordersEditPage } from './pages/edit/reforders.edit.page';
import { CReforderComponent } from './components/reforder/reforder.component';
import { CRefordersListService } from './services/reforders.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CRefordersListPage, pathMatch: "full"},
	{path:"edit/:id", component: CRefordersEditPage},
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
		CRefordersListPage,
		CRefordersEditPage,
		CReforderComponent,
	],  
	providers: [
		CRefordersListService,
	]  
})
export class CRefordersModule { }
