import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { ChartType } from 'chart.js';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {

  ingresos : number;
  egresos : number;

  cantidadIngresos : number;
  cantidadEgresos : number;

  subscription : Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number [] = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store : Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
                              .subscribe( ingresoEgreso => {
                                  this.contarIngresoEgreso(ingresoEgreso.items)
                              });
  }

  contarIngresoEgreso(items : IngresoEgreso[]){
      this.ingresos = 0;
      this.egresos = 0;

      this.cantidadEgresos = 0;
      this.cantidadIngresos = 0;

      items.forEach( item =>{
        if(item.tipo === 'ingreso'){
          this.cantidadIngresos ++;
          this.ingresos += item.monto;
        }else{
          this.cantidadEgresos ++;
          this.egresos += item.monto;
        }
      });

      this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
