import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import{catchError, tap} from 'rxjs/operators';
import { BehaviorSubject, throwError } from "rxjs";
import {User} from './user.model';
import { Router } from "@angular/router";

export interface AuthResponse{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    private tokenTimer: any;
    user= new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router){}
    signup(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu4D_YDFakz_vFRgTt-NLxLCzo_RhUMTk',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.manageError), tap(res =>{
            this.manageAuth(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }
    signin(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu4D_YDFakz_vFRgTt-NLxLCzo_RhUMTk',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.manageError), tap(res =>{
            this.manageAuth(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }
    private manageError(errorResponse: HttpErrorResponse){
        let errorMessage='An unkown error has occurred.';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='This email is already associated with an account.';
        }
        return throwError(errorMessage);
    }
    private manageAuth(email: string, id: string, token: string, expiresIn: number){
        const expiration=new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(email, id, token, expiration);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userdata', JSON.stringify(user));
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/authentication']);
        localStorage.removeItem('userdata');
        if(this.tokenTimer){
            clearTimeout(this.tokenTimer);
        }
        this.tokenTimer=null;
    }
    autoLogin(){
        const userdata: {
            email: string;
            id: string;
            _token: string;
            _tokenExpire: string;
        }=JSON.parse(localStorage.getItem('userdata'));
        if(!userdata){
            return;
        }
        const currentUser=new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpire));
        if(currentUser.token){
            this.user.next(currentUser);
            const expire=new Date(userdata._tokenExpire).getTime()-new Date().getTime();
            this.autoLogout(expire);
        }
    }
    autoLogout(expiration: number){
        this.tokenTimer=setTimeout(() =>{
            this.logout();
        }, expiration);
    }
    
}