import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CBaxersListPage } from './pages/list/baxers.list.page';
import { CBaxersCreatePage } from './pages/create/baxers.create.page';
import { CBaxersEditPage } from './pages/edit/baxers.edit.page';
import { CBaxerComponent } from './components/baxer/baxer.component';
import { CBaxersListService } from './services/baxers.list.service';
import { CDirectivesModule } from 'src/app/directives/directives.module';

let routing = RouterModule.forChild ([        
	{path:"", component: CBaxersListPage, pathMatch: "full"},
	{path:"create", component: CBaxersCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CBaxersEditPage},
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
		CBaxersListPage,
		CBaxersCreatePage,
		CBaxersEditPage,
		CBaxerComponent,
	],  
	providers: [
		CBaxersListService,
	]  
})
export class CBaxersModule { }
