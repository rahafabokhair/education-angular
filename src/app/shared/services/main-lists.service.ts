import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import {
  Course,
  Language,
  Level,
  Subject,
} from '../../core/models/object-model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MainListsService {
  apiService = inject(ApiService);
  subject_url = environment.server_url + '/subjects/';
  Level_url = environment.server_url + '/Level/';
  Language_url = environment.server_url + '/Language/';

  constructor() {}
  getAllSubjects(): Observable<Subject[]> {
    return this.apiService.get(this.subject_url);
  }
  getAllLevels(): Observable<Level[]> {
    return this.apiService.get(this.Level_url);
  }
  getAllLanguage(): Observable<Language[]> {
    return this.apiService.get(this.Language_url);
  }
}
