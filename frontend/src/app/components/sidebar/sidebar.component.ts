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
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type:'' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type:'' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', type:'' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' , type:'' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', type:'' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', type:'' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type:'' },
  { path: '/plans', title: 'Plans', icon: 'ni-credit-card text-pink', class: '', type:''},
    { path: '/services', title: 'Services', icon: 'ni-circle-08 text-pink', class: '', type:'' },
  { path: '/planServices', title: 'Plan Services', icon: 'ni-circle-08 text-blue', class: '', type:'' },
  { path: '/subscription', title: 'Subscripciones', icon: 'ni-paper-diploma text-pink', class: '', type: '' },
  { path: '/register', title: 'Titulares', icon: 'ni-circle-08 text-orange', class: '', type: '' },
  { path: '/clients/list', title: 'Clientes', icon: 'ni-circle-08 text-orange ', class: '', type: '' },
  { path: '/register', title: 'Sedes', icon: 'ni-building text-blue', class: '', type: '' },
  { path: '/register', title: 'Salas', icon: 'ni-app text-blue', class: '', type: '' },
  { path: '/register', title: 'Administradores', icon: 'ni-badge text-orange', class: '', type: '' }

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
