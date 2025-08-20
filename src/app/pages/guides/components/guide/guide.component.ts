import { Component } from '@angular/core';
import { GUIDE_TYPES } from 'src/app/components/selects/select-simple/constants';
import { CGuide } from 'src/app/model/entities/guide';
import { CTask } from 'src/app/model/entities/task';
import { GuideTypes } from 'src/app/model/guide-type.enum';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
  selector: 'the-guide',
  templateUrl: './guide.component.html',
})
export class CGuideComponent extends CEntityComponent<CGuide> {
  // links
  public linksSortBy: string = 'pos';
  public linksSortDir: number = 1;
  public limitAfterAuthGuideType = GuideTypes.LimitAfterAuthAvailable;

  public linksChangeSorting(linksSortBy): void {
    if (linksSortBy === this.linksSortBy) {
      this.linksSortDir *= -1;
    } else {
      this.linksSortBy = linksSortBy;
      this.linksSortDir = 1;
    }

    this.appService.sort(this.x.links, this.linksSortBy, this.linksSortDir);
  }

  public linksDelete(i: number): void {
    confirm(this.thelang.words['common-sure']) && this.x.links.splice(i, 1);
  }

  public linksCreate(): void {
    const pos = this.x.links.length
      ? Math.max(...this.x.links.map((w) => w.pos)) + 1
      : 0;
    this.x.links.push({ linktype_id: null, value: '', pos });
    this.appService.sort(this.x.links, this.linksSortBy, this.linksSortDir);
  }

  // tasks
  public task: CTask = null;
  public taskPanelActive: boolean = false;
  private taskPanelMode: 'create' | 'edit' = null;
  private taskToEditIndex: number = null;
  public tasksSortBy: string = 'pos';
  public tasksSortDir: number = 1;

  public tasksChangeSorting(tasksSortBy): void {
    if (tasksSortBy === this.tasksSortBy) {
      this.tasksSortDir *= -1;
    } else {
      this.tasksSortBy = tasksSortBy;
      this.tasksSortDir = 1;
    }

    this.appService.sort(this.x.tasks, this.tasksSortBy, this.tasksSortDir);
  }

  public tasksDelete(i: number): void {
    confirm(this.thelang.words['common-sure']) && this.x.tasks.splice(i, 1);
  }

  public tasksEdit(i: number): void {
    this.taskPanelMode = 'edit';
    this.taskToEditIndex = i;
    this.task = new CTask().build(this.x.tasks[i]);
    this.taskPanelActive = true;
  }

  public tasksCreate(): void {
    this.taskPanelMode = 'create';
    this.task = new CTask().init(this.ll);
    this.taskPanelActive = true;
  }

  public tasksOnApply(): void {
    const task = new CTask().build(this.task);
    this.taskPanelMode === 'edit'
      ? (this.x.tasks[this.taskToEditIndex] = task)
      : this.x.tasks.push(task);
    this.appService.sort(this.x.tasks, this.tasksSortBy, this.tasksSortDir);
  }
}
