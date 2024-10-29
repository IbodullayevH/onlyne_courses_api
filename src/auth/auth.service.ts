import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/auth/users.service';
import * as bcrypt from "bcryptjs"


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByemail(email)        
        if (user && typeof password == "string") {
            try {
                const isPasswordMatch = bcrypt.compare(password, user.password);
                
                if (isPasswordMatch) {
                    const { password, ...result } = user;
                    return result;
                }
            } catch (error) {
                throw new Error('Parolni tekshirishda xatolik: ' + error.message);

            }
        } else {
            throw new Error(`Ma'lumot turi noto'g'ri: Userning passwordi satr emas`);
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role, name: user.name };        
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: `1d` }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: `7d` }),
        };
    }
}

