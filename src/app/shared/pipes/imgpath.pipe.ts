import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgpath',
  standalone: true,
})
export class ImgpathPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.replace('C:\\fakepath\\', '../imagesUp/');
  }
}
