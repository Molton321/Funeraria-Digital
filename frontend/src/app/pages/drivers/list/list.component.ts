import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver as DriverModel } from 'src/app/models/driver/driver.model';
import { DriverService } from 'src/app/services/driver/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheDrivers: DriverModel[];

  constructor(private activateRoute: ActivatedRoute, private service: DriverService, private router: Router) {
    this.TheDrivers = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const currentUrlArray = currentUrl.split("/");
    
    if (currentUrlArray.length == 1){
      this.list()
    }
    if (currentUrlArray.length > 1){
      if (currentUrlArray[1] == 'user'){
        this.listByUser(currentUrlArray[2]);
      }
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheDrivers = data;
    })
  }

  listByUser(id: string) {
    this.service.listByUser(id).subscribe(data => {
      this.TheDrivers = data;
    })
  }

  create() {
    this.router.navigate(["drivers/create"])
  }

  view(id: number) {
    this.router.navigate(["drivers/view/"+id])
  }

  update(id: number) {
    this.router.navigate(["drivers/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Driver',
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
