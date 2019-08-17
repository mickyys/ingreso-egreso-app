import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducers } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticasComponent,
    IngresoEgresoComponent,
    OrdenIngresoEgresoPipe    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducers)
  ],
  exports :[
    DashboardComponent
  ]
})
export class IngresoEgresoModule { }
