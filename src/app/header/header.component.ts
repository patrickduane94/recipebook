import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../datastorage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuth=false;
    private userSub: Subscription;

    constructor(private dss: DataStorageService, private as: AuthService) {}

    ngOnInit(){
        this.userSub=this.as.user.subscribe(user=>{
            this.isAuth=!!user;
        });
    }
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onLogout(){
        this.as.logout();
    }
}