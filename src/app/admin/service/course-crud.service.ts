import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course, Subject } from '../../core/models/object-model';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CourseCrudService {
  courses_url = environment.server_url + '/courses/';
  subject_url = environment.server_url + '/subjects/';
  level_url = environment.server_url + '/Level/';
  language_url = environment.server_url + '/Language/';

  courses$ = new BehaviorSubject<Course[]>([]);
  apiService = inject(ApiService);
  constructor() {}
  getAllSubjects(): Observable<Subject[]> {
    return this.apiService.get(this.subject_url);
  }
  getAllLevels(): Observable<Subject[]> {
    return this.apiService.get(this.level_url);
  }
  getAllLanguages(): Observable<Subject[]> {
    return this.apiService.get(this.language_url);
  }
  clearItems() {
    this.courses$.next([]);
  }
  getItems(): Course[] {
    return this.courses$.getValue();
  }

  getAllCourses(): Observable<Course[]> {
    this.clearItems();

    return this.apiService.get(this.courses_url).pipe(
      map((data) => {
        return data;
      }),
      tap((courses: Course[]) => {
        if (courses) {
          this.courses$.next(courses);
        }
      })
    );
  }

  getCoursePerId(id: number): Observable<Course> {
    return this.apiService.get(this.courses_url + id);
  }
  addItem(course: Course) {
    let currentItems = this.getItems();
    currentItems.push(course);
    this.courses$.next(currentItems);
  }

  addCourse(course: Course): Observable<Course[]> {
    return this.apiService.post(this.courses_url, course).pipe(
      tap((courses: Course[]) => {
        if (courses) {
          this.addItem(course);
        }
      })
    );
  }

  updateItem(courseId: number, courseItem: Course) {
    let currentItems = this.getItems();
    if (currentItems.length > 0) {
      let index = currentItems.findIndex((item) => item.id == courseId);

      if (index >= 0) {
        currentItems[index] = courseItem;
        this.courses$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  updateCourse(courseId: number, course: Course): Observable<Course> {
    return this.apiService.put(this.courses_url + courseId, course).pipe(
      tap((data: Course) => {
        if (data) {
          this.updateItem(courseId, data);
        }
      })
    );
  }

  deleteItem(courseId: number) {
    let currentItems = this.getItems();
    if (currentItems.length > 0) {
      let index = currentItems.findIndex((item) => item.id == courseId);

      if (index >= 0) {
        currentItems.splice(index, 1);
        this.courses$.next(currentItems);
        return true;
      }
    }
    return false;
  }
  deleteCourse(courseId: number): Observable<Course> {
    return this.apiService.delete(this.courses_url + courseId).pipe(
      tap((data: Course) => {
        if (data) {
          this.deleteItem(courseId);
        }
      })
    );
  }


 
}
