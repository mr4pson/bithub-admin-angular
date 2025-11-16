import { Component, OnInit } from '@angular/core';
import { MonthData } from 'src/app/model/entities/stats/stat.month.data';
import { IThelang } from 'src/app/model/entities/thelang';
import { CAppService } from 'src/app/services/app.service';
import { CStatRepository } from 'src/app/services/repositories/stat.repository';

@Component({
  selector: 'stats-shoporders-profit-monthly',
  templateUrl: 'shoporders-profit-monthly.component.html',
  styleUrls: ['../../../styles/graphs.scss'],
})
export class CStatsShopordersProfitMonthlyComponent implements OnInit {
  public data: MonthData[] = [];
  public filter = {} as { from: Date; to: Date };
  public max: number = null;
  public sum = 0;

  constructor(
    private statsRepository: CStatRepository,
    private appService: CAppService
  ) {}

  get thelang(): IThelang {
    return this.appService.thelang;
  }

  getRoundedValue(value: number) {
    return Math.round(value);
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
  }

  public async initStats(): Promise<void> {
    try {
      this.reset();
      await this.appService.pause(100);
      const data = await this.statsRepository.loadShopordersProfitMonthly({
        from: this.filter.from.valueOf().toString(),
        to: this.filter.to.valueOf().toString(),
      });
      this.data = data.months;

      this.sum = this.data.reduce((acc, monthItem) => acc + monthItem.value, 0);

      this.max = Math.max(...this.data.map((monthItem) => monthItem.value));
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
