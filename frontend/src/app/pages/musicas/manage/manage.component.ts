import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Musica as MusicaModel } from 'src/app/models/musica/musica.model';
import { Tipo as TipoModel } from 'src/app/models/tipo/tipo.model';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { TipoService } from 'src/app/services/tipo/tipo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
    
  mode: number; // 1->view, 2 ->create, 3->update
  theMusica: MusicaModel;
  theFormGroup: FormGroup;
  trySend: boolean;
  theTipos: TipoModel[];

  constructor(
    private activateRoute: ActivatedRoute, 
    private service: MusicaService, 
    private tipoService: TipoService, 
    private router: Router, 
    private theFormBuilder: FormBuilder
  ) { 
    this.trySend = false;
    this.mode = 1;
    this.theTipos = [];
    this.theMusica = { id: null, nombre: '', nombre_grupo: '', valor_hora: null, tipo_id: null  };
  }

  ngOnInit(): void {
    this.theTipos = [];
    this.configFormGroup();
    this.tiposList();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('create')){
      this.mode = 2;
    }
  }

  tiposList(){
    this.tipoService.list().subscribe(data => {
      this.theTipos = data;
    });
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nombre_grupo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      valor_hora: [null, [Validators.required, Validators.min(20000), Validators.max(2000000)]],
      tipo_id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  create(){
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Please fill in the fields correctly", "error");
    } else {
      console.log(this.theMusica)
      this.service.create(this.theMusica).subscribe(data => {
        Swal.fire("Completed", "The record has been created correctly", "success");
        console.log(data)
        this.router.navigate(["musicas/list"]);
      });
    }
  }

}
