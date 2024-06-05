import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hall as HallModel } from 'src/app/models/hall/hall.model';
import { HallService } from 'src/app/services/hall/hall.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheHalls: HallModel[];

  constructor(private service: HallService, private router: Router) {
    this.TheHalls = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheHalls = data;
      // console.log(JSON.stringify(this.TheHalls));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["halls/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["halls/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["halls/update/" + id]);
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
