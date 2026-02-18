import { Component } from '@angular/core';

import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { DepositComponent } from './deposit.component';

@Component({
  selector: 'ds-deposit',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
  standalone: true,
  imports: [DepositComponent],
})
export class ThemedDepositComponent extends ThemedComponent<DepositComponent> {
  protected getComponentName(): string {
    return 'DepositComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/info/deposit/deposit.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./deposit.component`);
  }

}
