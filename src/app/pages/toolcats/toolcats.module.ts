import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CToolcatsCreatePage } from './pages/create/toolcats.create.page';
import { CToolcatsEditPage } from './pages/edit/toolcats.edit.page';
import { CToolcatComponent } from './components/toolcat/toolcat.component';
import { CToolcatsListService } from './services/toolcats.list.service';
import { CToolcatsListPage } from './pages/list/toolcats.list.page';

let routing = RouterModule.forChild([
  { path: '', component: CToolcatsListPage, pathMatch: 'full' },
  { path: 'create', component: CToolcatsCreatePage, pathMatch: 'full' },
  { path: 'edit/:id', component: CToolcatsEditPage },
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
    CToolcatsListPage,
    CToolcatsCreatePage,
    CToolcatsEditPage,
    CToolcatComponent,
  ],
  providers: [CToolcatsListService],
})
export class CToolcatsModule {}
