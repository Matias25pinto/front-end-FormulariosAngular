import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido:'',
    correo:'',
    pais:''
  }
  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
        .subscribe( paises => {
          this.paises = paises;

          this.paises.unshift({
            nombre: '[Seleccione País]',
            codigo: ''
          })
        });
  }

  guardar( forma:NgForm ){
    //si forma es invalido se recorre todos sus objetos con forEach
    if( forma.invalid ){
      Object.values( forma.controls ).forEach( control => {
        if( control.status.toString() === 'INVALID' ){
          control.markAsTouched();
        }
      });

      return;
    }

    console.log(this.usuario);

  }

}
