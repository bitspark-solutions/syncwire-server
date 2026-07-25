import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

/**
 * HashService — the two hashing needs of the auth layer:
 *
 *   bcrypt (hash/verify)  → user passwords. Slow on purpose (cost 12).
 *   sha256                → refresh tokens. Fast + deterministic so the
 *                           `refresh_tokens.token_hash` column is indexable
 *                           for O(1) lookup. The token itself is a 48-byte
 *                           random value, so offline brute-force of a leaked
 *                           hash is not a realistic threat (unlike passwords).
 */
@Injectable()
export class HashService {
  private readonly COST = 12;

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.COST);
  }

  verify(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  sha256(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
