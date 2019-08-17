import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Subscription } from 'rxjs';
import { ActivarLoadingAccion, DesactivarLoadingAccion } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
 

  public form : FormGroup;
  public tipo : string = 'ingreso';

  loading : boolean = false;
  loadSubscription : Subscription = new Subscription();

  constructor(private ingresoEgresoService : IngresoEgresoService, private store : Store<AppState>) { }

  ngOnInit() {

    this.loadSubscription = this.store.select('ui')
      .subscribe( ui => {
        this.loading = ui.isLoading;
      });

    this.form = new FormGroup({
      descripcion : new FormControl('', Validators.required),
      monto : new FormControl(0, Validators.min(1)),
    })
  }

  ngOnDestroy(): void {
    this.loadSubscription.unsubscribe();
  }

  OnSubmit(){

    this.store.dispatch(new ActivarLoadingAccion());

    const ingresoEgreso = new IngresoEgreso({
      ...this.form.value,  tipo : this.tipo
    });

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( ()=>{
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.form.reset({ monto : 0 });
        this.store.dispatch(new DesactivarLoadingAccion());
      }
    )
    .catch( (err)=>{
      Swal.fire('Error', err, 'error');
      this.store.dispatch(new DesactivarLoadingAccion());
    })
  }

}
