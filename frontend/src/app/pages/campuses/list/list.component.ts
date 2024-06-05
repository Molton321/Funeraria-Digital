import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campus as CampusModel } from 'src/app/models/campus/campus.model';
import { CampusService } from 'src/app/services/campus/campus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheCampuses: CampusModel[];

  constructor(private service: CampusService, private router: Router) {
    this.TheCampuses = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheCampuses = data;
      // console.log(JSON.stringify(this.TheCampuses));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["campuses/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["campuses/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["campuses/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Campus',
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
