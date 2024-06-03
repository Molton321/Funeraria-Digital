import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription as SubscriptionModel } from 'src/app/models/subscription/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheSubscriptions: SubscriptionModel[];

  constructor(private service: SubscriptionService, private router: Router) {
    this.TheSubscriptions = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheSubscriptions = data;
      // console.log(JSON.stringify(this.ThePlans));
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["subscriptions/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["subscriptions/view/"+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["subscriptions/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Subscription',
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
