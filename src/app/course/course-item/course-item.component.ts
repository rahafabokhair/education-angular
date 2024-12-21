import { Component, inject, Input } from '@angular/core';
import { Course } from '../../core/models/object-model';
import { Router, RouterLink } from '@angular/router';
import { ImgpathPipe } from '../../shared/pipes/imgpath.pipe';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [RouterLink,ImgpathPipe],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
})
export class CourseItemComponent {
  @Input() course!: Course;
  router = inject(Router);

  // courseDetails() {
  //   this.router.navigate(['course']);
  // }
}
