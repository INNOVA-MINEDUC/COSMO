import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { BreadcrumbsService } from '../../../../../app/breadcrumbs/breadcrumbs.service';
import { Breadcrumb } from '../../../../../app/breadcrumbs/breadcrumb/breadcrumb.model';
import { AuthService } from '../../../../../app/core/auth/auth.service';
import { EPerson } from '../../../../../app/core/eperson/models/eperson.model';

import { ThemedItemAlertsComponent } from '../../../../../app/item-page/alerts/themed-item-alerts.component';
import { AccessByTokenNotificationComponent } from '../../../../../app/item-page/simple/access-by-token-notification/access-by-token-notification.component';
import { ItemPageComponent as BaseComponent } from '../../../../../app/item-page/simple/item-page.component';
import { NotifyRequestsStatusComponent } from '../../../../../app/item-page/simple/notify-requests-status/notify-requests-status-component/notify-requests-status.component';
import { QaEventNotificationComponent } from '../../../../../app/item-page/simple/qa-event-notification/qa-event-notification.component';
import { ItemVersionsComponent } from '../../../../../app/item-page/versions/item-versions.component';
import { ItemVersionsNoticeComponent } from '../../../../../app/item-page/versions/notice/item-versions-notice.component';
import { fadeInOut } from '../../../../../app/shared/animations/fade';
import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ListableObjectComponentLoaderComponent } from '../../../../../app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-item-page',
  styleUrls: ['./item-page.component.scss'],
  templateUrl: './item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
  standalone: true,
  imports: [
    AccessByTokenNotificationComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    ErrorComponent,
    ItemVersionsComponent,
    ItemVersionsNoticeComponent,
    ListableObjectComponentLoaderComponent,
    NotifyRequestsStatusComponent,
    QaEventNotificationComponent,
    ThemedItemAlertsComponent,
    ThemedLoadingComponent,
    TranslateModule,
    VarDirective,
    RouterLink,
  ],
})
export class ItemPageComponent extends BaseComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<EPerson>;
  
  private breadcrumbsService = inject(BreadcrumbsService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    super.ngOnInit();
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getAuthenticatedUserFromStore();
  }
}
