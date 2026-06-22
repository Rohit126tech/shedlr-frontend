import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import lottie from 'lottie-web';
import { interval, Subscription, take } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-emailverification-underprocess',
  imports: [],
  templateUrl: './emailverification-underprocess.html',
  styleUrl: './emailverification-underprocess.css',
})
export class EmailverificationUnderprocess
  implements OnInit, OnDestroy,AfterViewInit {
    email:string='';
    constructor(private authService:AuthService){
      this.email=this.authService.email
    }
   
  countdown = signal(0);

  canResend = signal(true);

  // Display timer as 00:30, 00:09, etc.
  timerText = computed(() => {
    const seconds = this.countdown();

    return `00:${seconds.toString().padStart(2, '0')}`;
  });

  private timerSubscription?: Subscription;

  ngOnInit(): void {

    // If email is already sent during signup,
    // only start the timer here.
   console.log('AuthService Email:', this.authService.email);
   this.resendVerificationEmail();

    // If you actually want to send an email automatically,
    // call resendVerificationEmail() instead.
  }
   ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: document.getElementById('paperPlaneAnimation')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/paper-plane.json',
    });
  }

  resendVerificationEmail(): void {

    if (!this.canResend()) {
      return;
    }
    console.log(this.email);

    const email=this.email;
    const payload ={email};
    console.log(payload)
    this.authService.resendVerification(payload).subscribe((res)=>{
      console.log(res)
    });
    this.startTimer();
  }

  startTimer(): void {

    this.canResend.set(false);
    this.countdown.set(60);

    this.timerSubscription?.unsubscribe();

    this.timerSubscription = interval(1000)
      .pipe(take(60))
      .subscribe((value) => {

        const remaining = 59 - value;

        this.countdown.set(remaining);

        if (remaining <= 0) {

          this.canResend.set(true);
          this.countdown.set(0);
        }
      });
  }

  ngOnDestroy(): void {

    this.timerSubscription?.unsubscribe();
  }
}