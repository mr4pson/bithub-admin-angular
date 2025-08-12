import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CInordersListPage } from './pages/list/inorders.list.page';
import { CInordersEditPage } from './pages/edit/inorders.edit.page';
import { CInorderComponent } from './components/inorder/inorder.component';
import { CInordersListService } from './services/inorders.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CInordersListPage, pathMatch: "full"},
	{path:"edit/:id", component: CInordersEditPage},
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
		CInordersListPage,
		CInordersEditPage,
		CInorderComponent,
	],  
	providers: [
		CInordersListService,
	]  
})
export class CInordersModule { }
