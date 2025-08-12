import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CAwardsListPage } from './pages/list/awards.list.page';
import { CAwardsCreatePage } from './pages/create/awards.create.page';
import { CAwardsEditPage } from './pages/edit/awards.edit.page';
import { CAwardComponent } from './components/award/award.component';
import { CAwardsListService } from './services/awards.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CAwardsListPage, pathMatch: "full"},
	{path:"create", component: CAwardsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CAwardsEditPage},
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
		CAwardsListPage,
		CAwardsCreatePage,
		CAwardsEditPage,
		CAwardComponent,
	],  
	providers: [
		CAwardsListService,
	]  
})
export class CAwardsModule { }
