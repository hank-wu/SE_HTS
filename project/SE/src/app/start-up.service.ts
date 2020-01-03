import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './log-in/auth.service'
@Injectable()
export class StartupService {
    constructor(
        private injector: Injector,
        private authService: AuthService
    ) { }
    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            const router = this.injector.get(Router);
            if (this.authService.isLoggedIn()) {
                router.navigate(['/home']);
                resolve(true);
            } else {
                router.navigate(['/']);
                resolve(true);
            }
        });
    }
}

export function startupServiceFactory(startupService: StartupService): Function { return () => startupService.load(); }