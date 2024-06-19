import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffin as CoffinModel  } from 'src/app/models/coffin/coffin.model';
import { Displacement as DisplacementModel } from 'src/app/models/displacement/displacement.model';
import { Driver as DriverModel } from 'src/app/models/driver/driver.model';
import { CoffinService } from 'src/app/services/coffin/coffin.service';
import { DisplacementService } from 'src/app/services/displacement/displacement.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theDisplacement: DisplacementModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theDrivers: DriverModel[];
  theCoffins: CoffinModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: DisplacementService, 
    private driverService: DriverService, 
    private coffinService: CoffinService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theDrivers = [];
    this.theCoffins = [];
    this.theDisplacement = { id: null, displacement_date: null, displacement_id_airport: null, displacement_name_airport: '', driver_id: null, coffin_id: null };
  }

  ngOnInit(): void {
    this.theDrivers = [];
    this.theCoffins = [];
    this.configFormGroup()
    this.driversList()
    this.coffinsList()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')){
      this.mode = 1;
    }
    if (currentUrl.includes('create')){
      this.mode = 2;
    }
    if (currentUrl.includes('update')){
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id){
      const currentUrlArray = currentUrl.split("/");
      if (currentUrlArray.length == 1){
        this.theDisplacement.id = this.activateRoute.snapshot.params.id;
        this.getDisplacement(this.theDisplacement.id);
      }
    }
  }

  driversList(){
    this.driverService.list().subscribe(data => {
      this.theDrivers = data;
    })
  }

  coffinsList(){
    this.coffinService.list().subscribe(data => {
      this.theCoffins = data;
    })
  }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      displacement_date:['',[Validators.required]],
      displacement_id_airport:[null,[Validators.required]],
      driver_id:[null,[Validators.required]],
      coffin_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getDisplacement(id: number){
    this.service.view(id).subscribe(data=>{
      this.theDisplacement = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theDisplacement).subscribe(data=>{
        Swal.fire("Success","The registry has been created correctly","success")
        this.router.navigate(["Displacements/list"])
      })
    }
  }

  viewTo(id: number, route: string) {
    this.router.navigate([route+id])
  }

}
