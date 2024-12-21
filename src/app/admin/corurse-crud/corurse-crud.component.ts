import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  Author,
  Course,
  Language,
  Level,
  Subject,
} from '../../core/models/object-model';
import { CourseCrudService } from '../service/course-crud.service';
import { BehaviorSubject } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corurse-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './corurse-crud.component.html',
  styleUrl: './corurse-crud.component.css',
})
export class CorurseCrudComponent implements OnInit {
  courseService = inject(CourseCrudService);
  formBuilder = inject(FormBuilder);
  @ViewChild('closeUpdateAdd') closeUpdateAdd: any;
  @ViewChild('closebutton') closebutton: any;
  courseList: Course[] = [];

  addEditCourse = false;

  updatedCourseId!: number;
  deletedCourseId!: number;
  courseList$ = new BehaviorSubject<Course[]>([]);

  courseForm!: FormGroup;
  courseFormData!: Course;
  crsUpdateData!: any;
  authimageName = '';
  courseimageName = '';
  courseDetimageName = '';
  subjectList: Subject[] = [];
  levelList: Level[] = [];
  languageList: Language[] = [];
  author: Author[] = [];

  ngOnInit(): void {
    this.courseList$.subscribe((resData) => {
      this.courseList = resData;
    });

    this.courseService.getAllSubjects().subscribe((subData) => {
      this.subjectList = subData;
    });

    this.courseService.getAllLevels().subscribe((levelData) => {
      this.levelList = levelData;
    });

    this.courseService.getAllLanguages().subscribe((langData) => {
      this.languageList = langData;
    });
    this.CourseFormBuild();
    this.getAllCourses();
  }
  CourseFormBuild() {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      authorFName: ['', Validators.required],
      authorLName: ['', Validators.required],
      authorPhoto: [],
      coursePhoto: [],
      courseDetPhoto: [],
      subject: ['', Validators.required],
      level: ['', Validators.required],
      language: ['', Validators.required],
      isTopRated: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe((resData) => {
      this.courseList = resData;
    });
  }

  OnAddCoursePopup() {
    this.addEditCourse = false;
    this.courseForm.reset();
  }

  calculateDuration(
    startDate: Date,
    endDate: Date
  ): { months: number; days: number } {
    let months: number;
    let days: number;

    // Ensure the endDate is later than the startDate
    if (startDate > endDate) {
      // Swap dates if the start date is later
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    // Calculate difference in months
    months =
      endDate.getFullYear() * 12 +
      endDate.getMonth() -
      (startDate.getFullYear() * 12 + startDate.getMonth());

    // Calculate the difference in days
    const startDateCopy = new Date(startDate);
    startDateCopy.setMonth(startDateCopy.getMonth() + months);
    days = Math.floor(
      (endDate.getTime() - startDateCopy.getTime()) / (1000 * 3600 * 24)
    );

    return { months, days };
  }

  addNewCourse() {
    let endDate = new Date(this.courseForm.value.endDate);
    let startDate = new Date(this.courseForm.value.startDate);

    let durationObj = this.calculateDuration(startDate, endDate);
    let duration = `${durationObj.months} months and ${durationObj.days} days`;

    if (!this.courseForm.valid) {
      return;
    }

    this.courseFormData = {
      title: this.courseForm.value.title,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
      duration: duration,
      authors: [
        {
          firstName: this.courseForm.value.authorFName,
          lastName: this.courseForm.value.authorLName,
          photo: this.courseForm.value.authorPhoto
            ? this.courseForm.value.authorPhoto
            : '',
        },
      ],
      description: this.courseForm.value.description,
      price: this.courseForm.value.price,
      coursePhoto: this.courseForm.value.coursePhoto
        ? this.courseForm.value.coursePhoto
        : '',
      courseDetPhoto: this.courseForm.value.courseDetPhoto
        ? this.courseForm.value.courseDetPhoto
        : '',
      subjectId: this.courseForm.value.subject,
      Level: this.courseForm.value.level,
      language: this.courseForm.value.language,
      isTopRated: this.courseForm.value.isTopRated,
      studentNum: this.courseForm.value.studentNum,
    };
    this.courseService.addCourse(this.courseFormData).subscribe((data) => {
      if (data) {
        this.closeUpdateAdd.nativeElement.click();
        alert('course added successfuly');
      }
    });
  }
  OnUpdateCoursePopup(courseId: number) {
    this.updatedCourseId = courseId;
    this.addEditCourse = true;

    this.courseService.getCoursePerId(courseId).subscribe((crsData) => {
      this.authimageName = crsData.authors[0].photo.toString();
      this.courseimageName = crsData.coursePhoto.toString();
      this.courseDetimageName = crsData.courseDetPhoto.toString();

      this.crsUpdateData = {
        title: crsData.title,
        startDate: crsData.startDate,
        endDate: crsData.endDate,
        duration: '',
        authorFName: crsData.authors[0].firstName,
        authorLName: crsData.authors[0].lastName,
        authorPhoto: '',

        coursePhoto: '',
        courseDetPhoto: '',

        subject: crsData.subjectId,
        level: crsData.Level,
        language: crsData.language,
        isTopRated: crsData.isTopRated,
        description: crsData.description,
        price: crsData.price,
      };
      this.courseForm.patchValue(this.crsUpdateData);
    });
  }
  updateProduct() {
    let endDate = new Date(this.courseForm.value.endDate);
    let startDate = new Date(this.courseForm.value.startDate);

    let durationObj = this.calculateDuration(startDate, endDate);
    let duration = `${durationObj.months} months and ${durationObj.days} days`;

    if (!this.courseForm.valid) {
      return;
    }

    let formUpdatedVal: Course = {
      title: this.courseForm.value.title,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
      duration: duration,
      authors: [
        {
          firstName: this.courseForm.value.authorFName,
          lastName: this.courseForm.value.authorLName,
          photo:
            this.courseForm.value.authorPhoto == ''
              ? this.authimageName
              : this.courseForm.value.authorPhoto,
        },
      ],
      description: this.courseForm.value.description,
      price: this.courseForm.value.price,
      coursePhoto:
        this.courseForm.value.coursePhoto == ''
          ? this.courseimageName
          : this.courseForm.value.coursePhoto,
      courseDetPhoto:
        this.courseForm.value.courseDetPhoto == ''
          ? this.courseDetimageName
          : this.courseForm.value.courseDetPhoto,
      subjectId: this.courseForm.value.subject,
      Level: this.courseForm.value.level,
      language: this.courseForm.value.language,
      isTopRated: this.courseForm.value.isTopRated,
      studentNum: this.courseForm.value.studentNum,
    };
    this.courseService
      .updateCourse(this.updatedCourseId, formUpdatedVal)
      .subscribe((res) => {
        if (res) {
          this.closeUpdateAdd.nativeElement.click();
          alert('course updated successfuly');
        }
      });
  }

  onDeletePopup(courseId: number) {
    this.deletedCourseId = courseId;
  }
  deletProduct() {
    this.courseService.deleteCourse(this.deletedCourseId).subscribe((res) => {
      console.log(res);
      this.closebutton.nativeElement.click();
    });
  }
  uploadImage(event: any) {
    //this.file = event.target.files[0];
  } 
  get f(): { [key: string]: AbstractControl } {
    return this.courseForm.controls;
  }
}
