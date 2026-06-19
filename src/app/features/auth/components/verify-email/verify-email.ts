import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
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
}
