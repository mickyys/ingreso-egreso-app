import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
 
  public nombre : string;
  public subscription : Subscription = new Subscription();
  
  constructor(private authService : AuthService, private ingresoEgresoService : IngresoEgresoService, private store : Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(
      auth => {
        this.nombre = auth.user.nombre;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(){
    this.ingresoEgresoService.cancelarSubscription();
    this.authService.logout();
  }

}
