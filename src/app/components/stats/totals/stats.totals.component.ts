import { Component, Input, OnInit } from "@angular/core";
import { IStatTotals } from "src/app/model/entities/stats/stat.totals.interface";
import { IThelang } from "src/app/model/entities/thelang";
import { CAppService } from "src/app/services/app.service";
import { CStatRepository } from "src/app/services/repositories/stat.repository";

@Component({
    selector: "stats-totals",
    templateUrl: "stats.totals.component.html",
    styleUrls: ["stats.totals.component.scss"],
})
export class CStatsTotalsComponent implements OnInit {
    @Input() showAmount: boolean = true;
    public data: IStatTotals = {users: 0, supers: 0, subs: 0, inorders_q: 0, inorders_amount: 0, guides: 0, tasks: 0};

    constructor(
        private statsRepository: CStatRepository,
        private appService: CAppService,
    ) {}

    get thelang(): IThelang {return this.appService.thelang;}     

    public ngOnInit(): void {
        this.initStats();
    }

    private async initStats(): Promise<void> {
        try {
            this.data = await this.statsRepository.loadTotals();
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}