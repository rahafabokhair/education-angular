import { Component, inject, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from '../course/subject/subject.component';
import { CoursesListComponent } from '../course/courses-list/courses-list.component';
import { CourseItemComponent } from '../course/course-item/course-item.component';
import { Course } from '../core/models/object-model';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule, SubjectComponent, CourseItemComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  courseService = inject(CourseService);
  courseList: Course[] = [];
  constructor() {}
  ngOnInit(): void {
    this.getAllCourses();
    this.courseService.courses$.subscribe((resData) => {
      this.courseList = resData.slice(0, 6);
    });
  }
  getAllCourses() {
    this.courseService.getAllCourses([], [], []).subscribe((data) => {
      this.courseList = data.slice(0, 6);
    });
  }
}
