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

  //pagenator variables

  paginatedCourses: any[] = [];
  pageSize = 6; // Number of Courses per page
  currentPage = 1; // Current page index
  totalPages = 0;
  pages: number[] = [];
  showPageinator = true;

  constructor() {
    this.subjectId$ = this.route.params.pipe(map((params) => params['id']));

    this.showFilter = true;
  }

  ngOnInit(): void {
   
    
    this.subjectId$.subscribe((subId) => {
      this.subjectId = +subId;
    });
    console.log(this.subjectId);
    this.courseService.onSearchVal.subscribe((data) => {
      this.searchText = data;

      setTimeout(() => {
        this.getAllCourses();
      }, 20);
    });

    this.courseService.courses$.subscribe((resData) => {
      this.coursesList = resData;
      this.updatePagination();
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

  // pagenator part
  updatePagination(): void {
    this.showPageinator = true;
    this.totalPages = Math.ceil(this.coursesList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedCourses();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedCourses();
  }

  updatePaginatedCourses(): void {
    const startIndex = (this.currentPage - 1) *  this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCourses = this.coursesList.slice(startIndex, endIndex);
    
    if (this.coursesList.length > 0 && this.searchText =='' &&!this.subjectId) {
      this.showPageinator = false;
    }
  }
}
