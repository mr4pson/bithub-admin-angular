import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { CMailing } from "src/app/model/entities/mailing";
import { CAppService } from "src/app/services/app.service";
import { CMailingRepository } from "src/app/services/repositories/mailing.repository";

@Component({
    selector: "mailing-status",
    templateUrl: "mailing-status.component.html",
})
export class CMailingStatusComponent implements OnInit, OnDestroy {
    @Input() public mailing: CMailing;
    private interval: number = null;

    constructor(
        private mailingRepository: CMailingRepository,
        private appService: CAppService,
    ) {}

    ngOnInit(): void {
        this.interval = window.setInterval(() => this.loadMailing(), 500);
    }

    ngOnDestroy(): void {
        window.clearInterval(this.interval);
    }

    private async loadMailing(): Promise<void> {
        try {
            const mailing = await this.mailingRepository.loadOneShort(this.mailing.id);
            this.mailing.status = mailing.status;
            this.mailing.running_status = mailing.running_status;
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
        }
    }
}