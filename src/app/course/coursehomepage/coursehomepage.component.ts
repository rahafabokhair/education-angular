import { Component } from '@angular/core';
import { AsideFilterComponent } from "../aside-filter/aside-filter.component";
import { CoursesListComponent } from "../courses-list/courses-list.component";
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-coursehomepage',
  standalone: true,
  imports: [AsideFilterComponent, CoursesListComponent],
  templateUrl: './coursehomepage.component.html',
  styleUrl: './coursehomepage.component.css'
})
export class CoursehomepageComponent {

}
