import { Component, OnInit } from '@angular/core';
import { CAppService } from 'src/app/services/app.service';
import { CStatRepository } from 'src/app/services/repositories/stat.repository';
import { IThelang } from 'src/app/model/entities/thelang';
import { MonthData } from 'src/app/model/entities/stats/stat.users.monthly.interface';

@Component({
  selector: 'stats-users-monthly',
  templateUrl: 'stats.users.monthly.component.html',
  styleUrls: ['../../../styles/graphs.scss'],
})
export class CStatsUsersMonthlyComponent implements OnInit {
  public users: MonthData[] = [];
  public supers: MonthData[] = [];
  public subs: MonthData[] = [];
  // public years: number[] = [];
  public filter = {} as { from: Date; to: Date };
  public months: number[] = [];
  public max: number = null;
  public usersRegCount = 0;
  public supersRegCount = 0;
  public subsRegCount = 0;
  public overallRegCount = 0;

  constructor(
    private statsRepository: CStatRepository,
    private appService: CAppService
  ) {}

  get thelang(): IThelang {
    return this.appService.thelang;
  }

  public ngOnInit(): void {
    this.initDates();
    this.initStats();
  }

  private initDates(): void {
    const now = new Date();
    const year = now.getFullYear();
    const startDate = new Date(`${year}-01-01`);
    this.filter = {
      from: startDate,
      to: new Date(),
    };
    this.months = this.appService.range(1, 12);
  }

  public async initStats(): Promise<void> {
    try {
      this.reset();
      await this.appService.pause(100);
      const data = await this.statsRepository.loadUsersMonthly({
        from: this.filter.from.valueOf().toString(),
        to: this.filter.to.valueOf().toString(),
      });
      this.users = data.users;
      this.supers = data.supers;
      this.subs = data.subs;

      this.usersRegCount = this.users.reduce(
        (acc, user) => acc + user.value,
        0
      );
      this.supersRegCount = this.supers.reduce(
        (acc, user) => acc + user.value,
        0
      );
      this.subsRegCount = this.subs.reduce((acc, user) => acc + user.value, 0);
      this.overallRegCount =
        this.usersRegCount + this.supersRegCount + this.subsRegCount;

      this.max = Math.max(...this.users.map((user) => user.value));
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  private reset(): void {
    // this.initDates();
    // this.initStats();
  }

  public height(x: MonthData): string {
    if (this.appService.isEmpty(x?.value)) return '0';
    return this.max ? `${(100 * x?.value) / this.max}%` : '0';
  }

  public color(index: number): string {
    return this.appService.contrastColor(index);
  }
}
