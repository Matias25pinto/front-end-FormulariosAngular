import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { flushMicrotasks } from '@angular/core/testing';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) { 

    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
  }
 
  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get districtoNoValido(){
    return this.forma.get('direccion.districto').invalid && this.forma.get('direccion.districto').touched
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;//operador ternario
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //validadores sincronos
      /*formControlName: ['valor_por_Defecto', 'validaciones_sincronos', 'validaciones_asincronas]  */
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['',[Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo: ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      usuario: ['', ,this.validadores.existeUsuario],//validacion ascincronas
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.fb.group({
        districto:['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array( [] )
    },{
      //validadores ascincronos
      validators: this.validadores.passwordsIguales('pass1','pass2')

    });
  }

  crearListeners(){
    this.forma.valueChanges.subscribe( valor => {
      //console.log(valor);
    } );
    //this.forma.statusChanges.subscribe( status => console.log( {status} ));

    this.forma.get('nombre').valueChanges.subscribe( valor => {
       console.log(valor);
    } );
  }
  guardar(){
    //si forma es invalido se recorre todos sus objetos con forEach
    if( this.forma.invalid ){
      //cuando guardamos marcamos todos los inputs como touched de esa forma se dispara la validacion, de invalido y que fue editado
      //this.forma.get('elemento').invalid && this.forma.get('elemento').touched
      return Object.values( this.forma.controls ).forEach( control => {
          //control instanceof FormGroup; Si es true es porque control es una instancia de FormGroup por lo tanto es otro formGroup para recorrer
          if( control instanceof FormGroup ){
            Object.values( control.controls ).forEach( control => control.markAllAsTouched() );//de esta forma markAllAsTouched(); esta marcando como editados a todos los inputs, Touched:que se toco
          }else{
            control.markAsTouched();
          }    
      });

    }
    console.log(this.forma);
  }

  cargarDataFormulario(){
    //this.forma.setValue
    this.forma.reset({
        nombre: "Matias",
        apellido: "Pinto",
        correo: "matias25pinto@gmail.com",
        direccion: {
          districto: "Caraungua",
          ciudad: "Yaguaron"
        }
    });

  }

  agregarPasatiempo(){
    //como pasatiempos es un arreglo voy cargando el arreglo con push()
    //this.fb.control('valor_por_defecto', validadores sincronos, validadores asincronos)
    this.pasatiempos.push( this.fb.control('valor por defecto', Validators.minLength(5)) );
  }

  borrarPasatiempo( i:number ){
    //como pasatiempo es un arreglo recibo el index y lo elimino con el metodo removeAt
    this.pasatiempos.removeAt( i );
  }


}
