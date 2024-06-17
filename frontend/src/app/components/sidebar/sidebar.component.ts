import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type: string;
}
export const ROUTES: RouteInfo[] = [
  // Type 1 user sees , Type 2 admin sees, type 3 both see, type 4 nonlogged user sees  
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type:'3' },
    //{ path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type:'' },
    //{ path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', type:'' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' , type:'3' },
    //{ path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', type:'' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', type:'4' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type:'4' },
    { path: '/users/list', title: 'Users', icon: 'ni-circle-08 text-pink', class: '', type:'2' },
    { path: '/roles/list', title: 'Roles', icon: 'ni-money-coins text-orange', class: '', type: '2'},
    { path: '/permissions/list', title: 'Permissions', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/permissionsRoles/list', title: 'Permissions Roles', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/seesion/list', title: 'Sessions', icon: 'ni-money-coins text-orange', class: '', type: '2' },

    { path: '/clients/list', title: 'Clientes', icon: 'ni-circle-08 text-orange ', class: '', type: '2' },
    { path: '/administrators/list', title: 'Administradores', icon: 'ni-badge text-orange', class: '', type: '2' },
    { path: '/drivers/list', title: 'Drivers', icon: 'ni-money-coins text-orange', class: '', type: '2' },

    { path: '/titulars/list', title: 'Titulares', icon: 'ni-circle-08 text-orange', class: '', type: '2' },
    { path: '/beneficiaries/list', title: 'Beneficiaries', icon: 'ni-money-coins text-orange', class: '', type: '2' },

    { path: '/plans/list', title: 'Plans', icon: 'ni-credit-card text-pink', class: '', type:'2'},
    { path: '/subscription/list', title: 'Subscripciones', icon: 'ni-paper-diploma text-pink', class: '', type: '2' },
    { path: '/payments/list', title: 'Payments', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/planServices/list', title: 'Plan Services', icon: 'ni-circle-08 text-blue', class: '', type:'2' },

    { path: '/services/list', title: 'Services', icon: 'ni-circle-08 text-pink', class: '', type:'2' },
    { path: '/viewings/list', title: 'Funerals', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/transfers/list', title: 'Transfers', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/cremations/list', title: 'Cremactions', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/burials/list', title: 'Burials', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/serviceExecutions/list', title: 'Services Executions', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    
    { path: '/campuses/list', title: 'FuneralHomes', icon: 'ni-building text-blue', class: '', type: '2' },
    { path: '/rooms/list', title: 'Rooms', icon: 'ni-app text-blue', class: '', type: '2' },
    { path: '/comments/list', title: 'Comentarios', icon: 'ni-money-coins text-orange', class: '', type: '2' },
    { path: '/chat/list', title: 'Chat', icon: 'ni-money-coins text-orange', class: '', type: '2' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
