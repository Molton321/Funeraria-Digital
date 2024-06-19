import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User as UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheUsers: UserModel[];

  constructor(private service: UserService, private router: Router) {
    this.TheUsers = [];
  }

  ngOnInit(): void {
    this.list()
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheUsers = data;
      // console.log(JSON.stringify(this.TheUsers));
    })
  }

  view(id: string) {
    this.router.navigate(["users/view/"+id])
  }

  viewTo(id: string, route: string) {
    this.router.navigate([route+id])
  }

  update(id: string) {
    this.router.navigate(["users/update/"+id])
  }

  delete(id: string) {
    Swal.fire({
      title: 'Delete User',
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
