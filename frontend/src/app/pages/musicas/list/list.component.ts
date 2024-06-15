import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Musica as MusicaModel } from 'src/app/models/musica/musica.model';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  TheMusicas: MusicaModel[];

  constructor(private service: MusicaService, private router: Router) {
    this.TheMusicas = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.TheMusicas = data;
      console.log(data)
    });
  }

  create() {
    this.router.navigate(["musicas/create"]);
  }

}
