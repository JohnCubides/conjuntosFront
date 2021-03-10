import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface PuedeDesactivar {
  permitirSalirDeRuta: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard  implements CanDeactivate<PuedeDesactivar> {

  canDeactivate(component: PuedeDesactivar) {
    if (component !== null) {
      return component.permitirSalirDeRuta ? component.permitirSalirDeRuta() : true;
    } else {
      return true;
    }
  }

}
