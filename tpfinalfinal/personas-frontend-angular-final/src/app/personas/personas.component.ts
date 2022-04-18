import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService, // se encarga de administrar el arreglo persona Service
              private router: Router,
              private route: ActivatedRoute
    ) { }
  ngOnInit(): void{ // ciclo de vida de nuestro componente de angular
    this.personaService.obtenerPersonas()
      .subscribe(
        (personasObtenidas: Persona[]) => {
          // cargamos los datos de persona obtenidos en el arreglo local
          this.personas = personasObtenidas;
          this.personaService.setPersonas(this.personas);
          console.log('personas obtenidas del subscriber:' + this.personas);
        }
      );
  }

  irAgregar(){
    console.log(' vamos a agregar');
    this.router.navigate(['./personas/agregar']); // Path que vamos a utilizar
    // utilizamos objeto router para hacer el cambio, navigate para irnos a la ruta que definimos en el archivo app Router
  }

}
