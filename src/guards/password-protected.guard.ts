import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { request } from "http";
import { Observable } from "rxjs";

@Injectable()
export class PasswordProtectedGuard implements CanActivate {
    constructor(
        private reflector : Reflector
    ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        const goodPass = this.reflector.get<string>('passwordProtect', context.getHandler())
        return request.headers['x-password'] === goodPass
    }
        
    
}