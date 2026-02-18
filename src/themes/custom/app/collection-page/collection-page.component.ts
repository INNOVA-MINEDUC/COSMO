import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, UpperCasePipe } from '@angular/common'; // Agregamos UpperCasePipe para estilo
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

// Imports Base
import { CollectionPageComponent as BaseComponent } from '../../../../app/collection-page/collection-page.component';

// Modelos y Datos
import { Collection } from '../../../../app/core/shared/collection.model';
import { Community } from '../../../../app/core/shared/community.model'; // Necesitamos el modelo de Comunidad
import { RemoteData } from '../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../app/core/data/paginated-list.model';
import { getAllSucceededRemoteData, getRemoteDataPayload } from '../../../../app/core/shared/operators';

// Búsqueda y Paginación
import { SearchService } from '../../../../app/core/shared/search/search.service';
import { PaginatedSearchOptions } from '../../../../app/shared/search/models/paginated-search-options.model';
import { DSpaceObjectType } from '../../../../app/core/shared/dspace-object-type.model';
import { SearchResult } from '../../../../app/shared/search/models/search-result.model';
import { DSpaceObject } from '../../../../app/core/shared/dspace-object.model';
import { PaginationComponentOptions } from '../../../../app/shared/pagination/pagination-component-options.model';
import { BreadcrumbsService } from '../../../../app/breadcrumbs/breadcrumbs.service';
import { Breadcrumb } from '../../../../app/breadcrumbs/breadcrumb/breadcrumb.model';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { EPerson } from '../../../../app/core/eperson/models/eperson.model';

// Animaciones
import { fadeIn, fadeInOut } from '../../../../app/shared/animations/fade';

@Component({
  selector: 'ds-themed-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
  standalone: true,
  animations: [fadeIn, fadeInOut],
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    RouterLink,
    TranslateModule,
    UpperCasePipe
  ],
})
export class CollectionPageComponent extends BaseComponent implements OnInit {
  
  collectionRD$: Observable<RemoteData<Collection>>;
  itemsRD$: Observable<RemoteData<PaginatedList<SearchResult<DSpaceObject>>>>;
  
  // CAMBIO: En lugar de breadcrumbs complejos, solo buscamos al papá (La Comunidad)
  parentCommunity$: Observable<Community>;
  breadcrumbs$: Observable<Breadcrumb[]>;

  // Autenticación
  isAuthenticated$: Observable<boolean>;
  user$: Observable<EPerson>;

  private breadcrumbsService = inject(BreadcrumbsService);
  private authSvc = inject(AuthService);

  protected route = inject(ActivatedRoute);
  protected searchService = inject(SearchService);

  ngOnInit(): void {
    // Configurar autenticación
    this.isAuthenticated$ = this.authSvc.isAuthenticated();
    this.user$ = this.authSvc.getAuthenticatedUserFromStore();
    
    // 1. Obtener la Colección actual
    this.collectionRD$ = this.route.data.pipe(
      map((data) => data.dso as RemoteData<Collection>)
    );

    // 2. CAMBIO IMPORTANTE: Obtener manualmente la Comunidad Padre
    this.parentCommunity$ = this.collectionRD$.pipe(
      getAllSucceededRemoteData(),
      getRemoteDataPayload(),
      mergeMap((collection: Collection) => {
        // DSpace guarda el enlace al padre aquí. Lo resolvemos.
        return collection.parentCommunity.pipe(
            getAllSucceededRemoteData(),
            getRemoteDataPayload()
        );
      })
    );

    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

    // 3. Buscar los Items (Archivos)
    this.itemsRD$ = this.collectionRD$.pipe(
      getAllSucceededRemoteData(),
      getRemoteDataPayload(),
      mergeMap((collection: Collection) => {
        
        const paginationOptions = new PaginationComponentOptions();
        paginationOptions.id = 'collection-page-pagination';
        paginationOptions.currentPage = 1;
        paginationOptions.pageSize = 10;

        const options = new PaginatedSearchOptions({
          scope: collection.id,
          dsoTypes: [DSpaceObjectType.ITEM],
          pagination: paginationOptions
        });

        return this.searchService.search(options);
      })
    );
  }
}