import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

import lottie from 'lottie-web';
@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements AfterViewInit {
constructor(private route:ActivatedRoute, private authService:AuthService){

}
token='';
ngOnInit(){
  this.route.queryParams.subscribe((params:any) => {

    console.log(params);
    this.authService.emailVerification(params).subscribe((res:any)=>{
      console.log(res);
    })

  });
}
ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: document.getElementById('paperPlaneAnimation')!,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/animations/done-tick.json',
    });
  }
}
