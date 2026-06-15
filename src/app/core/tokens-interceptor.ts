import { HttpInterceptorFn } from '@angular/common/http';

export const tokensInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
