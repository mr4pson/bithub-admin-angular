import { Component, OnInit } from '@angular/core';
import { CAppService } from 'src/app/services/app.service';
import { CAuthService } from 'src/app/services/auth.service';
import { CSomePage } from '../some.page';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class CHomePage extends CSomePage implements OnInit {
  isAnalyticsAvailable = this.group_id === 1 || this.group_id === 3;
  constructor(
    protected appService: CAppService,
    protected authService: CAuthService
  ) {
    super(appService);
  }

  get group_id(): number {
    return this.authService.authData.group_id;
  }

  public ngOnInit(): void {
    this.appService.setTitle(this.thelang.words['home-head']);
    this.appService.monitorLog('[home] page loaded');
  }
}
