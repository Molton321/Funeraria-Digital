import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment as PaymentModel } from 'src/app/models/payment/payment.model';
import { PaymentService } from 'src/app/services/payment/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ThePayments: PaymentModel[];

  constructor(private service: PaymentService, private router: Router) {
    this.ThePayments = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.ThePayments = data;
      // console.log(JSON.stringify(this.ThePayments));
    })
  }

  create() {
    // console.log("create");
    this.router.navigate(["payments/create"])
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["payments/view/"+id])
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["payments/update/"+id])
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Payment',
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
