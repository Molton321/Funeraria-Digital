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
        path: 'planServices',
        loadChildren: () => import('src/app/pages/plan-services/plan-services.module').then(m => m.PlanServicesModule)
    },
    {
        path: 'serviceExecutions',
        loadChildren: () => import('src/app/pages/service-executions/service-executions.module').then(m => m.ServiceExecutionsModule)
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
    // {
    //     path: 'campuses',
    //     loadChildren: () => import('src/app/pages/campuses/campuses.module').then(m => m.CampusesModule)
    // },
    // {
    //     path: 'rooms',
    //     loadChildren: () => import('src/app/pages/halls/halls.module').then(m => m.HallsModule)
    // },
    {
        path: 'comments',
        
    },
    {
        path: 'chat',

    },
    {
        path: 'users',
        loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
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
        path: 'plans',
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
    },
    {
        path: 'departments',
        loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
    },
    {
        path: 'cities',
        loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
    }

];
