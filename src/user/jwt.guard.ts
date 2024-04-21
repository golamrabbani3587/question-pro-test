import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Assuming token is in the format: Bearer <token>

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key
        request.user = decoded; // Attach the user object to the request for further use
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}