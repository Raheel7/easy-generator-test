import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(email: string, name: string, password: string): Promise<{
        access_token: string;
    }>;
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
