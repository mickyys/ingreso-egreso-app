import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnSetItemsAction } from './ingreso.egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  public ingresoEgresoListenerSubscription : Subscription = new Subscription();
  public ingresoEgresoItemsSubscription : Subscription = new Subscription();

  constructor(private afDB : AngularFirestore
            , private authService : AuthService
            , private store : Store<AppState>
            ) { }

  initIngresoEgresoListener(){
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe(
        auth =>{
          this.ingresoEgresoItems(auth.user.uid);
        }
      )
  }

  private ingresoEgresoItems( uid : string){
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(
          x =>{
            return x.map( doc => {
              return {                
                ...doc.payload.doc.data(),
                uid : doc.payload.doc.id
              }
            })
          }
        )
      )
      .subscribe( (coleccion : any []) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      })
  }

  crearIngresoEgreso(ingresoEgreso : IngresoEgreso){
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso})
      ;      
  }

  borrarIngresoEgreso(uid : string){
    const user = this.authService.getUsuario();
    
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
        .delete();
  }


  cancelarSubscription(){
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.store.dispatch(new UnSetItemsAction());
  }


}
