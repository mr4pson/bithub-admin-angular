import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CArtcatsCreatePage } from './pages/create/artcats.create.page';
import { CArtcatsEditPage } from './pages/edit/artcats.edit.page';
import { CArtcatComponent } from './components/artcat/artcat.component';
import { CArtcatsListService } from './services/artcats.list.service';
import { CArtcatsListPage } from './pages/list/artcats.list.page';

let routing = RouterModule.forChild ([        
	{path:"", component: CArtcatsListPage, pathMatch: "full"},
	{path:"create", component: CArtcatsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CArtcatsEditPage},
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
		CArtcatsListPage,
		CArtcatsCreatePage,
		CArtcatsEditPage,
		CArtcatComponent,
	],
	providers: [
		CArtcatsListService,
	]   
})
export class CArtcatsModule { }
