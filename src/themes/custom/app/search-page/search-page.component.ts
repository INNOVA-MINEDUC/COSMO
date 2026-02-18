import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';

import { AuthService } from '../../../../app/core/auth/auth.service';
import { SearchConfigurationService } from '../../../../app/core/shared/search/search-configuration.service';
import { SearchPageComponent as BaseComponent } from '../../../../app/search-page/search-page.component';
import { ThemedSearchComponent } from '../../../../app/shared/search/themed-search.component';
import { ThemedAuthNavMenuComponent } from '../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { EPerson } from '../../../../app/core/eperson/models/eperson.model';

@Component({
  selector: 'ds-themed-search-page',
  styleUrls: ['./search-page.component.scss'],
  templateUrl: './search-page.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService,
    },
  ],
  standalone: true,
  imports: [
    ThemedSearchComponent,
    RouterLink,
    ThemedAuthNavMenuComponent,
    AsyncPipe,
    NgIf,
  ],
})
export class SearchPageComponent extends BaseComponent {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<EPerson>;

  constructor(private authService: AuthService) {
    super();
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getAuthenticatedUserFromStore();
  }
}
