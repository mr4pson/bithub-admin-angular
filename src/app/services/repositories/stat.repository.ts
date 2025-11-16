import { Injectable } from '@angular/core';
import { CDataService } from '../data.service';
import { IStatUsersMonthly } from 'src/app/model/entities/stats/stat.users.monthly.interface';
import { IStatCats } from 'src/app/model/entities/stats/stat.cats.interface';
import { IStatTotals } from 'src/app/model/entities/stats/stat.totals.interface';
import { IStatMonthlyData } from 'src/app/model/entities/stats/stat.month.data';

@Injectable()
export class CStatRepository {
  constructor(protected dataService: CDataService) {}

  public loadUsersMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatUsersMonthly> {
    return new Promise((resolve, reject) =>
      this.dataService.statsUsersMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadMauMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsMauMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadSubscribersMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsSubscribersMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadAvgSubPriceMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsAvgSubPriceMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadSubsriptionProfitMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsSubcriptionProfitMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadClientsMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsClientsMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadShopordersRevenueMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsShopordersRevenueMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadShopordersProfitMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsShopordersProfitMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadAvgClientsOrderPriceMonthly(payload: {
    from: string;
    to: string;
  }): Promise<IStatMonthlyData> {
    return new Promise((resolve, reject) =>
      this.dataService.statsAvgClientsOrderPriceMonthly(payload).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadCats(): Promise<IStatCats> {
    return new Promise((resolve, reject) =>
      this.dataService.statsCats().subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadInordersMonthly(year: number): Promise<number[]> {
    return new Promise((resolve, reject) =>
      this.dataService.statsInordersMonthly(year).subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadTotals(): Promise<IStatTotals> {
    return new Promise((resolve, reject) =>
      this.dataService.statsTotals().subscribe({
        next: (res) =>
          res.statusCode === 200 ? resolve(res.data) : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }
}
