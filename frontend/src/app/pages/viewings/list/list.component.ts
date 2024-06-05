import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viewing as ViewingModel } from 'src/app/models/viewing/viewing.model';
import { ViewingService } from 'src/app/services/viewing/viewing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheViewings: ViewingModel[];

  constructor(private service: ViewingService, private router: Router) {
    this.TheViewings = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheViewings = data;
      // console.log(JSON.stringify(this.TheViewings));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["viewings/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["viewings/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["viewings/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Viewing',
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
