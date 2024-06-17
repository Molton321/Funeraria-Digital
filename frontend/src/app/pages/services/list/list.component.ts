import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service as ServiceModel } from 'src/app/models/service/service.model';
import { ServiceService } from 'src/app/services/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheServices: ServiceModel[];

  constructor(private service: ServiceService, private router: Router) {
    this.TheServices = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheServices = data;
      // console.log(JSON.stringify(this.TheServices));
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["services/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["services/view/"+id])
  }

  viewTo(id: number, route: string) {
    this.router.navigate([route+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["services/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Service',
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
