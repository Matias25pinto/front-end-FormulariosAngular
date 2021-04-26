import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
   [s:string]: boolean 
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  //un metodo asincrono que busca un usuario
  existeUsuario( control: FormControl ): Promise <ErrorValidate> | Observable <ErrorValidate> {
    
    if( !control.value ){
      return Promise.resolve(null);
    }
    return new Promise( (resolve, reject) => {

      setTimeout( () => {
        if( control.value === 'pedro'){
          resolve({exite: true});
        }else{
          resolve( null );
        }
      }, 3500);
    });
  }

  //Este metodo nos ayuda a controlar si un usuario esta duplicado
  noHerrera( control: FormControl ): ErrorValidate {

    if( control.value.toLowerCase() === 'herrera'){
      return{
        noHerrera: true
      }
    }
    
    return null;
  }
  //validar si dos pass son iguales, es asincrono 
  passwordsIguales( pass1Name: string, pass2Name: string){
      return ( formGrup: FormGroup ) => {
        const pass1Control = formGrup.controls[pass1Name];
        const pass2Control = formGrup.controls[pass2Name];

        if( pass1Control.value === pass2Control.value ){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors( { noEsIgual: true } );
        }
      }
  }

 
}
