import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './shared/toast/toast';
import { LoaderComponent } from './shared/loader/loader';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Toast,LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('commponents');
}
