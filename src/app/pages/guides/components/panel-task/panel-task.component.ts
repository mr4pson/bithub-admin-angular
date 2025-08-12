import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from "@angular/core";
import { CPanelComponent } from "src/app/components/panels/panel.component";
import { CLang } from "src/app/model/entities/lang";
import { CTask } from "src/app/model/entities/task";
import { IKeyValue } from "src/app/model/keyvalue.interface";

@Component({
    selector: "panel-task",
    templateUrl: "panel-task.component.html",
    styleUrls: [
        "../../../../styles/panels.scss",
        "../../../../styles/forms.scss",
        "panel-task.component.scss",
    ],
})
export class CPanelTaskComponent extends CPanelComponent implements OnChanges {
    @Input() public x: CTask = null;
    @Input() public ll: CLang[] = [];
    @Output() private apply: EventEmitter<void> = new EventEmitter();
    public requiredFields: string[] = ["name", "content", "yt_content"];
    public selectedLang: CLang = null;
    public errors: IKeyValue<string> = {};

    public ngOnChanges(): void {
        if (this.ll?.length) {
            this.selectedLang = this.ll[0];
        }
    }

    public onClose(): void {
        window.confirm(this.thelang.words["common-sure2"]) && this.activeChange.emit(false);
    }

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }

    public onApply(): void {
        if (this.validate()) {
            this.apply.emit();
            this.activeChange.emit(false);
            this.selectedLang = this.ll[0];
        }
    }

    public validate(): boolean {
        let error = false;
        this.errors.name = null;
        this.errors.content = null;
        this.errors.yt_content = null;

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}


        if (this.x.contenttype === "html") {
            for (let t of this.x.translations) {
                if (!t.content) {
                    this.errors.content = "common-error-required-ml";
                    error = true;
                    break;
                }
            }
        }

        if (this.x.contenttype === "yt" && !this.x.yt_content) {
            this.errors.yt_content = "common-error-required";
            error = true;
        }

        return !error;
    }
}
