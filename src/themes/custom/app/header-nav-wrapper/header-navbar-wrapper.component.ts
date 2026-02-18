import { Component } from '@angular/core';

import { HeaderNavbarWrapperComponent as BaseComponent } from '../../../../app/header-nav-wrapper/header-navbar-wrapper.component';

/**
 * Header Navbar Wrapper - Vacío para tema custom
 * El header y navbar wrapper está completamente eliminado de este tema.
 */
@Component({
  selector: 'ds-themed-header-navbar-wrapper',
  styleUrls: ['./header-navbar-wrapper.component.scss'],
  templateUrl: './header-navbar-wrapper.component.html',
  standalone: true,
  imports: [],
})
export class HeaderNavbarWrapperComponent extends BaseComponent {
}
