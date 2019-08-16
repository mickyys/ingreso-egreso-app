import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public isLoading : boolean = false;
  private subscription : Subscription;

  constructor(private authService : AuthService
             ,private store : Store<AppState>
    ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(
      ui => {
        this.isLoading = ui.isLoading
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form : any ){
    this.authService.crearUsuario(form.nombre, form.email, form.password);    
  }

}
