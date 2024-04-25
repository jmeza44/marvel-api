import {
  Controller,
  Post,
  Body,
  Get,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from '../models/auth-response.model';
import { CreateUserDto } from '../models/create-user.model';
import { SignInUserDto } from '../models/sign-in-user.model';
import { AuthService } from '../services/auth.service';
import { UserDto } from 'src/users/models/user.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiResponse({ status: 201, description: 'User signed in successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  async login(@Body() user: SignInUserDto): Promise<AuthResponse> {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiBadRequestResponse({ description: 'Username already exists.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized: Invalid or missing token.',
  })
  async getProfile(@Request() request: any): Promise<UserDto> {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const token = authorization.split(' ')[1];
    return this.authService.getProfile(token);
  }
}
