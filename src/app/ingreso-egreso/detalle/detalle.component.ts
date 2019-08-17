import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { UnSetItemAction } from '../ingreso.egreso.actions';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  items : IngresoEgreso[];
  subscription : Subscription = new Subscription();

  constructor(private store : Store<fromIngresoEgreso.AppState>, private ingresoEgresoService : IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(
        data =>{
          this.items = data.items;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  borrarItem(item : IngresoEgreso){
    
    this.store.dispatch(new UnSetItemAction(this.items,item.uid));

    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
        .then( ()=>{
          Swal.fire('Eliminado', item.descripcion, 'success');
        })
        ;
    
  }

}
