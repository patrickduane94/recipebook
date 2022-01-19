import { Component } from "@angular/core";
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import { AuthService, AuthResponse } from './auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLogin=true;
    isLoading=false;
    error: string='';
    constructor(private as: AuthService, private router: Router){}

    switchMode(){
        this.isLogin=!this.isLogin;
    }
    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;

        let authState: Observable<AuthResponse>;

        this.isLoading=true;
        if(this.isLogin){
            authState=this.as.signin(email, password);
        }
        else{
            authState=this.as.signup(email, password);
        }
        authState.subscribe(response => { 
            console.log(response);
            this.isLoading=false;
            this.router.navigate(['/recipes']);
        },
        errorResponse => {
            this.error='An unknown error occurred.';
            console.log(errorResponse);
            this.isLoading=false;
        }
        );
        form.reset();
    }
}