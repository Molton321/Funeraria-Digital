import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client as ClientModel } from 'src/app/models/client/client.model';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheClients: ClientModel[];

  constructor(private activateRoute: ActivatedRoute, private service: ClientService, private router: Router) {
    this.TheClients = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const currentUrlArray = currentUrl.split("/");
    
    if (currentUrlArray.length == 1){
      this.list()
    }
    if (currentUrlArray.length > 1){
      if (currentUrlArray[1] == 'service'){
        const id = parseInt(currentUrlArray[2]);
        this.listByService(id);
      }
      if (currentUrlArray[1] == 'deceaseds'){
        this.listDeceaseds();
      }
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheClients = data;
    })
  }

  listByService(id: number) {
    this.service.listByService(id).subscribe(data => {
      this.TheClients = data;
    })
  }

  listDeceaseds() {
    this.service.listDeceaseds().subscribe(data => {
      this.TheClients = data;
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["Clients/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["Clients/view/"+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["Clients/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Plan Service',
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
