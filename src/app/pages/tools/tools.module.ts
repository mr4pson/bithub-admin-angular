import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CToolsListPage } from './pages/list/tools.list.page';
import { CToolsCreatePage } from './pages/create/tools.create.page';
import { CToolsEditPage } from './pages/edit/tools.edit.page';
import { CToolComponent } from './components/tool/tool.component';
import { CToolsListService } from './services/tools.list.service';

let routing = RouterModule.forChild([
  { path: '', component: CToolsListPage, pathMatch: 'full' },
  { path: 'create', component: CToolsCreatePage, pathMatch: 'full' },
  { path: 'edit/:id', component: CToolsEditPage },
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
    CToolsListPage,
    CToolsCreatePage,
    CToolsEditPage,
    CToolComponent,
  ],
  providers: [CToolsListService],
})
export class CToolsModule {}
