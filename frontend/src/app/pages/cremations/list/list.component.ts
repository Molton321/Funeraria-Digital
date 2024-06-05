import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cremation as CremationModel } from 'src/app/models/cremation/cremation.model';
import { CremationService } from 'src/app/services/cremation/cremation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheCremations: CremationModel[];

  constructor(private service: CremationService, private router: Router) {
    this.TheCremations = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheCremations = data;
      // console.log(JSON.stringify(this.TheCremations));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["cremations/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["cremations/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["cremations/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Cremation',
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
