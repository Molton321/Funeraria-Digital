import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'musicas',
        loadChildren: () => import('src/app/pages/musicas/musicas.module').then(m => m.MusicasModule)
    },
    {
        path: 'administrators',
        loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)
    },
    {
        path: 'services',
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: 'planServices',
        loadChildren: () => import('src/app/pages/plan-services/plan-services.module').then(m => m.PlanServicesModule)
    },
    {
        path: 'serviceExecutions',
        loadChildren: () => import('src/app/pages/service-executions/service-executions.module').then(m => m.ServiceExecutionsModule)
    },
    {
        path: 'plans',
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
    }
];
