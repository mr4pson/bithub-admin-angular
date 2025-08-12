import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CProposalsListPage } from './pages/list/proposals.list.page';
import { CProposalsEditPage } from './pages/edit/proposals.edit.page';
import { CProposalComponent } from './components/proposal/proposal.component';
import { CProposalsListService } from './services/proposals.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CProposalsListPage, pathMatch: "full"},
	{path:"edit/:id", component: CProposalsEditPage},
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
		CProposalsListPage,
		CProposalsEditPage,
		CProposalComponent,
	],  
	providers: [
		CProposalsListService,
	]  
})
export class CProposalsModule { }
