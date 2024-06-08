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
        path: 'plans',
        //canActivate: [Guard],
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
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
        path: 'subscriptions',
        loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
    },
    {
        path: 'payments',
        loadChildren: () => import('src/app/pages/payments/payments.module').then(m => m.PaymentsModule)
    },
    {
        path: 'moves',
        loadChildren: () => import('src/app/pages/moves/moves.module').then(m => m.MovesModule)
    },
    {
        path: 'burials',
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: 'cremations',
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: 'halls',
        loadChildren: () => import('src/app/pages/halls/halls.module').then(m => m.HallsModule)
    },
    {
        path: 'campuses',
        loadChildren: () => import('src/app/pages/campuses/campuses.module').then(m => m.CampusesModule)
    },
    {
        path: 'cities',
        loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
    },
    {
        path: 'departments',
        loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
    }
];
