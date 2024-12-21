import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

import {
  FormBuilder,

  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchText = '';
  router = inject(Router);
  fb = inject(FormBuilder);
  courseService = inject(CourseService);

  // searchField: FormControl;
  // serchForm: FormGroup;

  constructor() {
    // this.searchField = new FormControl();
    // this.serchForm = this.fb.group({ search: this.searchField });

    // this.searchField.valueChanges
    //   .pipe(debounceTime(400))
    //   .subscribe((result: any) => {
    //     console.log(result);
    //     this.searchService.onSearchVal.next(result);
    //   });
  }
  searchProduct() {
    
     this.courseService.onSearchVal.next(this.searchText);
    

    this.router.navigateByUrl('courses');
    // this.productService.onSearchVal.next('');
  }
}
