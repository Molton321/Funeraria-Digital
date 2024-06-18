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

  view(id: number) {
    this.router.navigate(["departments/view/" + id]);
  }

  viewTo(id: number, route:string) {
    console.log(route+id);
    this.router.navigate([route+id]);
  }

}
