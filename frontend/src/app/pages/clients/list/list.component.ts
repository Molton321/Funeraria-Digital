import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client/client.model';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  theClients:Client[]

  constructor(private service:ClientService, private router:Router) {
    this.theClients = []
   }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data => {
      this.theClients = data
    })
  }

  create(){
    this.router.navigate(["clients/create"])
  }

  update(id:number){
    this.router.navigate(["clients/update",id])
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
