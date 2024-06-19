import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrator as AdministratorModel } from 'src/app/models/administrator/administrator.model';
import { AdministratorService } from 'src/app/services/administrator/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheAdministrators: AdministratorModel[];

  constructor(private activateRoute: ActivatedRoute, private service: AdministratorService, private router: Router) {
    this.TheAdministrators = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const currentUrlArray = currentUrl.split("/");
    
    if (currentUrlArray.length == 1){
      this.list()
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheAdministrators = data;
    })
  }

  create() {
    this.router.navigate(["administrators/create"])
  }

  view(id: number) {
    this.router.navigate(["administrators/view/"+id])
  }

  update(id: number) {
    this.router.navigate(["administrators/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Administrators',
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
