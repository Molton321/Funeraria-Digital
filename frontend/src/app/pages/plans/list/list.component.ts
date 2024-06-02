import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan/plan.model';
import { PlanService } from 'src/app/services/plan/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ThePlans: Plan[];

  constructor(private service: PlanService, private router: Router) {
    this.ThePlans = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.ThePlans = data;
      // console.log(JSON.stringify(this.ThePlans));
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["plans/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["plans/view/"+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["plans/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Plan',
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
