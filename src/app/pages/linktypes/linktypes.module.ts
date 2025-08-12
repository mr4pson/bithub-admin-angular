import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CLinktypesListPage } from './pages/list/linktypes.list.page';
import { CLinktypesCreatePage } from './pages/create/linktypes.create.page';
import { CLinktypesEditPage } from './pages/edit/linktypes.edit.page';
import { CLinktypeComponent } from './components/linktype/linktype.component';
import { CLinktypesListService } from './services/linktypes.list.service';

let routing = RouterModule.forChild ([        
	{path:"", component: CLinktypesListPage, pathMatch: "full"},
	{path:"create", component: CLinktypesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CLinktypesEditPage},
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
		CLinktypesListPage,
		CLinktypesCreatePage,
		CLinktypesEditPage,
		CLinktypeComponent,
	],  
	providers: [
		CLinktypesListService,
	]  
})
export class CLinktypesModule { }
