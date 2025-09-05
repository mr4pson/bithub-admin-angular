import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CAppService } from 'src/app/services/app.service';
import { CRepository } from 'src/app/services/repositories/_repository';
import { IThelang } from 'src/app/model/entities/thelang';
import { CTranslatableEntity } from 'src/app/model/entities/_translatable.entity';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CAdminGroupRepository } from 'src/app/services/repositories/admin.group.repository';
import { CPageRepository } from 'src/app/services/repositories/page.repository';
import { CCatRepository } from 'src/app/services/repositories/cat.repository';
import { CLinktypeRepository } from 'src/app/services/repositories/linktype.repository';
import { CUserRepository } from 'src/app/services/repositories/user.repository';
import { CArtcatRepository } from 'src/app/services/repositories/artcat.repository';
import { CGuideRepository } from 'src/app/services/repositories/guide.repository';
import { CShopcatRepository } from 'src/app/services/repositories/shopcat.repository';
import { CShopitemRepository } from 'src/app/services/repositories/shopitem.repository';
import { AVAILABLE_FOR_LIST, GUIDE_TYPES } from './constants';

@Component({
  selector: 'select-simple',
  templateUrl: 'select-simple.component.html',
  styleUrls: ['select-simple.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CSelectSimpleComponent implements OnInit, OnChanges {
  @Input() public value: number;
  @Input() public field: string;
  @Input() public sortBy: string = 'id';
  @Input() public entity: string = null;
  @Input() public filter: any = {};
  @Input() public useSearch: boolean = false;
  @Input() public useUndefined: boolean = false;
  @Input() public useNull: boolean = false;
  @Input() public multilang: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public cantSelectByArray: number[] = []; // array of ids that can't be selected
  @Input() public cantSelectByField: string = undefined; // if !item[cantSelectByField] then item can't be selected
  @Input() public error: boolean = false;
  @Output() private valueChange: EventEmitter<number> = new EventEmitter();

  @ViewChild('btnelement', { static: false }) private btnElementRef: ElementRef;
  @ViewChild('sitemselement', { static: false })
  private sitemsElementRef: ElementRef;

  // title of selected item
  public title: string = '';
  // selectable items
  public sitems: CTranslatableEntity<any>[] = [];
  public sitemsSearch: string = '';
  public sitemsLoadingMore: boolean = false;
  private sitemsPart: number = 0;
  private sitemsChunkLength: number = 20;
  private sitemsExhausted: boolean = false;
  public sitemsReady: boolean = false;
  // menu
  public menuTop: string = '';
  public menuLeft: string = '';
  public menuWidth: string = '';
  private menuListHeight: number = 210;
  private menuSearchHeight: number = 60;
  public menuActive: boolean = false;

  constructor(
    private appService: CAppService,
    private langRepository: CLangRepository,
    private adminGroupRepository: CAdminGroupRepository,
    private pageRepository: CPageRepository,
    private catRepository: CCatRepository,
    private linktypeRepository: CLinktypeRepository,
    private userRepository: CUserRepository,
    private artcatRepository: CArtcatRepository,
    private guideRepository: CGuideRepository,
    private shopcatRepository: CShopcatRepository,
    private shopitemRepository: CShopitemRepository // private someRepository: SomeRepository, - any compatible repo
  ) {}

  get thelang(): IThelang {
    return this.appService.thelang;
  }
  get btnElement(): HTMLElement {
    return this.btnElementRef?.nativeElement;
  }
  get menuHeight(): number {
    return this.menuListHeight + (this.useSearch ? this.menuSearchHeight : 0);
  }
  get sitemsElement(): HTMLElement {
    return this.sitemsElementRef?.nativeElement;
  }
  get sitemsCanLoadMore(): boolean {
    return (
      !this.sitemsLoadingMore &&
      !this.sitemsExhausted &&
      this.sitemsScrolledToBottom
    );
  }
  get sitemsScrolledToBottom(): boolean {
    return (
      this.sitemsElement.scrollHeight - this.sitemsElement.scrollTop <
      this.sitemsElement.clientHeight + 50
    );
  }
  get sitemsFilter(): any {
    const filter = { ...this.filter };
    filter.search = this.sitemsSearch;
    return filter;
  }
  get sitemsRepository(): CRepository<CTranslatableEntity<any>> {
    return this[`${this.entity}Repository`];
  }

  public ngOnInit(): void {
    this.initSelectableItems();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.initTitle();
  }

  private async initTitle(): Promise<void> {
    try {
      if (this.value === undefined) {
        this.title = this.thelang.words['common-any'];
      } else if (this.value === null) {
        this.title = this.thelang.words['common-empty2'];
      } else {
        let sitem: CTranslatableEntity<any>;

        switch (this.entity) {
          case 'guide_type':
            sitem = GUIDE_TYPES.find(
              (type) =>
                type.id === this.value ||
                type.translations[0].type === this.value
            );
            break;
          case 'available_for':
            sitem = AVAILABLE_FOR_LIST.find(
              (type) =>
                type.id === this.value ||
                type.translations[0].type === this.value
            );
            break;

          default:
            sitem = await this.sitemsRepository.loadOne(this.value);
            break;
        }

        if (sitem) {
          const fieldText = this.field
            ? ` - ${
                this.multilang
                  ? sitem.translation(1)[this.field]
                  : sitem[this.field]
              }`
            : '';
          this.title = `${sitem.id}${fieldText}`;
        } else {
          this.title = '';
        }
      }
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  public async initSelectableItems(): Promise<void> {
    try {
      this.sitemsReady = false;
      this.sitems = [];
      this.sitemsPart = 0;

      if (this.entity === 'guide_type') {
        this.sitems = GUIDE_TYPES;
        this.sitemsReady = true;
        this.sitemsExhausted = false;

        return;
      }

      if (this.entity === 'available_for') {
        this.sitems = AVAILABLE_FOR_LIST;
        this.sitemsReady = true;
        this.sitemsExhausted = false;

        return;
      }

      const chunk = await this.sitemsRepository.loadChunk(
        this.sitemsPart,
        this.sitemsChunkLength,
        this.sortBy,
        1,
        this.sitemsFilter
      );
      this.sitems = chunk.data;

      this.sitemsExhausted =
        !chunk.elementsQuantity || this.sitemsPart + 1 === chunk.pagesQuantity;
      this.sitemsReady = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  public async menuOnActivate(): Promise<void> {
    const btnLeft = this.btnElement.getBoundingClientRect().left;
    const btnRight = this.btnElement.getBoundingClientRect().right;
    const btnTop = this.btnElement.getBoundingClientRect().top;
    const btnBottom = this.btnElement.getBoundingClientRect().bottom;
    this.menuLeft = `${btnLeft}px`;
    // если нижний край блока не влазит, и при приклеивании к верхнему краю кнопки верхний край блока будет вылазить за верхнюю границу экрана меньше, чем нижний при приклеивании к нижнему, то приклеиваем к верхнему краю, иначе - к нижнему
    this.menuTop =
      btnBottom + this.menuHeight + 2 > window.innerHeight &&
      btnTop - this.menuHeight - 2 >
        window.innerHeight - (btnBottom + this.menuHeight + 2)
        ? `${btnTop - this.menuHeight - 2}px`
        : `${btnBottom + 2}px`;
    this.menuWidth = `${this.btnElement.offsetWidth}px`;
    this.menuActive = true;
  }

  public async sitemsOnScroll(): Promise<void> {
    try {
      if (this.sitemsCanLoadMore) {
        this.sitemsLoadingMore = true;
        this.sitemsPart++;
        const chunk = await this.sitemsRepository.loadChunk(
          this.sitemsPart,
          this.sitemsChunkLength,
          this.sortBy,
          1,
          this.sitemsFilter
        );
        this.sitems = [...this.sitems, ...chunk.data];
        this.sitemsExhausted =
          !chunk.elementsQuantity ||
          this.sitemsPart + 1 === chunk.pagesQuantity;
        this.sitemsLoadingMore = false;
      }
    } catch (err) {
      this.sitemsLoadingMore = false;
      this.appService.monitorLog(err, true);
    }
  }

  public sitemsOnSelect(sitem: CTranslatableEntity<any>): void {
    if (sitem === undefined) {
      this.title = this.thelang.words['common-any'];
      this.valueChange.emit(undefined);
    } else if (sitem === null) {
      this.title = this.thelang.words['common-empty2'];
      this.valueChange.emit(null);
    } else {
      const fieldText = this.field
        ? ` - ${
            this.multilang
              ? sitem.translation(1)[this.field]
              : sitem[this.field]
          }`
        : '';
      this.title = `${sitem.id}${fieldText}`;
      this.valueChange.emit(sitem.id);
    }

    this.menuActive = false;
  }

  public sitemContent(sitem: CTranslatableEntity<any>): string {
    const fieldText = this.field
      ? ` - ${
          this.multilang ? sitem.translation(1)[this.field] : sitem[this.field]
        }`
      : '';
    return `${sitem.__shift}${sitem.id}${fieldText}`;
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.menuActive ? (this.menuActive = false) : null;
  }
}
