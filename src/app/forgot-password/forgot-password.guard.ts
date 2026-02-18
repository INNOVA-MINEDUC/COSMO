import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EpersonRegistrationService } from '../core/data/eperson-registration.service';
import { getFirstCompletedRemoteData } from '../core/shared/operators';
import { getPageNotFoundRoute } from '../app-routing-paths';

/**
 * A guard for forgot-password that handles token validation without redirecting to login
 * When token is invalid/expired, redirects to 404 page instead of login
 */
export const forgotPasswordGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  epersonRegistrationService: EpersonRegistrationService = inject(EpersonRegistrationService),
  router: Router = inject(Router),
): Observable<boolean> => {
  const token = route.params.token;
  return epersonRegistrationService.searchByTokenAndUpdateData(token).pipe(
    getFirstCompletedRemoteData(),
    map((rd) => {
      if (rd.hasFailed) {
        // Token inválido o expirado - redirigir a página de error, NO al login
        router.navigateByUrl(getPageNotFoundRoute(), { skipLocationChange: true });
        return false;
      }
      // Token válido - agregar a los datos de la ruta y continuar
      route.data = { ...route.data, registration: rd };
      return rd.hasSucceeded;
    }),
  );
};
