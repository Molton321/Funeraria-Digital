import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Displacement as DisplacementModel } from 'src/app/models/displacement/displacement.model';
import { DisplacementService } from 'src/app/services/displacement/displacement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheDisplacements: DisplacementModel[];

  constructor(private activateRoute: ActivatedRoute, private service: DisplacementService, private router: Router) {
    this.TheDisplacements = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const currentUrlArray = currentUrl.split("/");
    
    if (currentUrlArray.length == 1){
      this.list()
    }
    if (currentUrlArray.length > 1){
      if (currentUrlArray[1] == 'driver'){
        const id = parseInt(currentUrlArray[2]);
        this.listByDriver(id);
      }
      if (currentUrlArray[1] == 'coffin'){
        const id = parseInt(currentUrlArray[2]);
        this.listByCoffin(id);
      }
    }
    if (currentUrlArray.length > 3){
      if (currentUrlArray[1] == 'driver' && currentUrlArray[3] == 'coffin'){
        const idDriver = parseInt(currentUrlArray[2]);
        const idCoffin = parseInt(currentUrlArray[4]);
        this.listByDriverAndCoffin(idDriver, idCoffin);
      }
    }
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheDisplacements = data;
    })
  }

  listByDriver(id: number) {
    this.service.listByDriver(id).subscribe(data => {
      this.TheDisplacements = data;
    })
  }

  listByCoffin(id: number) {
    this.service.listByCoffin(id).subscribe(data => {
      this.TheDisplacements = data;
    })
  }

  listByDriverAndCoffin(idDriver: number, idCoffin: number) {
    this.service.listByDriverAndCoffin(idDriver, idCoffin).subscribe(data => {
      this.TheDisplacements = data;
    })
  }

  create() {
    this.router.navigate(["displacements/create"])
  }

  view(id: number) {
    this.router.navigate(["displacements/view/"+id])
  }

}
