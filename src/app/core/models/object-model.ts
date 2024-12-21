export class Course {
  constructor(
    public title: string,
    public startDate: Date,
    public endDate: Date,
    public duration: string,
    public authors: Author[],
    public description: string,
    public price: string,
    public coursePhoto: string,
    public courseDetPhoto: string,
    public subjectId: number,
    public Level: Level,
    public language: Language,

    public isTopRated?: string,
    public studentNum?: string,
    public id?: number
  ) {}
}
export class Subject {
  constructor(
    public name: string,
    public count: string,
    public image: string,
    public checked: boolean,
    public id?: number
  ) {}
}

export class Author {
  constructor(
    public firstName: string,
    public lastName: string,
    public photo: string,
    public id?: number
  ) {}
}
export class Level {
  constructor(
    public name: string,
    public checked: boolean,
    public id?: number
  ) {}
}
export class Language {
  constructor(
    public name: string,
    public checked: boolean,
    public id?: number
  ) {}
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public mobNumber: string,
    public gender: string,
    public role: string,
    public age: string,
     public image: string,
    public id?: number,
   
  ) {}
}
