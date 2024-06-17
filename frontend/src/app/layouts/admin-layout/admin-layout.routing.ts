import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
//import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
//import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
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
        path: 'plans',
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)

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
        path: 'planServices',
        loadChildren: () => import('src/app/pages/plan-services/plan-services.module').then(m => m.PlanServicesModule)
    },
    {
        path: 'viewings',
        loadChildren: () => import('src/app/pages/viewings/viewings.module').then(m => m.ViewingsModule)
    },
    {
        path: 'transfers',
    
    },
    {
        path: 'cremations',
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: 'burials',
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: 'serviceExecutions',
    },
    {
        path: 'campuses',
        loadChildren: () => import('src/app/pages/campuses/campuses.module').then(m => m.CampusesModule)
    },
    {
        path: 'rooms',
        loadChildren: () => import('src/app/pages/halls/halls.module').then(m => m.HallsModule)
    },
    {
        path: 'comments',
        
    },
    {
        path: 'chat',

    },
    {
        path: 'users',

    },
    {
        path: 'roles',

    },
    {
        path: 'permissions',

    },
    {
        path: 'permissionsRoles',

    },
    {
        path: 'sessions',

    },
    {
        path: 'clients',

    },
    {
        path: 'drivers',

    },
    {
        path: 'titulars',

    },
    {
        path: 'beneficiaries',

    },
    {
        path: '',
    }

];
