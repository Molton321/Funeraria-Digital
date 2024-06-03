import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService as PlanServiceModel } from 'src/app/models/plan-service/plan-service.model';
import { PlanServiceService } from 'src/app/services/plan-service/plan-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ThePlanServices: PlanServiceModel[];

  constructor(private service: PlanServiceService, private router: Router) {
    this.ThePlanServices = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.ThePlanServices = data;
      // console.log(JSON.stringify(this.ThePlanServices));
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["planServices/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["planServices/view/"+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["planServices/update/"+id])
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
