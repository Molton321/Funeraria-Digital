import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceExecution as ServiceExecutionModel } from 'src/app/models/service-execution/service-execution.model';
import { ServiceExecutionService } from 'src/app/services/service-execution/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheServiceExecutions: ServiceExecutionModel[];

  constructor(private activateRoute: ActivatedRoute, private service: ServiceExecutionService, private router: Router) {
    this.TheServiceExecutions = [];
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
      if (currentUrlArray[1] == 'client'){
        const id = parseInt(currentUrlArray[2]);
        this.listByClient(id);
      }
      if (currentUrlArray[1] == 'deceased'){
        const id = parseInt(currentUrlArray[2]);
        this.listByDeceased(id);
      }
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheServiceExecutions = data;
    })
  }

  listByService(id: number) {
    this.service.listByService(id).subscribe(data => {
      this.TheServiceExecutions = data;
    })
  }

  listByClient(id: number) {
    this.service.listByClient(id).subscribe(data => {
      this.TheServiceExecutions = data;
    })
  }

  listByDeceased(id: number) {
    this.service.listByDeceased(id).subscribe(data => {
      this.TheServiceExecutions = data;
    })
  }

  create() {
    this.router.navigate(["serviceExecutions/create"])
  }

  view(id: number) {
    this.router.navigate(["serviceExecutions/view/"+id])
  }

  update(id: number) {
    this.router.navigate(["serviceExecutions/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Service Execution',
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
