import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ForgotPasswordFormComponent as BaseComponent } from '../../../../../app/forgot-password/forgot-password-form/forgot-password-form.component';
import { ProfilePageSecurityFormComponent } from '../../../../../app/profile-page/profile-page-security-form/profile-page-security-form.component';
import { BtnDisabledDirective } from '../../../../../app/shared/btn-disabled.directive';
import { BrowserOnlyPipe } from '../../../../../app/shared/utils/browser-only.pipe';
import { getFirstCompletedRemoteData } from '../../../../../app/core/shared/operators';
import { RemoteData } from '../../../../../app/core/data/remote-data';
import { EPerson } from '../../../../../app/core/eperson/models/eperson.model';
import { EPersonDataService } from '../../../../../app/core/eperson/eperson-data.service';
import { NotificationsService } from '../../../../../app/shared/notifications/notifications.service';

@Component({
  selector: 'ds-themed-forgot-password-form',
  styleUrls: ['./forgot-password-form.component.scss'],
  // styleUrls: ['../../../../../app/forgot-password/forgot-password-form/forgot-password-form.component.scss'],
  templateUrl: './forgot-password-form.component.html',
  // templateUrl: '../../../../../app/forgot-password/forgot-password-form/forgot-password-form.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    BrowserOnlyPipe,
    BtnDisabledDirective,
    ProfilePageSecurityFormComponent,
    TranslateModule,
  ],
})
export class ForgotPasswordFormComponent extends BaseComponent {
  
  // Inject services needed for override
  private customRouter = inject(Router);
  private customEPersonDataService = inject(EPersonDataService);
  private customTranslateService = inject(TranslateService);
  private customNotificationsService = inject(NotificationsService);
  
  /**
   * Override submit to NOT auto-login after password change.
   * User should manually login with their new password.
   */
  override submit() {
    if (!this.isInValid) {
      this.customEPersonDataService.patchPasswordWithToken(this.user, this.token, this.password).pipe(
        getFirstCompletedRemoteData(),
      ).subscribe((response: RemoteData<EPerson>) => {
        if (response.hasSucceeded) {
          this.customNotificationsService.success(
            this.customTranslateService.instant(this.NOTIFICATIONS_PREFIX + '.success.title'),
            this.customTranslateService.instant(this.NOTIFICATIONS_PREFIX + '.success.content'),
          );
          // Redirect to login page instead of auto-login
          this.customRouter.navigate(['/login']);
        } else {
          this.customNotificationsService.error(
            this.customTranslateService.instant(this.NOTIFICATIONS_PREFIX + '.error.title'), 
            response.errorMessage,
          );
        }
      });
    }
  }
}
