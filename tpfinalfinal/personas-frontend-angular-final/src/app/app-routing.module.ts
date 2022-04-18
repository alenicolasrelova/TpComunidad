import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonasComponent } from './personas/personas.component';
import { FormularioComponent } from './formulario/formulario.component';


const routes: Routes = [
  {path: '', component: PersonasComponent}, // url por default
  {path: 'personas', component: PersonasComponent, children: [ // children es para agregar o modificar nuestra persona
    // por lo tanto hay rutas hijas del path personas
    {path: 'agregar', component: FormularioComponent},
    {path: ':idPersona', component: FormularioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
