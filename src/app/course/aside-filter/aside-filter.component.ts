import { Component, inject } from '@angular/core';
import { MainListsService } from '../../shared/services/main-lists.service';
import { Language, Level, Subject } from '../../core/models/object-model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CourseService } from '../../shared/services/course.service';

@Component({
  selector: 'app-aside-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './aside-filter.component.html',
  styleUrl: './aside-filter.component.css',
})
export class AsideFilterComponent {
  mainListsService = inject(MainListsService);
  courseService = inject(CourseService);
  fb = inject(FormBuilder);
  levelsList: Level[] = [];
  langList: Language[] = [];
  subjectList: Subject[] = [];

  subjFilterItems: any = [];
  langFilterItems: any = [];
  levelFilterItems: any = [];

  myForm!: FormGroup;

  // subjectId!: number;
  constructor() {
    this.myForm = this.fb.group({
      subjectF: this.fb.array([]),
      levelF: this.fb.array([]),
      langF: this.fb.array([]),
    });

    this.mainListsService.getAllSubjects().subscribe((subject) => {
      this.subjectList = subject;
    });

    this.mainListsService.getAllLanguage().subscribe((lang) => {
      this.langList = lang;
    });

    this.mainListsService.getAllLevels().subscribe((level) => {
      this.levelsList = level;
    });
  }

  onChangeSubject(subject: any, isChecked: boolean) {
    this.subjFilterItems = <FormArray>this.myForm.controls?.['subjectF'];
    if (subject && isChecked) {
      this.subjFilterItems.push(new FormControl(subject));
    } else {
      let index = this.subjFilterItems.controls.findIndex(
        (x: any) => x.value == subject
      );
      this.subjFilterItems.removeAt(index);
    }
  }
  onChangeLevel(level: any, isChecked: boolean) {
    this.levelFilterItems = <FormArray>this.myForm.controls?.['levelF'];
    if (level && isChecked) {
      this.levelFilterItems.push(new FormControl(level));
    } else {
      let index = this.levelFilterItems.controls.findIndex(
        (x: any) => x.value == level
      );
      this.levelFilterItems.removeAt(index);
    }
  }

  onChangeLang(lang: any, isChecked: boolean) {
    this.langFilterItems = <FormArray>this.myForm.controls?.['langF'];
    if (lang && isChecked) {
      this.langFilterItems.push(new FormControl(lang));
    } else {
      let index = this.langFilterItems.controls.findIndex(
        (x: any) => x.value == lang
      );
      this.langFilterItems.removeAt(index);
    }
  }

  onFilter() {
    this.courseService
      .getAllCourses(
        this.subjFilterItems.value,
        this.langFilterItems.value,
        this.levelFilterItems.value
      )
      .subscribe();
  }
}
