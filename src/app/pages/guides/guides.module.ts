import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CGuidesListPage } from './pages/list/guides.list.page';
import { CGuidesCreatePage } from './pages/create/guides.create.page';
import { CGuidesEditPage } from './pages/edit/guides.edit.page';
import { CGuideComponent } from './components/guide/guide.component';
import { CGuidesListService } from './services/guides.list.service';
import { CPanelTaskComponent } from './components/panel-task/panel-task.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CGuidesListPage, pathMatch: "full"},
	{path:"create", component: CGuidesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CGuidesEditPage},
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
		CGuidesListPage,
		CGuidesCreatePage,
		CGuidesEditPage,
		CGuideComponent,
		CPanelTaskComponent,
	],  
	providers: [
		CGuidesListService,
	]  
})
export class CGuidesModule { }
