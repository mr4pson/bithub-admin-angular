import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CComponentsModule } from 'src/app/components/components.module';
import { CDirectivesModule } from 'src/app/directives/directives.module';
import { CWithdrawalsListPage } from './pages/list/withdrawals.list.page';
import { CWithdrawalsEditPage } from './pages/edit/withdrawals.edit.page';
import { CWithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { CWithdrawordersListService } from './services/withdraworders.list.service';

let routing = RouterModule.forChild([
  { path: '', component: CWithdrawalsListPage, pathMatch: 'full' },
  { path: 'edit/:id', component: CWithdrawalsEditPage },
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
    CWithdrawalsListPage,
    CWithdrawalsEditPage,
    CWithdrawalComponent,
  ],
  providers: [CWithdrawordersListService],
})
export class CWithdrawalModule {}
