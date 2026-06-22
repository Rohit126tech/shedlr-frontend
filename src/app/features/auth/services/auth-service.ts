import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordRequest, LoginRequest } from '../models/authRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http:HttpClient){}
  email='';
  apiUrl='http://localhost:8080';
  login(data:LoginRequest){
   return this.http.post( this.apiUrl  +'/api' +'/'+'v1'+'/'+ 'auth'+'/'+'login',data ) 
  }
  signup(data:any){
    return this.http.post(this.apiUrl +'/api/v1/auth/signup',data)
  }
  forgotPassword(data:ForgotPasswordRequest){
    return this.http.post(this.apiUrl +'/api/v1/auth/forgot-password',data)
  }
  emailVerification(data:any){
    return this.http.post(this.apiUrl + '/api/v1/auth/verify-email',data)
  }
  resetPassword(data:any){
    return this.http.post(this.apiUrl + '/api/v1/auth/reset-password',data)
  }
  resendVerification(data:any){
    return this.http.post(this.apiUrl + '/api/v1/auth/resend-verification',data)
  }
}
