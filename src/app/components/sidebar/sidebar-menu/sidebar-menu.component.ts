import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Timeout } from 'src/app/decorators/timeout';
import { CAppService } from 'src/app/services/app.service';
import { IThelang } from 'src/app/model/entities/thelang';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sidebar-menu',
  templateUrl: 'sidebar-menu.component.html',
  styleUrls: ['sidebar-menu.component.scss'],
})
export class CSidebarMenuComponent implements AfterViewInit {
  public subActive = {
    localization: false,
    catalogue: false,
    finances: false,
    education: false,
    shop: false,
    misc: false,
  };
  get isAllowed() {
    return this.authService.admin.group_id !== 3;
  }

  constructor(
    private appService: CAppService,
    private authService: CAuthService,
    private router: Router
  ) {}

  get thelang(): IThelang {
    return this.appService.thelang;
  }
  get url(): string[] {
    return this.appService.url;
  }
  get group_id(): number {
    return this.authService.authData.group_id;
  }

  public ngAfterViewInit(): void {
    document
      .querySelectorAll('.sbn-items a:not(.expandable)')
      .forEach((element) =>
        element.addEventListener(
          'click',
          () =>
            window.innerWidth < 1000 && (this.appService.sidebarActive = false)
        )
      );
    this.initSub();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.initSub());
  }

  @Timeout(1)
  private initSub(): void {
    for (let field in this.subActive) {
      this.subActive[field] = this.url[1] === field;
    }
  }

  public toggleSub(name: string): void {
    this.subActive[name] = !this.subActive[name];
  }
}
