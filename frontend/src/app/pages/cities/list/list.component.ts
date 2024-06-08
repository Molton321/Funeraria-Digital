import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City as CityModel } from 'src/app/models/city/city.model';
import { CityService } from 'src/app/services/city/city.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  TheCities: CityModel[];

  constructor(private service: CityService, private router: Router) {
    this.TheCities = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheCities = data;
    });
  }

  create() {
    this.router.navigate(["cities/create"]);
  }

  view(id: number) {
    this.router.navigate(["cities/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["cities/update/" + id]);
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
