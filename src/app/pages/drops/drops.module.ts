import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CDropsListPage } from './pages/list/drops.list.page';
import { CDropsCreatePage } from './pages/create/drops.create.page';
import { CDropsEditPage } from './pages/edit/drops.edit.page';
import { CDropComponent } from './components/drop/drop.component';
import { CDropsListService } from './services/drops.list.service';

let routing = RouterModule.forChild ([
	{path:"", component: CDropsListPage, pathMatch: "full"},
	{path:"create", component: CDropsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CDropsEditPage},
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
		CDropsListPage,
		CDropsCreatePage,
		CDropsEditPage,
		CDropComponent,
	],
	providers: [
		CDropsListService,
	]
})
export class CDropsModule { }
