import { Component } from '@angular/core';

import { BreadcrumbsComponent as BaseComponent } from '../../../../app/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from '../../../../app/breadcrumbs/breadcrumbs.service';

/**
 * Breadcrumbs component - Vacío para tema custom
 * Los breadcrumbs están completamente eliminados de este tema.
 */
@Component({
  selector: 'ds-themed-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['../../../../app/breadcrumbs/breadcrumbs.component.scss'],
  standalone: true,
  imports: [],
})
export class BreadcrumbsComponent extends BaseComponent {
  constructor(breadcrumbsService: BreadcrumbsService) {
    super(breadcrumbsService);
  }
}
