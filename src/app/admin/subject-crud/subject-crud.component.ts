import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { SubjectCrudService } from '../service/subject-crud.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from '../../core/models/object-model';
import { CommonModule } from '@angular/common';
import { ImgpathPipe } from '../../shared/pipes/imgpath.pipe';
import { count } from 'console';

@Component({
  selector: 'app-subject-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ImgpathPipe],
  templateUrl: './subject-crud.component.html',
  styleUrl: './subject-crud.component.css',
})
export class SubjectCrudComponent implements OnInit {
  subjectService = inject(SubjectCrudService);
  formBuilder = inject(FormBuilder);
  subjectList: Subject[] = [];
  subForm!: FormGroup;
  addEditSubject = false;
  imageName = '';
  subFormVal: any;

  updateSubVal: any;
  updateSubId!: number;
  delSubId!: number;
  @ViewChild('closeUpdateAdd') closeUpdateAdd: any;
  @ViewChild('closebutton') closebutton: any;
  ngOnInit(): void {
    this.subjectService.subjects$.subscribe((data) => {
      this.subjectList = data;
    });
    this.getAllSubjects();
    this.subFormBuilder();
  }
  subFormBuilder() {
    this.subForm = this.formBuilder.group({
      name: ['', Validators.required],
      count: ['', Validators.required],
      image: [],
    });
  }
  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data) => {
      this.subjectList = data;
    });
  }
  OnAddsubjectPopup() {
    this.addEditSubject = false;
    this.subForm.reset();
  }
  addNewSubject() {

    this.subFormVal = {
      name: this.subForm.value.name,
      count: this.subForm.value.count,
      image: this.subForm.value.image,
      checked: false,
    };
    this.subjectService.addSubject(this.subFormVal).subscribe((data) => {
      if (data) {
        this.closeUpdateAdd.nativeElement.click();
        alert('user added succsessfuly');
      }
    });
  }
  OnUpdateSubPopup(subId: number) {
    this.addEditSubject = true;
    this.updateSubId = subId;
    this.subjectService.getSubjectPerId(subId).subscribe((subjectData) => {
      this.imageName = subjectData.image;
      let tempSubVal = {
        name: subjectData.name,
        count: subjectData.count,
        image: '',
      };

      this.subForm.patchValue(tempSubVal);
    });
  }
  updateProduct() {
    this.updateSubVal = {
      name: this.subForm.value.name,
      count: this.subForm.value.count,
      image:
        this.subForm.value.image == ''
          ? this.imageName
          : this.subForm.value.image,
      checked: false,
    };

    this.subjectService
      .updateSubject(this.updateSubId, this.updateSubVal)
      .subscribe((data) => {
        if (data) {
          this.closeUpdateAdd.nativeElement.click();
          alert('user updated');
        }
      });
  }

  onDeletePopup(id: number) {
    this.delSubId = id;
  }

  deletProduct() {
    this.subjectService.deleteSubject(this.delSubId).subscribe((data) => {
      if (data) {
        this.closebutton.nativeElement.click();
        alert('user Deleted');
      }
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.subForm.controls;
  }
}
