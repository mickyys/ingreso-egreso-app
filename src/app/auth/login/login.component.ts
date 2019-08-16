import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
   
  public isLoading : boolean = false;
  private subscription : Subscription;

  constructor(private authService : AuthService,private store : Store<AppState>) { }

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

  onSubmit(form){
    this.authService.login(form.email, form.password);
  }

}
