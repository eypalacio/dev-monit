import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoComponent } from './componentes/monitoreo/monitoreo.component';

const routes: Routes = [
  {path:'',redirectTo:'/monitoreo',pathMatch:'full'},
  {path:'monitoreo', component:MonitoreoComponent}
];

// {path:'',redirectTo:'/stepper',pathMatch:'full'},
// {path:'repair', component:RepairComponent},
// {path:'conteo', component:ConteoT24Component},
// {path:'stepper', component:StepperComponent},
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
