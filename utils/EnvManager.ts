import * as dotenv from 'dotenv';
import path from 'path';
import { CryptoHelper } from './CryptoHelper';

export class EnvManager {
    private static envLoaded = false;

    static loadEnv(env: string = process.env.ENV) {
        if (this.envLoaded) return;
        const envFile = path.resolve(__dirname, '../env', `.env.${env}`);
        const result = dotenv.config({ path: envFile });
        if (result.error) {
            console.warn(`Could not load env file: ${envFile}`);
        } else {
            console.log(`Environment loaded: ${env}`);
            this.envLoaded = true;
        }
    }

    static get baseUrl(): string {
        return process.env.BASE_URL || '';
    }

    static get username(): string {
        return process.env.LOGIN_USER || '';
    }

    static get password(): string {
        return process.env.LOGIN_PASS || '';
    }
}
