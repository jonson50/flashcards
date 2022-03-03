import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IFlash } from './models/flash.model';
import { FlashService } from './services/flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  flashs: IFlash[] = [];
  editing: boolean = false;
  editingId: any = undefined;
  flash = {
    question: '',
    answer: '',
  };
  subscription: Subscription;

  @ViewChild('flashForm', { static: true }) flashForm!: NgForm;

  trackByFlashId(index: any, flash: IFlash) {
    return flash.id;
  }

  constructor(private flashService: FlashService) {
    // this.flashs = this.flashService.flashs;
    this.subscription = this.flashService.flash$.subscribe((flashs) => {
      this.flashs = flashs;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    const flash = this.flashService.getFlash(id);
    this.flash.question = flash!.question;
    this.flash.answer = flash!.answer;
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleRememberedChange({ id, flag }: { id: any; flag: any }) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm;
  }

  handleUpdate(): void {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel(): void {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }
}
