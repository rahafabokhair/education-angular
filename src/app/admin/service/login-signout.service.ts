import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../core/models/object-model';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginSignoutService {
  apiUrl = environment.server_url + '/user/';
  apiService = inject(ApiService);

  constructor() {}

  Login(email: string, password: string): Observable<any> {
    return this.apiService.get(
      this.apiUrl + '?email=' + email + '&password=' + password
    );
  }
  signup(userData: User): Observable<User> {
    return this.apiService.post(this.apiUrl, userData);
  }
}
