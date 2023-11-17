import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers.authorization.split(' ')[1];
        const isValidToken = await this.validate(token);
        if (!isValidToken) return false
        const decodedToken = this.decodeToken(token);
        request.body.userId = decodedToken.userId;
        request.body.username = decodedToken.username;
        return true;

    }

    async validate(token: string) {
        return await this.jwtService.verifyAsync(token)
    }

    private decodeToken(token: string) {
        return this.jwtService.decode<{ userId: string, username: string }>(token);
    }
}