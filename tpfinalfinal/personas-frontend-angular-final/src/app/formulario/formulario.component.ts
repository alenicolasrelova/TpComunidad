import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {
  //  variables que reciben el valor
  idPersona: number;
  nombreInput: string;
  apellidoInput: string;
  emailInput: string;
  telefonoInput: string;
// con esto tenemos acceso a nuestra personaService
  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.idPersona = this.route.snapshot.params.idPersona;// obtenemos el parametro de idPersona, que se obtuvo de personas component Link
    console.log('recuperamos el parametro idPersona:' + this.idPersona);
    if(this.idPersona != null) { // Si es distinto de nulo, recuperamos el objeto
      const persona = this.personaService.encontrarPersona(this.idPersona);
      // this.idPersona lo mandamos a llamar para recuperar el objeto, y se asigna al objeto persona si es que existe
      if(persona != null) { //si persona es diferente de nulo, cargamos el valor que encontramos y le damos el valor de persona.nombre
        this.nombreInput = persona.nombre;
      }
    }

  }

  onGuardarPersona(){
    const personaAGuardar = new Persona(this.idPersona, this.nombreInput);// definimos la constante PersonaAGuardar creando el obj persona
    if(this.idPersona != null){ //debe modificar la persona
      this.personaService.modificarPersona(this.idPersona, personaAGuardar);
    }
    else {// caso contrario debera agregar a la persona
      this.personaService.agregarPersona(personaAGuardar);
    }
    this.router.navigate(['personas']);
  }

  onEliminarPersona(){
    if(this.idPersona != null){
      console.log('persona a eliminar:' + this.idPersona);
      this.personaService.eliminarPersona(this.idPersona);
    }
    this.router.navigate(['personas']);
  }

}
