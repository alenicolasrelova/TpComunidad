import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { DataService } from './data-service';

@Injectable()
export class PersonaService {
  // esta clase es para administrar el arreglo local, y todo esta conectado con la web por medio de la clase data service
  personas: Persona[] = [];

  constructor( private dataService: DataService) {}

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  obtenerPersonas() {
    return this.dataService.cargarPersonas();
  }

  // no interactua con web service, por eso usamos la variable data service
  agregarPersona(persona: Persona){
    console.log('persona a agregar:' + persona.nombre);
    this.dataService.agregarPersona(persona)
      .subscribe( // Obtenemos un objeto de tipo persona
        (persona: Persona) => {
          // Recuperamos objeto Persona con el idPersona recien agregado
          // Gracias a flush se agrega el id persona y la persona que se agrega, ya se agrega con el id establecido
          // Antes de agregar a la persona, ya tiene su id agregado
          console.log('se agrega al arreglo la persona recien insertada suscriber:' + persona.idPersona);
          this.personas.push(persona);// Lo insertamos al arreglo, por eso ya tiene que tener su valor establecido
        }
      );
  }

  encontrarPersona(id: number){ // Definimos una variable, llamamos al arreglo personas
    // para preguntar si ya hay una persona con el id ya definido.
    //  extraemos su id, y comparamos con el id que estamos recibiendo como parametro
    const persona: Persona = this.personas.find( persona => persona.idPersona == id);
    console.log('persona encontrada:' + persona.idPersona + ' ' + persona.nombre);
    return persona;
  }

  modificarPersona(id: number, persona: Persona) {
    console.log('persona a modificar:' + persona.idPersona);
    // se actualiza el objeto persona del arreglo
    const personaModificadaLocal = this.personas.find( persona => persona.idPersona == id);
    personaModificadaLocal.idPersona = persona.idPersona;
    personaModificadaLocal.nombre = persona.nombre;
    // guardar la persona en la base de datos
    this.dataService.modificarPersona(id, persona);
  }

  eliminarPersona(id: number) {
    console.log('eliminar persona con id:' + id);
    const index = this.personas.findIndex( persona => persona.idPersona == id);
    // encontramos el indice en el arreglo
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(id);
  }

}
