import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { CPanelComponent } from 'src/app/components/panels/panel.component';
import { CLang } from 'src/app/model/entities/lang';
import { CTask } from 'src/app/model/entities/task';
import { IKeyValue } from 'src/app/model/keyvalue.interface';
import { CAppService } from 'src/app/services/app.service';

@Component({
  selector: 'panel-task',
  templateUrl: 'panel-task.component.html',
  styleUrls: [
    '../../../../styles/panels.scss',
    '../../../../styles/forms.scss',
    'panel-task.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPanelTaskComponent
  extends CPanelComponent
  implements OnChanges, AfterViewInit
{
  @Input() public x: CTask = null;
  @Input() public ll: CLang[] = [];
  @Output() private apply: EventEmitter<void> = new EventEmitter();
  @ViewChild('pright', { static: false }) prightEl: ElementRef;

  public requiredFields: string[] = ['name', 'content', 'yt_content'];
  public selectedLang: CLang = null;
  public errors: IKeyValue<string> = {};

  // New properties for resizing
  public rightWidth: number = 600; // default initial width (px)
  public rightHeight: number = 600; // default initial height (px)
  public resizing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private startWidth: number = 0;
  private startHeight: number = 0;
  private minWidth: number = 300;
  private minHeight: number = 200;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    protected appService: CAppService
  ) {
    super(appService);
  }

  public ngOnChanges(): void {
    if (this.ll?.length) {
      this.selectedLang = this.ll[0];
    }
  }

  public ngAfterViewInit(): void {
    // Попытка взять реальные размеры из DOM, если элемент уже отрисован
    try {
      const el = this.prightEl?.nativeElement;
      if (el) {
        this.rightWidth = el.offsetWidth || this.rightWidth;
        this.rightHeight = el.offsetHeight || this.rightHeight;
      }
    } catch (e) {
      // ignore
    }
  }

  // Start resizing (attached to mousedown on corner resizer only)
  public startResize(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.resizing = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startWidth = this.rightWidth;
    this.startHeight = this.rightHeight;
    document.body.classList.add('resizing');

    // Prevent click event from firing during resize
    document.addEventListener('click', this.preventClickDuringResize, true);
  }

  private preventClickDuringResize = (e: Event) => {
    if (this.resizing) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e: MouseEvent): void {
    if (!this.resizing) {
      return;
    }
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    // corner resize: moving right increases width, moving down increases height
    const newW = Math.max(this.minWidth, Math.round(this.startWidth + dx));
    const newH = Math.max(this.minHeight, Math.round(this.startHeight + dy));
    this.rightWidth = newW;
    this.rightHeight = newH;

    // Direct DOM manipulation for instant visual feedback (no Angular change detection)
    if (this.prightEl?.nativeElement) {
      this.renderer.setStyle(this.prightEl.nativeElement, 'width', newW + 'px');
      this.renderer.setStyle(
        this.prightEl.nativeElement,
        'height',
        newH + 'px'
      );
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onMouseUp(_: MouseEvent): void {
    if (!this.resizing) {
      return;
    }

    setTimeout(() => {
      this.resizing = false;
      document.body.classList.remove('resizing');
    }, 100);

    // Remove the click prevention listener
    document.removeEventListener('click', this.preventClickDuringResize, true);
  }

  // Don't close while resizing via clickOutside or close button accidental propagation
  public onClose(e: any = undefined): void {
    if (this.resizing) {
      // игнорируем закрытие во время ресайза
      return;
    }
    if (e) {
      e.preventDefault();
    }
    if (window.confirm(this.thelang.words['common-sure2'])) {
      this.activeChange.emit(false);
    }
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
        this.errors.name = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    if (this.x.contenttype === 'html') {
      for (let t of this.x.translations) {
        if (!t.content) {
          this.errors.content = 'common-error-required-ml';
          error = true;
          break;
        }
      }
    }

    if (this.x.contenttype === 'yt' && !this.x.yt_content) {
      this.errors.yt_content = 'common-error-required';
      error = true;
    }

    return !error;
  }
}
