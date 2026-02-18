import { Component } from '@angular/core';

import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';

/**
 * Navbar component - Vacío para tema custom
 * El navbar está completamente eliminado de este tema.
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [],
})
export class NavbarComponent extends BaseComponent {
}
