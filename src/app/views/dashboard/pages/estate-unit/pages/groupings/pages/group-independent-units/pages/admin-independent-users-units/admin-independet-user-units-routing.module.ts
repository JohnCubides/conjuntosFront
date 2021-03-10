import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingPath } from 'src/environments/routing-path';
import { CanDeactivateGuard } from 'src/app/shareds/form-validate/can-deactivate.guard';
import { AdminUsersUnitsComponent } from './pages/admin-users-units/admin-users-units.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { CreateComponent } from './pages/create/create.component';
import { ModifyComponent } from './pages/modify/modify.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AdminUsersUnitsComponent,
                data: {
                }
            },
            {
                // tslint:disable-next-line: max-line-length
                path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.consult.path,
                component: ConsultComponent,
                canDeactivate: [CanDeactivateGuard],
                data: {
                    // tslint:disable-next-line: max-line-length
                    breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.consult.breadcrumb,
                    // tslint:disable-next-line: max-line-length
                    permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.consult.permits
                }
            },
            {
                // tslint:disable-next-line: max-line-length
                path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.create.path,
                component: CreateComponent,
                canDeactivate: [CanDeactivateGuard],
                data: {
                    // tslint:disable-next-line: max-line-length
                    breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.create.breadcrumb,
                    // tslint:disable-next-line: max-line-length
                    permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.create.permits
                }
            },
            {
                // tslint:disable-next-line: max-line-length
                path: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.modify.path,
                component: ModifyComponent,
                canDeactivate: [CanDeactivateGuard],
                data: {
                    // tslint:disable-next-line: max-line-length
                    breadcrumb: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.modify.breadcrumb,
                    // tslint:disable-next-line: max-line-length
                    permits: RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units.pages.administrator_groupings.pages.administrator_group_independent.pages.admin_independet_user_units.pages.modify.permits
                }
            },
            { path: '**', redirectTo: '/dashboard/' + RoutingPath.appRouting.components.dashboard.pages.administrator_estate_units } // TODO: Modificar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminIndepedenetUserUnitsRoutingModule { }
