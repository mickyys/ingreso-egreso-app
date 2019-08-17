import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivarLoadingAccion, DesactivarLoadingAccion } from '../shared/ui.actions';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription : Subscription = new Subscription();
  private usuario : User;

  constructor(private afAuth : AngularFireAuth
            , private router : Router
            , private afBD : AngularFirestore
            , private store : Store<AppState>
            ) { }

  initAuthListener(){
       this.afAuth.authState.subscribe(
          (fbUser : firebase.User) => {
            if(fbUser){
              this.userSubscription = this.afBD.doc(`${fbUser.uid}/usuario`).valueChanges()
                .subscribe(
                  (objUser : any) => {
                    const user = new User(objUser);
                    this.store.dispatch(new SetUserAction(user));
                    this.usuario = user;
                  }
                ) 
            }
            else{
              this.usuario = null;
              this.userSubscription.unsubscribe();
            }
          }
        )
  }

  crearUsuario(nombre : string, email : string, password : string){

    this.store.dispatch(new ActivarLoadingAccion());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email,password)
      .then(
        res => {
          console.log(res);  

          const user : User = {
            uid : res.user.uid,
            nombre : nombre,
            email : res.user.email
          }

          this.afBD.doc(`${user.uid}/usuario`)
            .set(user)
            .then(()=>{
              this.store.dispatch(new DesactivarLoadingAccion());
              this.router.navigate(['/']);
            });          
        })
      .catch(
        err => { 
          console.error(err)
          Swal.fire('Error en Login', err .message, 'error');
          this.store.dispatch(new DesactivarLoadingAccion());
        })
  }

  login(email : string, password : string){
    this.store.dispatch(new ActivarLoadingAccion());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(
        res => {
          console.log(res);
          this.router.navigate(['/']);
          this.store.dispatch(new DesactivarLoadingAccion());
        }
      )
      .catch(
        err => {
          console.error(err);
          Swal.fire('Error en Login', err .message, 'error');
          this.store.dispatch(new DesactivarLoadingAccion());
        }
      )
  }

  logout(){
    this.afAuth.auth.signOut();    
    this.router.navigate(['/login']);

    this.store.dispatch(new UnSetUserAction());
  }

  isAuth(){
      return this.afAuth.authState.pipe(
        map(
          fbUser => {
            if(fbUser == null){
              this.router.navigate(['/login']);
            }
            return fbUser != null
          }
        )
      );
  }

  getUsuario(){
    return {... this.usuario };
  }
}
