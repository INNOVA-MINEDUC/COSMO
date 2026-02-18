import { Component, Optional, Inject } from '@angular/core';

import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { OrejimeService } from '../../../../app/shared/cookies/orejime.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { NotifyInfoService } from '../../../../app/core/coar-notify/notify-info/notify-info.service';
import { APP_CONFIG, AppConfig } from '../../../../config/app-config.interface';

/**
 * Footer component - Vacío para tema custom
 * El footer está completamente eliminado de este tema.
 */
@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html',
  standalone: true,
  imports: [],
})
export class FooterComponent extends BaseComponent {
  constructor(
    @Optional() public cookies: OrejimeService,
    protected authorizationService: AuthorizationDataService,
    protected notifyInfoService: NotifyInfoService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig
  ) {
    super(cookies, authorizationService, notifyInfoService, appConfig);
  }
}
