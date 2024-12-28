import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, User } from '../../core/models/object-model';
import { ImgpathPipe } from '../../shared/pipes/imgpath.pipe';
import { LoginSignoutService } from '../../admin/service/login-signout.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [ImgpathPipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  router = inject(Router);
  coursesService = inject(CourseService);
  courseId$: Observable<string>;
  courseId!: number;
  route = inject(ActivatedRoute);
  courseInfo!: Course;

  authImg = '';
  constructor() {
    this.courseId$ = this.route.params.pipe(map((params) => params['id']));
  }
  ngOnInit(): void {
    this.courseId$.subscribe((id) => {
      this.courseId = +id;
    });

    this.getCourseDetails();
  }
  getCourseDetails() {
    this.coursesService.getCoursePerId(this.courseId).subscribe((data) => {
      this.courseInfo = data;
    });
  }

  // enroll() {
  //   let user: User = JSON.parse(localStorage.getItem('user') || '{}');

  //   if (!user.name) {
  //     this.router.navigate(['auth']);
  //   }
  // }
}
