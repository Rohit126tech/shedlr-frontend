import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
   private accessToken = signal<string | null>(null);

  private user = signal<any>(null);

  setSession(response: any) {

    this.accessToken.set(
      response.accessToken
    );

    this.user.set(
      response.user
    );

  }

  getAccessToken() {

    return this.accessToken();

  }

  getUser() {

    return this.user();

  }

  clearSession() {

    this.accessToken.set(null);

    this.user.set(null);

  }
}
