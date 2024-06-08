import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department as DepartmentModel } from 'src/app/models/department/department.model';
import { DepartmentService } from 'src/app/services/department/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheDepartments: DepartmentModel[];

  constructor(private service: DepartmentService, private router: Router) {
    this.TheDepartments = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheDepartments = data;
    });
  }

  create() {
    this.router.navigate(["departments/create"]);
  }

  view(id: number) {
    this.router.navigate(["departments/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["departments/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Hall',
      text: "Are you sure you want to delete the record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}
