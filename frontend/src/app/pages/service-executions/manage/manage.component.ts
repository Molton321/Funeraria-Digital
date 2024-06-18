import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client as ClientModel } from 'src/app/models/client/client.model';
// import { Deceased as DeceasedModel } from 'src/app/models/deceased/deceased.model';
import { ServiceExecution as ServiceExecutionModel } from 'src/app/models/service-execution/service-execution.model';
import { Service as ServiceModel } from 'src/app/models/service/service.model';
import { ClientService } from 'src/app/services/client/client.service';
// import { DeceasedService } from 'src/app/services/deceased/deceased.service';
import { ServiceExecutionService } from 'src/app/services/service-execution/service-execution.service';
import { ServiceService } from 'src/app/services/service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->view, 2 ->create, 3->update
  theServiceExecution: ServiceExecutionModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theServices: ServiceModel[];
  theClients: ClientModel[];
  // theDeceaseds: DeceasedModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: ServiceExecutionService, 
    private serviceService: ServiceService, 
    private clientService: ClientService, 
    // private deceasedService: DeceasedService, 
    private router: Router, 
    private theFormBuilder:FormBuilder
  ) { 
    this.trySend=false
    this.mode = 1;
    this.theServices = [];
    this.theClients = [];
    // this.theDeceaseds = [];
    this.theServiceExecution = { id: null, service_execution_date: null, service_id: null, client_id: null, deceased_id: null };
  }

  ngOnInit(): void {
    this.theServices = [];
    this.theClients = [];
    // this.theDeceaseds = [];
    this.configFormGroup()
    this.servicesList()
    this.clientsList()
    // this.deceasedsList()
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
      this.theServiceExecution.id = this.activateRoute.snapshot.params.id;
      this.getServiceExecution(this.theServiceExecution.id);
    }
  }

  servicesList(){
    this.serviceService.list().subscribe(data => {
      this.theServices = data;
    })
  }

  clientsList(){
    this.clientService.list().subscribe(data => {
      this.theClients = data;
    })
  }

  // deceasedsList(){
  //   this.deceasedService.list().subscribe(data => {
  //     this.theDeceaseds = data;
  //   })
  // }

  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      service_execution_date:[null,[Validators.required]],
      service_id:[null,[Validators.required]],
      client_id:[null,[Validators.required]],
      deceased_id:[null,[Validators.required]]
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  getServiceExecution(id: number){
    this.service.view(id).subscribe(data=>{
      this.theServiceExecution = data;
    })
  }

  create(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.create(this.theServiceExecution).subscribe(data=>{
        Swal.fire("Completado","The registry has been created correctly","success")
        this.router.navigate(["serviceExecutions/list"])
      })
    }
  }

  update(){
    this.trySend=true
    if (this.theFormGroup.invalid) {
      Swal.fire("Error","Please fill in the fields correctly", "error")
    } else {
      this.service.update(this.theServiceExecution).subscribe(data=>{
        Swal.fire("Completado","The registry has been updated correctly","success")
        this.router.navigate(["serviceExecutions/list"])
      })
    }
  }

}
