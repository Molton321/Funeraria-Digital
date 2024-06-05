import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Burial as BurialModel } from 'src/app/models/burial/burial.model';
import { BurialService } from 'src/app/services/burial/burial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheBurials: BurialModel[];

  constructor(private service: BurialService, private router: Router) {
    this.TheBurials = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheBurials = data;
      // console.log(JSON.stringify(this.TheBurials));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["burials/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["burials/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["burials/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Burial',
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
