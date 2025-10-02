import { Component } from '@angular/core';
import { CWithdraworder } from 'src/app/model/entities/withdraworder';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
  selector: 'the-withdrawal',
  templateUrl: './withdrawal.component.html',
})
export class CWithdrawalComponent extends CEntityComponent<CWithdraworder> {}
