import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { LoaderService } from '../../core/services/loader-service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
@Injectable({
  providedIn: 'root',
})
export class Loader {
 isLoading = false;

  constructor(private loaderService:LoaderService) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe(value => {
      this.isLoading = value;
    });
  }
}
