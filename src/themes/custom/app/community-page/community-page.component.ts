import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, UpperCasePipe } from '@angular/common'; // Agregamos UpperCasePipe
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs'; // Importamos 'of' para casos nulos
import { map, mergeMap, catchError } from 'rxjs/operators'; // Importamos catchError
import { TranslateModule } from '@ngx-translate/core';

// Imports de DSpace Core
import { Community } from '../../../../app/core/shared/community.model';
import { Collection } from '../../../../app/core/shared/collection.model';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../app/core/data/paginated-list.model';
import { getAllSucceededRemoteData, getRemoteDataPayload } from '../../../../app/core/shared/operators';
import { BreadcrumbsService } from '../../../../app/breadcrumbs/breadcrumbs.service';
import { Breadcrumb } from '../../../../app/breadcrumbs/breadcrumb/breadcrumb.model';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { EPerson } from '../../../../app/core/eperson/models/eperson.model';

@Component({
  selector: 'ds-community-page',
  styleUrls: ['./community-page.component.scss'],
  templateUrl: './community-page.component.html',
  standalone: true,
  imports: [
    AsyncPipe, 
    NgIf, 
    NgFor, 
    RouterLink,
    UpperCasePipe, // Necesario para el pipe | uppercase en el HTML
    TranslateModule
  ]
})
export class CommunityPageComponent implements OnInit {

  // 1. Datos de la Comunidad Actual
  communityRD$: Observable<RemoteData<Community>>;

  // 2. Listas para los botones de navegación (Hijos)
  subCommunities$: Observable<RemoteData<PaginatedList<Community>>>;
  collections$: Observable<RemoteData<PaginatedList<Collection>>>;

  // 3. Breadcrumbs para la navegación completa
  breadcrumbs$: Observable<Breadcrumb[]>;
  
  // 4. Padre (para botón Volver)
  parentCommunity$: Observable<Community>;

  // 5. Autenticación
  isAuthenticated$: Observable<boolean>;
  user$: Observable<EPerson>;

  private route = inject(ActivatedRoute);
  private breadcrumbsService = inject(BreadcrumbsService);
  private authSvc = inject(AuthService);

  ngOnInit(): void {
    // Configurar autenticación
    this.isAuthenticated$ = this.authSvc.isAuthenticated();
    this.user$ = this.authSvc.getAuthenticatedUserFromStore();
    
    // A. Obtenemos la comunidad actual
    this.communityRD$ = this.route.data.pipe(
      map((data) => data.dso as RemoteData<Community>)
    );

    // B. Obtener SUB-COMUNIDADES (Hijos)
    this.subCommunities$ = this.communityRD$.pipe(
      getAllSucceededRemoteData(),
      getRemoteDataPayload(),
      mergeMap((community: Community) => community.subcommunities)
    );

    // C. Obtener COLECCIONES (Hijos finales)
    this.collections$ = this.communityRD$.pipe(
      getAllSucceededRemoteData(),
      getRemoteDataPayload(),
      mergeMap((community: Community) => community.collections)
    );

    // D. Obtener Breadcrumbs
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

    // E. Obtener Padre
    this.parentCommunity$ = this.communityRD$.pipe(
      getAllSucceededRemoteData(),
      getRemoteDataPayload(),
      mergeMap((community: Community) => {
        if (community.parentCommunity) {
             return community.parentCommunity.pipe(
                 getAllSucceededRemoteData(),
                 getRemoteDataPayload()
             );
        } else {
            return of(null); 
        }
      }),
      catchError(() => of(null))
    );
  }
}