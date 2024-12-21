import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesListComponent } from './course/courses-list/courses-list.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { SubjectComponent } from './course/subject/subject.component';
import { CoursehomepageComponent } from './course/coursehomepage/coursehomepage.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CorurseCrudComponent } from './admin/corurse-crud/corurse-crud.component';
import { SubjectCrudComponent } from './admin/subject-crud/subject-crud.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'courses', component: CoursehomepageComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'subject/:id', component: CoursesListComponent },
  { path: 'auth', component: SigninSignupComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'course-crud', component: CorurseCrudComponent },
  { path: 'subject-crud', component: SubjectCrudComponent },
  { path: 'user-crud', component: UserCrudComponent },
];
