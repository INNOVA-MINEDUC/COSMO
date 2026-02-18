import { Component } from '@angular/core';

import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { HostWindowService } from '../../../../app/shared/host-window.service';
import { MenuService } from '../../../../app/shared/menu/menu.service';

/**
 * Header component - Vacío para tema custom
 * El header está completamente eliminado de este tema.
 */
@Component({
  selector: 'ds-themed-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [],
})
export class HeaderComponent extends BaseComponent {
  constructor(
    protected menuService: MenuService,
    protected windowService: HostWindowService
  ) {
    super(menuService, windowService);
  }
}
