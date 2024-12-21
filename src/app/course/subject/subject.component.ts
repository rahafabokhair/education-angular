import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../shared/services/course.service';
import { Subject } from '../../core/models/object-model';
import { RouterLink } from '@angular/router';
import { ImgpathPipe } from '../../shared/pipes/imgpath.pipe';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [RouterLink, ImgpathPipe],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent implements OnInit {
  courseService = inject(CourseService);
  subjectList: Subject[] = [];
  ngOnInit(): void {
    this.getAllSubjects();
  }
  getAllSubjects() {
    this.courseService.getAllSubjects().subscribe((data) => {
      this.subjectList = data;
    });
  }
}
