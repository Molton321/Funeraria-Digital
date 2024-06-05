import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { create } from 'domain';
import { Administrator } from 'src/app/models/administrator/administrator.model';
import { AdministratorService } from 'src/app/services/administrator/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  theAdministrators: Administrator[];


  constructor( private service: AdministratorService, private router: Router ) {
    this.theAdministrators = [];
   }

  ngOnInit(): void {
    this.list();
  }
  
  list(){
    this.service.list().subscribe( (data: Administrator[]) => {
      this.theAdministrators = data;
    });
  }

  view(id: number){
    this.router.navigate(['/administrators/view', id]);
  } 
  
  create(){
    this.router.navigate(['/administrators/create']);
  }

  update(id: number){
    this.router.navigate(['/administrators/update', id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Client',
      text: "Are you sure you want to delete the record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).
          subscribe(data => {
            Swal.fire(
              'Deleted!',
              'The record has been deleted.',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
