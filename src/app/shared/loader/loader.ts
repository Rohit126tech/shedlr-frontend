import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../core/services/loader-service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class LoaderComponent {

  constructor(public loaderService: LoaderService) {}

}