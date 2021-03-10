import { Component, OnInit, Input, ViewChild, Injector } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatMenuTrigger } from '@angular/material/menu';
import { JwtService } from 'src/app/core/services/jwt-service/jwt.service';
import { AbstractBasic } from 'src/app/core/models/abstracts/abstract-basic/abstract-basic';

@Component({
  selector: 'app-principal-layout',
  templateUrl: './principal-layout.component.html',
  styleUrls: ['./principal-layout.component.scss']
})
export class PrincipalLayoutComponent extends AbstractBasic implements OnInit {
  title = 'layout';
  idModal = 'family-certificate';
  showFooter = true;
  @Input() matDrawer: MatDrawer;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  routes = [
    {
      path: '',
      icon: 'settings',
      description: 'Configuración'
    },
    // {
    //   path: '',
    //   icon: 'insert_drive_file',
    //   description: 'Recibos'
    // },
    // {
    //   path: '',
    //   icon: 'input',
    //   description: 'Ingresos'
    // }
  ]

  routes2 = [
    [
      {
        path: '/dashboard/administrator-estate-units',
        description: 'Unidades inmobiliarias'
      },
      {
        path: '/dashboard/administrator-user',
        description: 'Usuarios'
      },
      {
        path: '/dashboard/administrator-rol',
        description: 'Roles'
      },
      // {
      //   description: 'Agrupaciones'
      // },
      // {
      //   description: 'Parqueaderos'
      // },
      // {
      //   description: 'Tarjetas'
      // }
    ],
    // [
    //   {
    //     description: 'opcion 1'
    //   },

    //   {
    //     description: 'opcion 2'
    //   }
    // ],
    // [
    //   {
    //     description: 'opcion 1'
    //   }
    // ]
  ]

  constructor(injector: Injector, private jwt: JwtService) {
    super(injector);
    this.jwt.setPermits(this.localStorage.getItemString('token')); // esto lo tiene que hacer la Dashboard al cargar
  }

  ngOnInit(): void {
  }

  someMethod() {
    this.trigger.closeMenu();
  }

  logout() {
    this.api.post('/Users/revoketoken').then((result: any) => {
    }, error => {
    });
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('refreshToken');
    this.router.navigate(['/account/login']);
  }

}
