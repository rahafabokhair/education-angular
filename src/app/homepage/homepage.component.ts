import { Component, inject, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from "../course/subject/subject.component";
import { CoursesListComponent } from "../course/courses-list/courses-list.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule, SubjectComponent, CoursesListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  
  constructor() {}
  ngOnInit(): void {
 
  }
}
