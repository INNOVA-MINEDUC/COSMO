import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ThemedAdminSidebarComponent } from '../../../../app/admin/admin-sidebar/themed-admin-sidebar.component';
import { ThemedBreadcrumbsComponent } from '../../../../app/breadcrumbs/themed-breadcrumbs.component';
import { ThemedFooterComponent } from '../../../../app/footer/themed-footer.component';
import { ThemedHeaderNavbarWrapperComponent } from '../../../../app/header-nav-wrapper/themed-header-navbar-wrapper.component';
import { RootComponent as BaseComponent } from '../../../../app/root/root.component';
import { ThemeService } from '../../../../app/shared/theme-support/theme.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../../app/core/data/feature-authorization/feature-id';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { Router } from '@angular/router';
import { CSSVariableService } from '../../../../app/shared/sass-helper/css-variable.service';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { HostWindowService } from '../../../../app/shared/host-window.service';
import { NativeWindowRef, NativeWindowService } from '../../../../app/core/services/window.service';
import { slideSidebarPadding } from '../../../../app/shared/animations/slide';
import { LiveRegionComponent } from '../../../../app/shared/live-region/live-region.component';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { NotificationsBoardComponent } from '../../../../app/shared/notifications/notifications-board/notifications-board.component';
import { SystemWideAlertBannerComponent } from '../../../../app/system-wide-alert/alert-banner/system-wide-alert-banner.component';

@Component({
  selector: 'ds-themed-root',
  // styleUrls: ['./root.component.scss'],
  styleUrls: ['../../../../app/root/root.component.scss'],
  // templateUrl: './root.component.html',
  templateUrl: '../../../../app/root/root.component.html',
  animations: [slideSidebarPadding],
  standalone: true,
  imports: [
    AsyncPipe,
    LiveRegionComponent,
    NgClass,
    NotificationsBoardComponent,
    RouterOutlet,
    SystemWideAlertBannerComponent,
    ThemedAdminSidebarComponent,
    ThemedBreadcrumbsComponent,
    ThemedFooterComponent,
    ThemedHeaderNavbarWrapperComponent,
    ThemedLoadingComponent,
    TranslateModule,
  ],
})
export class RootComponent extends BaseComponent {
  constructor(
    router: Router,
    cssService: CSSVariableService,
    menuService: MenuService,
    windowService: HostWindowService,
    @Inject(NativeWindowService) _window: NativeWindowRef,
    protected themeService: ThemeService,
    protected authorizationService: AuthorizationDataService,
    protected authService: AuthService,
  ) {
    super(router, cssService, menuService, windowService, _window);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Listen for authentication + authorization changes and switch theme at runtime.
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      if (authenticated) {
        this.authorizationService.isAuthorized(FeatureID.AdministratorOf).subscribe((isAdmin: boolean) => {
          if (isAdmin) {
            this.themeService.setTheme('dspace');
          } else {
            this.themeService.setTheme('custom');
          }
        });
      } else {
        // anonymous user -> always use custom theme
        this.themeService.setTheme('custom');
      }
    });
  }
}
