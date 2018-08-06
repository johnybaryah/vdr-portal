import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../_models/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(this.tokenExists());

    constructor(private http: HttpClient, private _user: UserService) { }

    private tokenExists(): boolean {
      return localStorage.getItem('currentUser') !== null;
    }

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                    this.loggedIn.next(true);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
