import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Subject } from '../../core/models/object-model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectCrudService {
  subject_url = environment.server_url + '/subjects/';
  subjects$ = new BehaviorSubject<Subject[]>([]);
  apiService = inject(ApiService);

  constructor() {}

  clearItems() {
    this.subjects$.next([]);
  }
  getItems(): Subject[] {
    return this.subjects$.getValue();
  }

  getAllSubjects(): Observable<Subject[]> {
    this.clearItems();
    return this.apiService.get(this.subject_url).pipe(
      map((data) => {
        return data;
      }),
      tap((subjects) => {
        if (subjects) {
          this.subjects$.next(subjects);
        }
      })
    );
  }
  getSubjectPerId(id: number): Observable<Subject> {
    return this.apiService.get(this.subject_url + id);
  }
  addItem(subject: Subject) {
    let currentItems = this.getItems();
    currentItems.push(subject);
    this.subjects$.next(currentItems);
  }
  addSubject(subItem: Subject): Observable<Subject> {
    return this.apiService.post(this.subject_url, subItem).pipe(
      tap((subject) => {
        if (subject) {
          this.addItem(subject);
        }
      })
    );
  }
  updateItem(id: number, Item: Subject) {
    let currentItems = this.getItems();
    if (currentItems.length > 0) {
      let index = currentItems.findIndex((item) => item.id == id);
      if (index >= 0) {
        currentItems[index] = Item;
        this.subjects$.next(currentItems);
        return true;
      }
    }
    return false;
  }
  updateSubject(subId: number, subItem: Subject): Observable<Subject> {
    return this.apiService.put(this.subject_url + subId, subItem).pipe(
      tap((subject) => {
        if (subject) {
          this.updateItem(subId, subject);
        }
      })
    );
  }

  deleteItem(id: number) {
    let currentItems = this.getItems();
    if (currentItems.length > 0) {
      let index = currentItems.findIndex((item) => item.id == id);
      if (index >= 0) {
        currentItems.splice(index, 1);
        this.subjects$.next(currentItems);
        return true;
      }
    }
    return false;
  }
  deleteSubject(subId: number) {
    return this.apiService.delete(this.subject_url + subId).pipe(
      tap((subject) => {
        if (subject) {
          this.deleteItem(subId);
        }
      })
    );
  }
}
