import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course, Subject } from '../../core/models/object-model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses_url = environment.server_url + '/courses/';
  subject_url = environment.server_url + '/subjects/';

  courses$ = new BehaviorSubject<Course[]>([]);

  apiService = inject(ApiService);
  onSearchVal = new BehaviorSubject<string>('');

  constructor() {}

  clearItems() {
    this.courses$.next([]);
  }

  getAllCourses(
    subjectSearch: string[],
    languageSearch: string[],
    levelSearch: string[]
  ): Observable<Course[]> {
    this.clearItems();

    let params = new HttpParams();

    if (subjectSearch && subjectSearch.length > 0) {
      for (let index = 0; index < subjectSearch.length; index++) {
        params = params.append('subjectId', subjectSearch[index]);
      }
    }
    if (languageSearch && languageSearch.length > 0) {
      for (let index = 0; index < languageSearch.length; index++) {
        params = params.append('language', languageSearch[index]);
      }
    }
    if (levelSearch && levelSearch.length > 0) {
      for (let index = 0; index < levelSearch.length; index++) {
        params = params.append('Level', levelSearch[index]);
      }
    }
    return this.apiService.get(this.courses_url, params).pipe(
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
    return this.apiService.get(this.courses_url + id + '/');
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.apiService.get(this.subject_url);
  }

  search(term: any) {
    debugger;

    this.onSearchVal.next(term);
  }
  // getcoursepersubjectId(subId:number): Observable<Course[]>{
  //   return this.apiService.get(this.courses_url+"?subjectId="+subId);
  // }
}
