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
import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { UserCoursesListComponent } from './course/user-courses-list/user-courses-list.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'courses',
    component: CoursehomepageComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  { path: 'coursesList', component: UserCoursesListComponent },

  {
    path: 'subject',
    component: SubjectComponent,
  },
  { path: 'subject/:id', component: CoursesListComponent },

  { path: 'auth', component: SigninSignupComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'course',
        pathMatch: 'full',
      },
      {
        path: 'course',
        component: CorurseCrudComponent,
      },
      {
        path: 'subject',
        component: SubjectCrudComponent,
      },
      { path: 'user', component: UserCrudComponent },
    ],
  },

  { path: 'not-found', component: PageNotFoundComponent },

  { path: '**', redirectTo: '/not-found' },
  // {
  //   path: 'subject-crud',
  //   component: SubjectCrudComponent,
  //   canActivate: [AuthGuard],
  // },
];
