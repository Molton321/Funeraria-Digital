import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private service: CityService, private router: Router, private activateRoute: ActivatedRoute) {
    this.TheCities = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const currentUrlArray = currentUrl.split("/");
    
    if (currentUrlArray.length == 1){
      this.list()
    }
    if (currentUrlArray.length > 1){
      if (currentUrlArray[1] == 'department'){
        const id = parseInt(currentUrlArray[2]);
        this.listByDepartment(id);
      }
    }
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

  listByDepartment(id: number) {
    this.service.listByDepartment(id).subscribe(data => {
      this.TheCities = data;
    })
  }

}
