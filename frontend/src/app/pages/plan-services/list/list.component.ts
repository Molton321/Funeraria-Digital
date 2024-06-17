import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activateRoute: ActivatedRoute, private service: PlanServiceService, private router: Router) {
    this.ThePlanServices = [];
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
      if (currentUrlArray[1] == 'plan'){
        const id = parseInt(currentUrlArray[2]);
        this.listByPlan(id);
      }
    }
    if (currentUrlArray.length > 3){
      if (currentUrlArray[1] == 'plan' && currentUrlArray[3] == 'service'){
        const idPlan = parseInt(currentUrlArray[2]);
        const idService = parseInt(currentUrlArray[4]);
        this.listByPlanAndService(idPlan, idService);
      }
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.ThePlanServices = data;
    })
  }

  listByService(id: number) {
    this.service.listByService(id).subscribe(data => {
      this.ThePlanServices = data;
    })
  }

  listByPlan(id: number) {
    this.service.listByPlan(id).subscribe(data => {
      this.ThePlanServices = data;
    })
  }

  listByPlanAndService(idPlan: number, idService: number) {
    this.service.listByPlanAndService(idPlan, idService).subscribe(data => {
      this.ThePlanServices = data;
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
