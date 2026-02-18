import {
  AsyncPipe,
  isPlatformBrowser,
  NgClass,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../config/app-config.interface';
import { environment } from '../../../../../environments/environment';
import {
  SortDirection,
  SortOptions,
} from '../../../../../app/core/cache/models/sort-options.model';
import { PaginatedList } from '../../../../../app/core/data/paginated-list.model';
import { RemoteData } from '../../../../../app/core/data/remote-data';
import { PaginationService } from '../../../../../app/core/pagination/pagination.service';
import { DSpaceObjectType } from '../../../../../app/core/shared/dspace-object-type.model';
import { Item } from '../../../../../app/core/shared/item.model';
import { toDSpaceObjectListRD } from '../../../../../app/core/shared/operators';
import { SearchService } from '../../../../../app/core/shared/search/search.service';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';
import { ViewMode } from '../../../../../app/core/shared/view-mode.model';
import {
  fadeIn,
  fadeInOut,
} from '../../../../../app/shared/animations/fade';
import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ListableObjectComponentLoaderComponent } from '../../../../../app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { PaginationComponentOptions } from '../../../../../app/shared/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from '../../../../../app/shared/search/models/paginated-search-options.model';
import {
  followLink,
  FollowLinkConfig,
} from '../../../../../app/shared/utils/follow-link-config.model';
import { setPlaceHolderAttributes } from '../../../../../app/shared/utils/object-list-utils';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';
import { RecentItemListComponent as BaseComponent } from '../../../../../app/home-page/recent-item-list/recent-item-list.component';

@Component({
  selector: 'ds-themed-recent-item-list',
  templateUrl: './recent-item-list.component.html',
  styleUrls: ['./recent-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut,
  ],
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorComponent,
    ListableObjectComponentLoaderComponent,
    NgClass,
    ThemedLoadingComponent,
    TranslateModule,
    VarDirective,
  ],
})
export class RecentItemListComponent extends BaseComponent {
}
