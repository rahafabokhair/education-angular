import { Component, inject, OnInit } from '@angular/core';
import { Course, User } from '../../core/models/object-model';
import { CourseService } from '../../shared/services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-courses-list',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './user-courses-list.component.html',
  styleUrl: './user-courses-list.component.css',
})
export class UserCoursesListComponent implements OnInit {
  userCoursesList: Course[] = [];
  courseService = inject(CourseService);

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');

    this.courseService.getUserCourses(user)?.subscribe((data) => {
      this.userCoursesList = data.courses;
    });
  }
}
