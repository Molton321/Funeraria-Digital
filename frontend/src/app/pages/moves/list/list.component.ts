import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Move as MoveModel } from 'src/app/models/transfer/move';
import { MoveService } from 'src/app/services/move/move.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheMoves: MoveModel[];

  constructor(private service: MoveService, private router: Router) {
    this.TheMoves = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheMoves = data;
      // console.log(JSON.stringify(this.TheMoves));
    });
  }

  create() {
    // console.log("create");
    this.router.navigate(["moves/create"]);
  }

  view(id: number) {
    // console.log("view", id);
    this.router.navigate(["moves/view/" + id]);
  }

  update(id: number) {
    // console.log("update", id);
    this.router.navigate(["moves/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Delete Move',
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
