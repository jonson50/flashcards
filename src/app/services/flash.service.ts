import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFlash } from '../models/flash.model';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root',
})
export class FlashService {
  flashs: IFlash[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: getRandomNumber(),
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: getRandomNumber(),
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber(),
    },
  ];
  flash$ = new BehaviorSubject<IFlash[]>(this.flashs);

  constructor() {}

  addFlash(flash: any) {
    // const f: IFlash = {
    //   id: getRandomNumber(),
    //   show: false,
    //   ...flash,
    // };
    this.flashs = [
      ...this.flashs,
      {
        ...flash,
        show: false,
        id: getRandomNumber()
      }
    ];
    console.log(this.flashs);
    //this.flashs.push(f);#
    this.flash$.next(this.flashs);
  }

  toggleFlash(id: number) {
    // const flash = this.flashs.find((flash) => flash.id === id);
    // flash!.show = !flash?.show;
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1 )
    ];
    this.flash$.next(this.flashs);
  }

  deleteFlash(id: number) {
    // const flashId = this.flashs.findIndex((flash) => flash.id === id);
    // this.flashs.splice(flashId, 1);
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice( index + 1 )
    ];
    this.flash$.next(this.flashs);
  }

  rememberedChange(id: number, flag:any) {
    const index = this.flashs.findIndex((flash) => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice( index + 1 )
    ];
    this.flash$.next(this.flashs);
  }

  updateFlash(id: number, iflash: any) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...iflash
      },
      ...this.flashs.slice( index + 1 )
    ];
    this.flash$.next(this.flashs);
  }

  getFlash(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }
}
