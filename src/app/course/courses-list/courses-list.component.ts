import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { Course } from '../../core/models/object-model';
import { CourseItemComponent } from '../course-item/course-item.component';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { AsideFilterComponent } from '../aside-filter/aside-filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CourseItemComponent, FilterPipe, CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent implements OnInit {
  courseService = inject(CourseService);
  route = inject(ActivatedRoute);
  coursesList: Course[] = [];
  subjectId$: Observable<string>;
  subjectId!: number;

  searchText = '';
  showFilter = false;
  constructor() {
    this.subjectId$ = this.route.params.pipe(map((params) => params['id']));
    this.showFilter = true;
  }

  ngOnInit(): void {
    this.subjectId$.subscribe((subId) => {
      this.subjectId = +subId;
    });

    this.courseService.onSearchVal.subscribe((data) => {
      this.searchText = data;

      setTimeout(() => {
        this.getAllCourses();
      }, 20);
    });

    this.courseService.courses$.subscribe((resData) => {
      this.coursesList = resData;
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses([], [], []).subscribe((data) => {
      if (this.subjectId) {
        this.coursesList = data.filter((course) => {
          return course.subjectId == this.subjectId;
        });
      } else {
        this.coursesList = data;
      }
    });
  }
}
