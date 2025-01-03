import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, User } from '../../core/models/object-model';
import { ImgpathPipe } from '../../shared/pipes/imgpath.pipe';
import { LoginSignoutService } from '../../admin/service/login-signout.service';
import { UserCrudService } from '../../admin/service/user-crud.service';

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
  userCrudService = inject(UserCrudService);
  courseId$: Observable<string>;
  courseId!: number;
  route = inject(ActivatedRoute);
  courseInfo!: Course;

  authImg = '';
  userCourses: Course[] = [];
  currentUser!: User;

  register = false;
  constructor() {
    this.courseId$ = this.route.params.pipe(map((params) => params['id']));
  }
  ngOnInit(): void {
    this.courseId$.subscribe((id) => {
      this.courseId = +id;
    });

    this.getCourseDetails();

    this.getUserInfo();

    setTimeout(() => {
      this.checkUserEnrolled();
    }, 200);
  }
  getCourseDetails() {
    this.coursesService.getCoursePerId(this.courseId).subscribe((data) => {
      this.courseInfo = data;
    });
  }

  getUserInfo() {
    let user: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUser = user;
 
    if (user.role == 'student') {
      this.userCrudService.getUserPerId(user.id!).subscribe((data) => {
        this.userCourses = data.courses;
      });
    }
  }

  checkUserEnrolled() {
    let index = this.userCourses.findIndex((item) => {
      return item.id == this.courseId;
    });
    if (index >= 0) {
      this.register = true;
    }
    return index;
  }
  
  enroll(course: Course) {

    if (!this.currentUser.name) {
      this.router.navigate(['auth']);
      return false
    }
    let index = this.checkUserEnrolled();
    if (index >= 0) {
      alert('you already enrolled');
    } else {
      this.userCourses.push(course);
      let userInfo = {
        ...this.currentUser,
        courses: this.userCourses,
      };
      this.userCrudService
        .updateUser(this.currentUser.id!, userInfo)
        .subscribe();
    }
    this.register = true;
    return true
  }
}
