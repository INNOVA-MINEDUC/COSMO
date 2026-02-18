import {
  AsyncPipe,
  NgIf,
  NgFor, // <--- 1. Agregado: Necesario para iterar los botones
  NgTemplateOutlet,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core'; // <--- 2. Agregado: inject y OnInit
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

// <--- 3. Nuevos imports de DSpace Core necesarios
// <--- Imports corregidos: Se agregó 'app/' a la ruta y se corrigió 'community-data.service'
import { CommunityDataService } from '../../../../app/core/data/community-data.service';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../app/core/data/paginated-list.model';
import { Community } from '../../../../app/core/shared/community.model';
import { SortDirection, SortOptions } from '../../../../app/core/cache/models/sort-options.model';
import { FindListOptions } from '../../../../app/core/data/find-list-options.model';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { EPerson } from '../../../../app/core/eperson/models/eperson.model';



import { HomeCoarComponent } from '../../../../app/home-page/home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { ThemedTopLevelCommunityListComponent } from '../../../../app/home-page/top-level-community-list/themed-top-level-community-list.component';
import { SuggestionsPopupComponent } from '../../../../app/notifications/suggestions/popup/suggestions-popup.component';
import { ThemedConfigurationSearchPageComponent } from '../../../../app/search-page/themed-configuration-search-page.component';
import { ThemedSearchFormComponent } from '../../../../app/shared/search-form/themed-search-form.component';
import { FeaturedGalleryComponent } from './featured-gallery.component';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'ds-themed-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor, // <--- IMPORTANTE: Asegúrate de que esté aquí
    RouterModule,
    HomeCoarComponent,
    NgTemplateOutlet,
    RecentItemListComponent,
    SuggestionsPopupComponent,
    ThemedConfigurationSearchPageComponent,
    ThemedHomeNewsComponent,
    ThemedSearchFormComponent,
    ThemedTopLevelCommunityListComponent,
    FeaturedGalleryComponent,
    CarouselComponent,
    TranslateModule,
  ],
})
export class HomePageComponent extends BaseComponent implements OnInit {

  // Variable para usar en el HTML con el pipe async
  topCommunities$: Observable<RemoteData<PaginatedList<Community>>>;
  
  // Variables para autenticación
  isAuthenticated$: Observable<boolean>;
  user$: Observable<EPerson>;

  // Inyectamos el servicio usando inject() para evitar problemas con el constructor del padre
  private communityDataService = inject(CommunityDataService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    super.ngOnInit();
    
    // Configurar autenticación
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getAuthenticatedUserFromStore();

    // Configuración base (traemos todo)
    const config: FindListOptions = {
      elementsPerPage: 10, // Traemos suficientes para asegurar que vengan todas
      sort: new SortOptions('dc.title', SortDirection.ASC)
    };

    // Definimos el orden lógico exacto (Tal como están escritos en DSpace)
    const ordenDeseado = ['Primaria', 'Básico', 'Diversificado'];

    this.topCommunities$ = this.communityDataService.findTop(config).pipe(
      map((rd: RemoteData<PaginatedList<Community>>) => {
        // Solo intentamos ordenar si la petición fue exitosa y hay datos
        if (rd.hasSucceeded && rd.payload && rd.payload.page) {
          
          // Ordenamos el array 'page' modificándolo directamente
          rd.payload.page.sort((a, b) => {
            let indexA = ordenDeseado.indexOf(a.name);
            let indexB = ordenDeseado.indexOf(b.name);

            // Si el nombre no está en nuestra lista (ej: "Universitario"), 
            // lo mandamos al final (le damos un índice alto, 999)
            if (indexA === -1) indexA = 999;
            if (indexB === -1) indexB = 999;

            return indexA - indexB;
          });
        }
        return rd;
      })
    );
  }
}
