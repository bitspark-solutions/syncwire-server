
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Pairing
 * 
 */
export type Pairing = $Result.DefaultSelection<Prisma.$PairingPayload>
/**
 * Model PairingCode
 * 
 */
export type PairingCode = $Result.DefaultSelection<Prisma.$PairingCodePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DevicePlatform: {
  android: 'android',
  web: 'web'
};

export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform]


export const PairingStatus: {
  active: 'active',
  revoked: 'revoked'
};

export type PairingStatus = (typeof PairingStatus)[keyof typeof PairingStatus]

}

export type DevicePlatform = $Enums.DevicePlatform

export const DevicePlatform: typeof $Enums.DevicePlatform

export type PairingStatus = $Enums.PairingStatus

export const PairingStatus: typeof $Enums.PairingStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pairing`: Exposes CRUD operations for the **Pairing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pairings
    * const pairings = await prisma.pairing.findMany()
    * ```
    */
  get pairing(): Prisma.PairingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pairingCode`: Exposes CRUD operations for the **PairingCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PairingCodes
    * const pairingCodes = await prisma.pairingCode.findMany()
    * ```
    */
  get pairingCode(): Prisma.PairingCodeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Device: 'Device',
    RefreshToken: 'RefreshToken',
    Pairing: 'Pairing',
    PairingCode: 'PairingCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "device" | "refreshToken" | "pairing" | "pairingCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Pairing: {
        payload: Prisma.$PairingPayload<ExtArgs>
        fields: Prisma.PairingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PairingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PairingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          findFirst: {
            args: Prisma.PairingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PairingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          findMany: {
            args: Prisma.PairingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>[]
          }
          create: {
            args: Prisma.PairingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          createMany: {
            args: Prisma.PairingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PairingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>[]
          }
          delete: {
            args: Prisma.PairingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          update: {
            args: Prisma.PairingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          deleteMany: {
            args: Prisma.PairingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PairingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PairingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>[]
          }
          upsert: {
            args: Prisma.PairingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingPayload>
          }
          aggregate: {
            args: Prisma.PairingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePairing>
          }
          groupBy: {
            args: Prisma.PairingGroupByArgs<ExtArgs>
            result: $Utils.Optional<PairingGroupByOutputType>[]
          }
          count: {
            args: Prisma.PairingCountArgs<ExtArgs>
            result: $Utils.Optional<PairingCountAggregateOutputType> | number
          }
        }
      }
      PairingCode: {
        payload: Prisma.$PairingCodePayload<ExtArgs>
        fields: Prisma.PairingCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PairingCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PairingCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          findFirst: {
            args: Prisma.PairingCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PairingCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          findMany: {
            args: Prisma.PairingCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>[]
          }
          create: {
            args: Prisma.PairingCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          createMany: {
            args: Prisma.PairingCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PairingCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>[]
          }
          delete: {
            args: Prisma.PairingCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          update: {
            args: Prisma.PairingCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          deleteMany: {
            args: Prisma.PairingCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PairingCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PairingCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>[]
          }
          upsert: {
            args: Prisma.PairingCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairingCodePayload>
          }
          aggregate: {
            args: Prisma.PairingCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePairingCode>
          }
          groupBy: {
            args: Prisma.PairingCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PairingCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PairingCodeCountArgs<ExtArgs>
            result: $Utils.Optional<PairingCodeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    device?: DeviceOmit
    refreshToken?: RefreshTokenOmit
    pairing?: PairingOmit
    pairingCode?: PairingCodeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    devices: number
    refreshTokens: number
    pairingsAsSource: number
    pairingsAsViewer: number
    pairingCodesInitiated: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | UserCountOutputTypeCountDevicesArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    pairingsAsSource?: boolean | UserCountOutputTypeCountPairingsAsSourceArgs
    pairingsAsViewer?: boolean | UserCountOutputTypeCountPairingsAsViewerArgs
    pairingCodesInitiated?: boolean | UserCountOutputTypeCountPairingCodesInitiatedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPairingsAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPairingsAsViewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPairingCodesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingCodeWhereInput
  }


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    refreshTokens: number
    pairingsAsSource: number
    pairingsAsViewer: number
    pairingCodesInitiated: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | DeviceCountOutputTypeCountRefreshTokensArgs
    pairingsAsSource?: boolean | DeviceCountOutputTypeCountPairingsAsSourceArgs
    pairingsAsViewer?: boolean | DeviceCountOutputTypeCountPairingsAsViewerArgs
    pairingCodesInitiated?: boolean | DeviceCountOutputTypeCountPairingCodesInitiatedArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountPairingsAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountPairingsAsViewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingWhereInput
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountPairingCodesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingCodeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    displayName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    displayName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    displayName: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    devices?: boolean | User$devicesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    pairingsAsSource?: boolean | User$pairingsAsSourceArgs<ExtArgs>
    pairingsAsViewer?: boolean | User$pairingsAsViewerArgs<ExtArgs>
    pairingCodesInitiated?: boolean | User$pairingCodesInitiatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "displayName" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | User$devicesArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    pairingsAsSource?: boolean | User$pairingsAsSourceArgs<ExtArgs>
    pairingsAsViewer?: boolean | User$pairingsAsViewerArgs<ExtArgs>
    pairingCodesInitiated?: boolean | User$pairingCodesInitiatedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      devices: Prisma.$DevicePayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      pairingsAsSource: Prisma.$PairingPayload<ExtArgs>[]
      pairingsAsViewer: Prisma.$PairingPayload<ExtArgs>[]
      pairingCodesInitiated: Prisma.$PairingCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      displayName: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    devices<T extends User$devicesArgs<ExtArgs> = {}>(args?: Subset<T, User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingsAsSource<T extends User$pairingsAsSourceArgs<ExtArgs> = {}>(args?: Subset<T, User$pairingsAsSourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingsAsViewer<T extends User$pairingsAsViewerArgs<ExtArgs> = {}>(args?: Subset<T, User$pairingsAsViewerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingCodesInitiated<T extends User$pairingCodesInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, User$pairingCodesInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.devices
   */
  export type User$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.pairingsAsSource
   */
  export type User$pairingsAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    where?: PairingWhereInput
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    cursor?: PairingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * User.pairingsAsViewer
   */
  export type User$pairingsAsViewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    where?: PairingWhereInput
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    cursor?: PairingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * User.pairingCodesInitiated
   */
  export type User$pairingCodesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    where?: PairingCodeWhereInput
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    cursor?: PairingCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingCodeScalarFieldEnum | PairingCodeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    platform: $Enums.DevicePlatform | null
    pushToken: string | null
    lastSeenAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    platform: $Enums.DevicePlatform | null
    pushToken: string | null
    lastSeenAt: Date | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    platform: number
    pushToken: number
    lastSeenAt: number
    createdAt: number
    revokedAt: number
    _all: number
  }


  export type DeviceMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    createdAt?: true
    revokedAt?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    createdAt?: true
    revokedAt?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    platform?: true
    pushToken?: true
    lastSeenAt?: true
    createdAt?: true
    revokedAt?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken: string | null
    lastSeenAt: Date | null
    createdAt: Date
    revokedAt: Date | null
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Device$refreshTokensArgs<ExtArgs>
    pairingsAsSource?: boolean | Device$pairingsAsSourceArgs<ExtArgs>
    pairingsAsViewer?: boolean | Device$pairingsAsViewerArgs<ExtArgs>
    pairingCodesInitiated?: boolean | Device$pairingCodesInitiatedArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    platform?: boolean
    pushToken?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    revokedAt?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "platform" | "pushToken" | "lastSeenAt" | "createdAt" | "revokedAt", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    refreshTokens?: boolean | Device$refreshTokensArgs<ExtArgs>
    pairingsAsSource?: boolean | Device$pairingsAsSourceArgs<ExtArgs>
    pairingsAsViewer?: boolean | Device$pairingsAsViewerArgs<ExtArgs>
    pairingCodesInitiated?: boolean | Device$pairingCodesInitiatedArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      pairingsAsSource: Prisma.$PairingPayload<ExtArgs>[]
      pairingsAsViewer: Prisma.$PairingPayload<ExtArgs>[]
      pairingCodesInitiated: Prisma.$PairingCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      platform: $Enums.DevicePlatform
      pushToken: string | null
      lastSeenAt: Date | null
      createdAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    refreshTokens<T extends Device$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, Device$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingsAsSource<T extends Device$pairingsAsSourceArgs<ExtArgs> = {}>(args?: Subset<T, Device$pairingsAsSourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingsAsViewer<T extends Device$pairingsAsViewerArgs<ExtArgs> = {}>(args?: Subset<T, Device$pairingsAsViewerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairingCodesInitiated<T extends Device$pairingCodesInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, Device$pairingCodesInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly userId: FieldRef<"Device", 'String'>
    readonly name: FieldRef<"Device", 'String'>
    readonly platform: FieldRef<"Device", 'DevicePlatform'>
    readonly pushToken: FieldRef<"Device", 'String'>
    readonly lastSeenAt: FieldRef<"Device", 'DateTime'>
    readonly createdAt: FieldRef<"Device", 'DateTime'>
    readonly revokedAt: FieldRef<"Device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device.refreshTokens
   */
  export type Device$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * Device.pairingsAsSource
   */
  export type Device$pairingsAsSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    where?: PairingWhereInput
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    cursor?: PairingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * Device.pairingsAsViewer
   */
  export type Device$pairingsAsViewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    where?: PairingWhereInput
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    cursor?: PairingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * Device.pairingCodesInitiated
   */
  export type Device$pairingCodesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    where?: PairingCodeWhereInput
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    cursor?: PairingCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairingCodeScalarFieldEnum | PairingCodeScalarFieldEnum[]
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    deviceId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    replacedById: string | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    deviceId: string | null
    tokenHash: string | null
    expiresAt: Date | null
    replacedById: string | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    userId: number
    deviceId: number
    tokenHash: number
    expiresAt: number
    replacedById: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    userId?: true
    deviceId?: true
    tokenHash?: true
    expiresAt?: true
    replacedById?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    deviceId?: true
    tokenHash?: true
    expiresAt?: true
    replacedById?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    userId?: true
    deviceId?: true
    tokenHash?: true
    expiresAt?: true
    replacedById?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    userId: string
    deviceId: string
    tokenHash: string
    expiresAt: Date
    replacedById: string | null
    revokedAt: Date | null
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    deviceId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    replacedById?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    deviceId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    replacedById?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    deviceId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    replacedById?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    deviceId?: boolean
    tokenHash?: boolean
    expiresAt?: boolean
    replacedById?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "deviceId" | "tokenHash" | "expiresAt" | "replacedById" | "revokedAt" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      device: Prisma.$DevicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      deviceId: string
      tokenHash: string
      expiresAt: Date
      replacedById: string | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    device<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly deviceId: FieldRef<"RefreshToken", 'String'>
    readonly tokenHash: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly replacedById: FieldRef<"RefreshToken", 'String'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Pairing
   */

  export type AggregatePairing = {
    _count: PairingCountAggregateOutputType | null
    _min: PairingMinAggregateOutputType | null
    _max: PairingMaxAggregateOutputType | null
  }

  export type PairingMinAggregateOutputType = {
    id: string | null
    sourceUserId: string | null
    sourceDeviceId: string | null
    viewerUserId: string | null
    viewerDeviceId: string | null
    status: $Enums.PairingStatus | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type PairingMaxAggregateOutputType = {
    id: string | null
    sourceUserId: string | null
    sourceDeviceId: string | null
    viewerUserId: string | null
    viewerDeviceId: string | null
    status: $Enums.PairingStatus | null
    createdAt: Date | null
    revokedAt: Date | null
  }

  export type PairingCountAggregateOutputType = {
    id: number
    sourceUserId: number
    sourceDeviceId: number
    viewerUserId: number
    viewerDeviceId: number
    status: number
    createdAt: number
    revokedAt: number
    _all: number
  }


  export type PairingMinAggregateInputType = {
    id?: true
    sourceUserId?: true
    sourceDeviceId?: true
    viewerUserId?: true
    viewerDeviceId?: true
    status?: true
    createdAt?: true
    revokedAt?: true
  }

  export type PairingMaxAggregateInputType = {
    id?: true
    sourceUserId?: true
    sourceDeviceId?: true
    viewerUserId?: true
    viewerDeviceId?: true
    status?: true
    createdAt?: true
    revokedAt?: true
  }

  export type PairingCountAggregateInputType = {
    id?: true
    sourceUserId?: true
    sourceDeviceId?: true
    viewerUserId?: true
    viewerDeviceId?: true
    status?: true
    createdAt?: true
    revokedAt?: true
    _all?: true
  }

  export type PairingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pairing to aggregate.
     */
    where?: PairingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairings to fetch.
     */
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PairingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pairings
    **/
    _count?: true | PairingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PairingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PairingMaxAggregateInputType
  }

  export type GetPairingAggregateType<T extends PairingAggregateArgs> = {
        [P in keyof T & keyof AggregatePairing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePairing[P]>
      : GetScalarType<T[P], AggregatePairing[P]>
  }




  export type PairingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingWhereInput
    orderBy?: PairingOrderByWithAggregationInput | PairingOrderByWithAggregationInput[]
    by: PairingScalarFieldEnum[] | PairingScalarFieldEnum
    having?: PairingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PairingCountAggregateInputType | true
    _min?: PairingMinAggregateInputType
    _max?: PairingMaxAggregateInputType
  }

  export type PairingGroupByOutputType = {
    id: string
    sourceUserId: string
    sourceDeviceId: string
    viewerUserId: string
    viewerDeviceId: string
    status: $Enums.PairingStatus
    createdAt: Date
    revokedAt: Date | null
    _count: PairingCountAggregateOutputType | null
    _min: PairingMinAggregateOutputType | null
    _max: PairingMaxAggregateOutputType | null
  }

  type GetPairingGroupByPayload<T extends PairingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PairingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PairingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PairingGroupByOutputType[P]>
            : GetScalarType<T[P], PairingGroupByOutputType[P]>
        }
      >
    >


  export type PairingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceUserId?: boolean
    sourceDeviceId?: boolean
    viewerUserId?: boolean
    viewerDeviceId?: boolean
    status?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairing"]>

  export type PairingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceUserId?: boolean
    sourceDeviceId?: boolean
    viewerUserId?: boolean
    viewerDeviceId?: boolean
    status?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairing"]>

  export type PairingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sourceUserId?: boolean
    sourceDeviceId?: boolean
    viewerUserId?: boolean
    viewerDeviceId?: boolean
    status?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairing"]>

  export type PairingSelectScalar = {
    id?: boolean
    sourceUserId?: boolean
    sourceDeviceId?: boolean
    viewerUserId?: boolean
    viewerDeviceId?: boolean
    status?: boolean
    createdAt?: boolean
    revokedAt?: boolean
  }

  export type PairingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sourceUserId" | "sourceDeviceId" | "viewerUserId" | "viewerDeviceId" | "status" | "createdAt" | "revokedAt", ExtArgs["result"]["pairing"]>
  export type PairingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type PairingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type PairingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceUser?: boolean | UserDefaultArgs<ExtArgs>
    sourceDevice?: boolean | DeviceDefaultArgs<ExtArgs>
    viewerUser?: boolean | UserDefaultArgs<ExtArgs>
    viewerDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $PairingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pairing"
    objects: {
      sourceUser: Prisma.$UserPayload<ExtArgs>
      sourceDevice: Prisma.$DevicePayload<ExtArgs>
      viewerUser: Prisma.$UserPayload<ExtArgs>
      viewerDevice: Prisma.$DevicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sourceUserId: string
      sourceDeviceId: string
      viewerUserId: string
      viewerDeviceId: string
      status: $Enums.PairingStatus
      createdAt: Date
      revokedAt: Date | null
    }, ExtArgs["result"]["pairing"]>
    composites: {}
  }

  type PairingGetPayload<S extends boolean | null | undefined | PairingDefaultArgs> = $Result.GetResult<Prisma.$PairingPayload, S>

  type PairingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PairingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PairingCountAggregateInputType | true
    }

  export interface PairingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pairing'], meta: { name: 'Pairing' } }
    /**
     * Find zero or one Pairing that matches the filter.
     * @param {PairingFindUniqueArgs} args - Arguments to find a Pairing
     * @example
     * // Get one Pairing
     * const pairing = await prisma.pairing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PairingFindUniqueArgs>(args: SelectSubset<T, PairingFindUniqueArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pairing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PairingFindUniqueOrThrowArgs} args - Arguments to find a Pairing
     * @example
     * // Get one Pairing
     * const pairing = await prisma.pairing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PairingFindUniqueOrThrowArgs>(args: SelectSubset<T, PairingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pairing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingFindFirstArgs} args - Arguments to find a Pairing
     * @example
     * // Get one Pairing
     * const pairing = await prisma.pairing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PairingFindFirstArgs>(args?: SelectSubset<T, PairingFindFirstArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pairing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingFindFirstOrThrowArgs} args - Arguments to find a Pairing
     * @example
     * // Get one Pairing
     * const pairing = await prisma.pairing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PairingFindFirstOrThrowArgs>(args?: SelectSubset<T, PairingFindFirstOrThrowArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pairings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pairings
     * const pairings = await prisma.pairing.findMany()
     * 
     * // Get first 10 Pairings
     * const pairings = await prisma.pairing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pairingWithIdOnly = await prisma.pairing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PairingFindManyArgs>(args?: SelectSubset<T, PairingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pairing.
     * @param {PairingCreateArgs} args - Arguments to create a Pairing.
     * @example
     * // Create one Pairing
     * const Pairing = await prisma.pairing.create({
     *   data: {
     *     // ... data to create a Pairing
     *   }
     * })
     * 
     */
    create<T extends PairingCreateArgs>(args: SelectSubset<T, PairingCreateArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pairings.
     * @param {PairingCreateManyArgs} args - Arguments to create many Pairings.
     * @example
     * // Create many Pairings
     * const pairing = await prisma.pairing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PairingCreateManyArgs>(args?: SelectSubset<T, PairingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pairings and returns the data saved in the database.
     * @param {PairingCreateManyAndReturnArgs} args - Arguments to create many Pairings.
     * @example
     * // Create many Pairings
     * const pairing = await prisma.pairing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pairings and only return the `id`
     * const pairingWithIdOnly = await prisma.pairing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PairingCreateManyAndReturnArgs>(args?: SelectSubset<T, PairingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pairing.
     * @param {PairingDeleteArgs} args - Arguments to delete one Pairing.
     * @example
     * // Delete one Pairing
     * const Pairing = await prisma.pairing.delete({
     *   where: {
     *     // ... filter to delete one Pairing
     *   }
     * })
     * 
     */
    delete<T extends PairingDeleteArgs>(args: SelectSubset<T, PairingDeleteArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pairing.
     * @param {PairingUpdateArgs} args - Arguments to update one Pairing.
     * @example
     * // Update one Pairing
     * const pairing = await prisma.pairing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PairingUpdateArgs>(args: SelectSubset<T, PairingUpdateArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pairings.
     * @param {PairingDeleteManyArgs} args - Arguments to filter Pairings to delete.
     * @example
     * // Delete a few Pairings
     * const { count } = await prisma.pairing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PairingDeleteManyArgs>(args?: SelectSubset<T, PairingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pairings
     * const pairing = await prisma.pairing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PairingUpdateManyArgs>(args: SelectSubset<T, PairingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairings and returns the data updated in the database.
     * @param {PairingUpdateManyAndReturnArgs} args - Arguments to update many Pairings.
     * @example
     * // Update many Pairings
     * const pairing = await prisma.pairing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pairings and only return the `id`
     * const pairingWithIdOnly = await prisma.pairing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PairingUpdateManyAndReturnArgs>(args: SelectSubset<T, PairingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pairing.
     * @param {PairingUpsertArgs} args - Arguments to update or create a Pairing.
     * @example
     * // Update or create a Pairing
     * const pairing = await prisma.pairing.upsert({
     *   create: {
     *     // ... data to create a Pairing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pairing we want to update
     *   }
     * })
     */
    upsert<T extends PairingUpsertArgs>(args: SelectSubset<T, PairingUpsertArgs<ExtArgs>>): Prisma__PairingClient<$Result.GetResult<Prisma.$PairingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pairings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCountArgs} args - Arguments to filter Pairings to count.
     * @example
     * // Count the number of Pairings
     * const count = await prisma.pairing.count({
     *   where: {
     *     // ... the filter for the Pairings we want to count
     *   }
     * })
    **/
    count<T extends PairingCountArgs>(
      args?: Subset<T, PairingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PairingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pairing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PairingAggregateArgs>(args: Subset<T, PairingAggregateArgs>): Prisma.PrismaPromise<GetPairingAggregateType<T>>

    /**
     * Group by Pairing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PairingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PairingGroupByArgs['orderBy'] }
        : { orderBy?: PairingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PairingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPairingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pairing model
   */
  readonly fields: PairingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pairing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PairingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sourceUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sourceDevice<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    viewerUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    viewerDevice<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pairing model
   */
  interface PairingFieldRefs {
    readonly id: FieldRef<"Pairing", 'String'>
    readonly sourceUserId: FieldRef<"Pairing", 'String'>
    readonly sourceDeviceId: FieldRef<"Pairing", 'String'>
    readonly viewerUserId: FieldRef<"Pairing", 'String'>
    readonly viewerDeviceId: FieldRef<"Pairing", 'String'>
    readonly status: FieldRef<"Pairing", 'PairingStatus'>
    readonly createdAt: FieldRef<"Pairing", 'DateTime'>
    readonly revokedAt: FieldRef<"Pairing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pairing findUnique
   */
  export type PairingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter, which Pairing to fetch.
     */
    where: PairingWhereUniqueInput
  }

  /**
   * Pairing findUniqueOrThrow
   */
  export type PairingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter, which Pairing to fetch.
     */
    where: PairingWhereUniqueInput
  }

  /**
   * Pairing findFirst
   */
  export type PairingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter, which Pairing to fetch.
     */
    where?: PairingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairings to fetch.
     */
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairings.
     */
    cursor?: PairingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairings.
     */
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * Pairing findFirstOrThrow
   */
  export type PairingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter, which Pairing to fetch.
     */
    where?: PairingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairings to fetch.
     */
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairings.
     */
    cursor?: PairingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairings.
     */
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * Pairing findMany
   */
  export type PairingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter, which Pairings to fetch.
     */
    where?: PairingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairings to fetch.
     */
    orderBy?: PairingOrderByWithRelationInput | PairingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pairings.
     */
    cursor?: PairingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairings.
     */
    distinct?: PairingScalarFieldEnum | PairingScalarFieldEnum[]
  }

  /**
   * Pairing create
   */
  export type PairingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * The data needed to create a Pairing.
     */
    data: XOR<PairingCreateInput, PairingUncheckedCreateInput>
  }

  /**
   * Pairing createMany
   */
  export type PairingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pairings.
     */
    data: PairingCreateManyInput | PairingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pairing createManyAndReturn
   */
  export type PairingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * The data used to create many Pairings.
     */
    data: PairingCreateManyInput | PairingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pairing update
   */
  export type PairingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * The data needed to update a Pairing.
     */
    data: XOR<PairingUpdateInput, PairingUncheckedUpdateInput>
    /**
     * Choose, which Pairing to update.
     */
    where: PairingWhereUniqueInput
  }

  /**
   * Pairing updateMany
   */
  export type PairingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pairings.
     */
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyInput>
    /**
     * Filter which Pairings to update
     */
    where?: PairingWhereInput
    /**
     * Limit how many Pairings to update.
     */
    limit?: number
  }

  /**
   * Pairing updateManyAndReturn
   */
  export type PairingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * The data used to update Pairings.
     */
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyInput>
    /**
     * Filter which Pairings to update
     */
    where?: PairingWhereInput
    /**
     * Limit how many Pairings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pairing upsert
   */
  export type PairingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * The filter to search for the Pairing to update in case it exists.
     */
    where: PairingWhereUniqueInput
    /**
     * In case the Pairing found by the `where` argument doesn't exist, create a new Pairing with this data.
     */
    create: XOR<PairingCreateInput, PairingUncheckedCreateInput>
    /**
     * In case the Pairing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PairingUpdateInput, PairingUncheckedUpdateInput>
  }

  /**
   * Pairing delete
   */
  export type PairingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
    /**
     * Filter which Pairing to delete.
     */
    where: PairingWhereUniqueInput
  }

  /**
   * Pairing deleteMany
   */
  export type PairingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pairings to delete
     */
    where?: PairingWhereInput
    /**
     * Limit how many Pairings to delete.
     */
    limit?: number
  }

  /**
   * Pairing without action
   */
  export type PairingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pairing
     */
    select?: PairingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pairing
     */
    omit?: PairingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingInclude<ExtArgs> | null
  }


  /**
   * Model PairingCode
   */

  export type AggregatePairingCode = {
    _count: PairingCodeCountAggregateOutputType | null
    _min: PairingCodeMinAggregateOutputType | null
    _max: PairingCodeMaxAggregateOutputType | null
  }

  export type PairingCodeMinAggregateOutputType = {
    code: string | null
    initiatorUserId: string | null
    initiatorDeviceId: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PairingCodeMaxAggregateOutputType = {
    code: string | null
    initiatorUserId: string | null
    initiatorDeviceId: string | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type PairingCodeCountAggregateOutputType = {
    code: number
    initiatorUserId: number
    initiatorDeviceId: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type PairingCodeMinAggregateInputType = {
    code?: true
    initiatorUserId?: true
    initiatorDeviceId?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PairingCodeMaxAggregateInputType = {
    code?: true
    initiatorUserId?: true
    initiatorDeviceId?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type PairingCodeCountAggregateInputType = {
    code?: true
    initiatorUserId?: true
    initiatorDeviceId?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PairingCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PairingCode to aggregate.
     */
    where?: PairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PairingCodes to fetch.
     */
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PairingCodes
    **/
    _count?: true | PairingCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PairingCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PairingCodeMaxAggregateInputType
  }

  export type GetPairingCodeAggregateType<T extends PairingCodeAggregateArgs> = {
        [P in keyof T & keyof AggregatePairingCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePairingCode[P]>
      : GetScalarType<T[P], AggregatePairingCode[P]>
  }




  export type PairingCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairingCodeWhereInput
    orderBy?: PairingCodeOrderByWithAggregationInput | PairingCodeOrderByWithAggregationInput[]
    by: PairingCodeScalarFieldEnum[] | PairingCodeScalarFieldEnum
    having?: PairingCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PairingCodeCountAggregateInputType | true
    _min?: PairingCodeMinAggregateInputType
    _max?: PairingCodeMaxAggregateInputType
  }

  export type PairingCodeGroupByOutputType = {
    code: string
    initiatorUserId: string
    initiatorDeviceId: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: PairingCodeCountAggregateOutputType | null
    _min: PairingCodeMinAggregateOutputType | null
    _max: PairingCodeMaxAggregateOutputType | null
  }

  type GetPairingCodeGroupByPayload<T extends PairingCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PairingCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PairingCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PairingCodeGroupByOutputType[P]>
            : GetScalarType<T[P], PairingCodeGroupByOutputType[P]>
        }
      >
    >


  export type PairingCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    initiatorUserId?: boolean
    initiatorDeviceId?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairingCode"]>

  export type PairingCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    initiatorUserId?: boolean
    initiatorDeviceId?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairingCode"]>

  export type PairingCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    initiatorUserId?: boolean
    initiatorDeviceId?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pairingCode"]>

  export type PairingCodeSelectScalar = {
    code?: boolean
    initiatorUserId?: boolean
    initiatorDeviceId?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type PairingCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"code" | "initiatorUserId" | "initiatorDeviceId" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["pairingCode"]>
  export type PairingCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type PairingCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type PairingCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiatorUser?: boolean | UserDefaultArgs<ExtArgs>
    initiatorDevice?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $PairingCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PairingCode"
    objects: {
      initiatorUser: Prisma.$UserPayload<ExtArgs>
      initiatorDevice: Prisma.$DevicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      code: string
      initiatorUserId: string
      initiatorDeviceId: string
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["pairingCode"]>
    composites: {}
  }

  type PairingCodeGetPayload<S extends boolean | null | undefined | PairingCodeDefaultArgs> = $Result.GetResult<Prisma.$PairingCodePayload, S>

  type PairingCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PairingCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PairingCodeCountAggregateInputType | true
    }

  export interface PairingCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PairingCode'], meta: { name: 'PairingCode' } }
    /**
     * Find zero or one PairingCode that matches the filter.
     * @param {PairingCodeFindUniqueArgs} args - Arguments to find a PairingCode
     * @example
     * // Get one PairingCode
     * const pairingCode = await prisma.pairingCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PairingCodeFindUniqueArgs>(args: SelectSubset<T, PairingCodeFindUniqueArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PairingCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PairingCodeFindUniqueOrThrowArgs} args - Arguments to find a PairingCode
     * @example
     * // Get one PairingCode
     * const pairingCode = await prisma.pairingCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PairingCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, PairingCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PairingCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeFindFirstArgs} args - Arguments to find a PairingCode
     * @example
     * // Get one PairingCode
     * const pairingCode = await prisma.pairingCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PairingCodeFindFirstArgs>(args?: SelectSubset<T, PairingCodeFindFirstArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PairingCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeFindFirstOrThrowArgs} args - Arguments to find a PairingCode
     * @example
     * // Get one PairingCode
     * const pairingCode = await prisma.pairingCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PairingCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, PairingCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PairingCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PairingCodes
     * const pairingCodes = await prisma.pairingCode.findMany()
     * 
     * // Get first 10 PairingCodes
     * const pairingCodes = await prisma.pairingCode.findMany({ take: 10 })
     * 
     * // Only select the `code`
     * const pairingCodeWithCodeOnly = await prisma.pairingCode.findMany({ select: { code: true } })
     * 
     */
    findMany<T extends PairingCodeFindManyArgs>(args?: SelectSubset<T, PairingCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PairingCode.
     * @param {PairingCodeCreateArgs} args - Arguments to create a PairingCode.
     * @example
     * // Create one PairingCode
     * const PairingCode = await prisma.pairingCode.create({
     *   data: {
     *     // ... data to create a PairingCode
     *   }
     * })
     * 
     */
    create<T extends PairingCodeCreateArgs>(args: SelectSubset<T, PairingCodeCreateArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PairingCodes.
     * @param {PairingCodeCreateManyArgs} args - Arguments to create many PairingCodes.
     * @example
     * // Create many PairingCodes
     * const pairingCode = await prisma.pairingCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PairingCodeCreateManyArgs>(args?: SelectSubset<T, PairingCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PairingCodes and returns the data saved in the database.
     * @param {PairingCodeCreateManyAndReturnArgs} args - Arguments to create many PairingCodes.
     * @example
     * // Create many PairingCodes
     * const pairingCode = await prisma.pairingCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PairingCodes and only return the `code`
     * const pairingCodeWithCodeOnly = await prisma.pairingCode.createManyAndReturn({
     *   select: { code: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PairingCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, PairingCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PairingCode.
     * @param {PairingCodeDeleteArgs} args - Arguments to delete one PairingCode.
     * @example
     * // Delete one PairingCode
     * const PairingCode = await prisma.pairingCode.delete({
     *   where: {
     *     // ... filter to delete one PairingCode
     *   }
     * })
     * 
     */
    delete<T extends PairingCodeDeleteArgs>(args: SelectSubset<T, PairingCodeDeleteArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PairingCode.
     * @param {PairingCodeUpdateArgs} args - Arguments to update one PairingCode.
     * @example
     * // Update one PairingCode
     * const pairingCode = await prisma.pairingCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PairingCodeUpdateArgs>(args: SelectSubset<T, PairingCodeUpdateArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PairingCodes.
     * @param {PairingCodeDeleteManyArgs} args - Arguments to filter PairingCodes to delete.
     * @example
     * // Delete a few PairingCodes
     * const { count } = await prisma.pairingCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PairingCodeDeleteManyArgs>(args?: SelectSubset<T, PairingCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PairingCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PairingCodes
     * const pairingCode = await prisma.pairingCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PairingCodeUpdateManyArgs>(args: SelectSubset<T, PairingCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PairingCodes and returns the data updated in the database.
     * @param {PairingCodeUpdateManyAndReturnArgs} args - Arguments to update many PairingCodes.
     * @example
     * // Update many PairingCodes
     * const pairingCode = await prisma.pairingCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PairingCodes and only return the `code`
     * const pairingCodeWithCodeOnly = await prisma.pairingCode.updateManyAndReturn({
     *   select: { code: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PairingCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, PairingCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PairingCode.
     * @param {PairingCodeUpsertArgs} args - Arguments to update or create a PairingCode.
     * @example
     * // Update or create a PairingCode
     * const pairingCode = await prisma.pairingCode.upsert({
     *   create: {
     *     // ... data to create a PairingCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PairingCode we want to update
     *   }
     * })
     */
    upsert<T extends PairingCodeUpsertArgs>(args: SelectSubset<T, PairingCodeUpsertArgs<ExtArgs>>): Prisma__PairingCodeClient<$Result.GetResult<Prisma.$PairingCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PairingCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeCountArgs} args - Arguments to filter PairingCodes to count.
     * @example
     * // Count the number of PairingCodes
     * const count = await prisma.pairingCode.count({
     *   where: {
     *     // ... the filter for the PairingCodes we want to count
     *   }
     * })
    **/
    count<T extends PairingCodeCountArgs>(
      args?: Subset<T, PairingCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PairingCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PairingCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PairingCodeAggregateArgs>(args: Subset<T, PairingCodeAggregateArgs>): Prisma.PrismaPromise<GetPairingCodeAggregateType<T>>

    /**
     * Group by PairingCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairingCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PairingCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PairingCodeGroupByArgs['orderBy'] }
        : { orderBy?: PairingCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PairingCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPairingCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PairingCode model
   */
  readonly fields: PairingCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PairingCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PairingCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    initiatorUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    initiatorDevice<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PairingCode model
   */
  interface PairingCodeFieldRefs {
    readonly code: FieldRef<"PairingCode", 'String'>
    readonly initiatorUserId: FieldRef<"PairingCode", 'String'>
    readonly initiatorDeviceId: FieldRef<"PairingCode", 'String'>
    readonly expiresAt: FieldRef<"PairingCode", 'DateTime'>
    readonly usedAt: FieldRef<"PairingCode", 'DateTime'>
    readonly createdAt: FieldRef<"PairingCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PairingCode findUnique
   */
  export type PairingCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which PairingCode to fetch.
     */
    where: PairingCodeWhereUniqueInput
  }

  /**
   * PairingCode findUniqueOrThrow
   */
  export type PairingCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which PairingCode to fetch.
     */
    where: PairingCodeWhereUniqueInput
  }

  /**
   * PairingCode findFirst
   */
  export type PairingCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which PairingCode to fetch.
     */
    where?: PairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PairingCodes to fetch.
     */
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PairingCodes.
     */
    cursor?: PairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PairingCodes.
     */
    distinct?: PairingCodeScalarFieldEnum | PairingCodeScalarFieldEnum[]
  }

  /**
   * PairingCode findFirstOrThrow
   */
  export type PairingCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which PairingCode to fetch.
     */
    where?: PairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PairingCodes to fetch.
     */
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PairingCodes.
     */
    cursor?: PairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PairingCodes.
     */
    distinct?: PairingCodeScalarFieldEnum | PairingCodeScalarFieldEnum[]
  }

  /**
   * PairingCode findMany
   */
  export type PairingCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter, which PairingCodes to fetch.
     */
    where?: PairingCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PairingCodes to fetch.
     */
    orderBy?: PairingCodeOrderByWithRelationInput | PairingCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PairingCodes.
     */
    cursor?: PairingCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PairingCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PairingCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PairingCodes.
     */
    distinct?: PairingCodeScalarFieldEnum | PairingCodeScalarFieldEnum[]
  }

  /**
   * PairingCode create
   */
  export type PairingCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a PairingCode.
     */
    data: XOR<PairingCodeCreateInput, PairingCodeUncheckedCreateInput>
  }

  /**
   * PairingCode createMany
   */
  export type PairingCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PairingCodes.
     */
    data: PairingCodeCreateManyInput | PairingCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PairingCode createManyAndReturn
   */
  export type PairingCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * The data used to create many PairingCodes.
     */
    data: PairingCodeCreateManyInput | PairingCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PairingCode update
   */
  export type PairingCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a PairingCode.
     */
    data: XOR<PairingCodeUpdateInput, PairingCodeUncheckedUpdateInput>
    /**
     * Choose, which PairingCode to update.
     */
    where: PairingCodeWhereUniqueInput
  }

  /**
   * PairingCode updateMany
   */
  export type PairingCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PairingCodes.
     */
    data: XOR<PairingCodeUpdateManyMutationInput, PairingCodeUncheckedUpdateManyInput>
    /**
     * Filter which PairingCodes to update
     */
    where?: PairingCodeWhereInput
    /**
     * Limit how many PairingCodes to update.
     */
    limit?: number
  }

  /**
   * PairingCode updateManyAndReturn
   */
  export type PairingCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * The data used to update PairingCodes.
     */
    data: XOR<PairingCodeUpdateManyMutationInput, PairingCodeUncheckedUpdateManyInput>
    /**
     * Filter which PairingCodes to update
     */
    where?: PairingCodeWhereInput
    /**
     * Limit how many PairingCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PairingCode upsert
   */
  export type PairingCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the PairingCode to update in case it exists.
     */
    where: PairingCodeWhereUniqueInput
    /**
     * In case the PairingCode found by the `where` argument doesn't exist, create a new PairingCode with this data.
     */
    create: XOR<PairingCodeCreateInput, PairingCodeUncheckedCreateInput>
    /**
     * In case the PairingCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PairingCodeUpdateInput, PairingCodeUncheckedUpdateInput>
  }

  /**
   * PairingCode delete
   */
  export type PairingCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
    /**
     * Filter which PairingCode to delete.
     */
    where: PairingCodeWhereUniqueInput
  }

  /**
   * PairingCode deleteMany
   */
  export type PairingCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PairingCodes to delete
     */
    where?: PairingCodeWhereInput
    /**
     * Limit how many PairingCodes to delete.
     */
    limit?: number
  }

  /**
   * PairingCode without action
   */
  export type PairingCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairingCode
     */
    select?: PairingCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PairingCode
     */
    omit?: PairingCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairingCodeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    displayName: 'displayName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    platform: 'platform',
    pushToken: 'pushToken',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    deviceId: 'deviceId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    replacedById: 'replacedById',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const PairingScalarFieldEnum: {
    id: 'id',
    sourceUserId: 'sourceUserId',
    sourceDeviceId: 'sourceDeviceId',
    viewerUserId: 'viewerUserId',
    viewerDeviceId: 'viewerDeviceId',
    status: 'status',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt'
  };

  export type PairingScalarFieldEnum = (typeof PairingScalarFieldEnum)[keyof typeof PairingScalarFieldEnum]


  export const PairingCodeScalarFieldEnum: {
    code: 'code',
    initiatorUserId: 'initiatorUserId',
    initiatorDeviceId: 'initiatorDeviceId',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type PairingCodeScalarFieldEnum = (typeof PairingCodeScalarFieldEnum)[keyof typeof PairingCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'DevicePlatform'
   */
  export type EnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform'>
    


  /**
   * Reference to a field of type 'DevicePlatform[]'
   */
  export type ListEnumDevicePlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DevicePlatform[]'>
    


  /**
   * Reference to a field of type 'PairingStatus'
   */
  export type EnumPairingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PairingStatus'>
    


  /**
   * Reference to a field of type 'PairingStatus[]'
   */
  export type ListEnumPairingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PairingStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    devices?: DeviceListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    pairingsAsSource?: PairingListRelationFilter
    pairingsAsViewer?: PairingListRelationFilter
    pairingCodesInitiated?: PairingCodeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    devices?: DeviceOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    pairingsAsSource?: PairingOrderByRelationAggregateInput
    pairingsAsViewer?: PairingOrderByRelationAggregateInput
    pairingCodesInitiated?: PairingCodeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    devices?: DeviceListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    pairingsAsSource?: PairingListRelationFilter
    pairingsAsViewer?: PairingListRelationFilter
    pairingCodesInitiated?: PairingCodeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: UuidFilter<"Device"> | string
    userId?: UuidFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
    pairingsAsSource?: PairingListRelationFilter
    pairingsAsViewer?: PairingListRelationFilter
    pairingCodesInitiated?: PairingCodeListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    pairingsAsSource?: PairingOrderByRelationAggregateInput
    pairingsAsViewer?: PairingOrderByRelationAggregateInput
    pairingCodesInitiated?: PairingCodeOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    userId?: UuidFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    refreshTokens?: RefreshTokenListRelationFilter
    pairingsAsSource?: PairingListRelationFilter
    pairingsAsViewer?: PairingListRelationFilter
    pairingCodesInitiated?: PairingCodeListRelationFilter
  }, "id">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Device"> | string
    userId?: UuidWithAggregatesFilter<"Device"> | string
    name?: StringWithAggregatesFilter<"Device"> | string
    platform?: EnumDevicePlatformWithAggregatesFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableWithAggregatesFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Device"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Device"> | Date | string | null
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    replacedById?: UuidNullableFilter<"RefreshToken"> | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    replacedById?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    device?: DeviceOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    replacedById?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }, "id" | "tokenHash" | "replacedById">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    replacedById?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    userId?: UuidWithAggregatesFilter<"RefreshToken"> | string
    deviceId?: UuidWithAggregatesFilter<"RefreshToken"> | string
    tokenHash?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    replacedById?: UuidNullableWithAggregatesFilter<"RefreshToken"> | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type PairingWhereInput = {
    AND?: PairingWhereInput | PairingWhereInput[]
    OR?: PairingWhereInput[]
    NOT?: PairingWhereInput | PairingWhereInput[]
    id?: UuidFilter<"Pairing"> | string
    sourceUserId?: UuidFilter<"Pairing"> | string
    sourceDeviceId?: UuidFilter<"Pairing"> | string
    viewerUserId?: UuidFilter<"Pairing"> | string
    viewerDeviceId?: UuidFilter<"Pairing"> | string
    status?: EnumPairingStatusFilter<"Pairing"> | $Enums.PairingStatus
    createdAt?: DateTimeFilter<"Pairing"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Pairing"> | Date | string | null
    sourceUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    sourceDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    viewerUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    viewerDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }

  export type PairingOrderByWithRelationInput = {
    id?: SortOrder
    sourceUserId?: SortOrder
    sourceDeviceId?: SortOrder
    viewerUserId?: SortOrder
    viewerDeviceId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    sourceUser?: UserOrderByWithRelationInput
    sourceDevice?: DeviceOrderByWithRelationInput
    viewerUser?: UserOrderByWithRelationInput
    viewerDevice?: DeviceOrderByWithRelationInput
  }

  export type PairingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sourceDeviceId_viewerDeviceId?: PairingSourceDeviceIdViewerDeviceIdCompoundUniqueInput
    AND?: PairingWhereInput | PairingWhereInput[]
    OR?: PairingWhereInput[]
    NOT?: PairingWhereInput | PairingWhereInput[]
    sourceUserId?: UuidFilter<"Pairing"> | string
    sourceDeviceId?: UuidFilter<"Pairing"> | string
    viewerUserId?: UuidFilter<"Pairing"> | string
    viewerDeviceId?: UuidFilter<"Pairing"> | string
    status?: EnumPairingStatusFilter<"Pairing"> | $Enums.PairingStatus
    createdAt?: DateTimeFilter<"Pairing"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Pairing"> | Date | string | null
    sourceUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    sourceDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
    viewerUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    viewerDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }, "id" | "sourceDeviceId_viewerDeviceId">

  export type PairingOrderByWithAggregationInput = {
    id?: SortOrder
    sourceUserId?: SortOrder
    sourceDeviceId?: SortOrder
    viewerUserId?: SortOrder
    viewerDeviceId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    _count?: PairingCountOrderByAggregateInput
    _max?: PairingMaxOrderByAggregateInput
    _min?: PairingMinOrderByAggregateInput
  }

  export type PairingScalarWhereWithAggregatesInput = {
    AND?: PairingScalarWhereWithAggregatesInput | PairingScalarWhereWithAggregatesInput[]
    OR?: PairingScalarWhereWithAggregatesInput[]
    NOT?: PairingScalarWhereWithAggregatesInput | PairingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Pairing"> | string
    sourceUserId?: UuidWithAggregatesFilter<"Pairing"> | string
    sourceDeviceId?: UuidWithAggregatesFilter<"Pairing"> | string
    viewerUserId?: UuidWithAggregatesFilter<"Pairing"> | string
    viewerDeviceId?: UuidWithAggregatesFilter<"Pairing"> | string
    status?: EnumPairingStatusWithAggregatesFilter<"Pairing"> | $Enums.PairingStatus
    createdAt?: DateTimeWithAggregatesFilter<"Pairing"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"Pairing"> | Date | string | null
  }

  export type PairingCodeWhereInput = {
    AND?: PairingCodeWhereInput | PairingCodeWhereInput[]
    OR?: PairingCodeWhereInput[]
    NOT?: PairingCodeWhereInput | PairingCodeWhereInput[]
    code?: StringFilter<"PairingCode"> | string
    initiatorUserId?: UuidFilter<"PairingCode"> | string
    initiatorDeviceId?: UuidFilter<"PairingCode"> | string
    expiresAt?: DateTimeFilter<"PairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"PairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"PairingCode"> | Date | string
    initiatorUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    initiatorDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }

  export type PairingCodeOrderByWithRelationInput = {
    code?: SortOrder
    initiatorUserId?: SortOrder
    initiatorDeviceId?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    initiatorUser?: UserOrderByWithRelationInput
    initiatorDevice?: DeviceOrderByWithRelationInput
  }

  export type PairingCodeWhereUniqueInput = Prisma.AtLeast<{
    code?: string
    AND?: PairingCodeWhereInput | PairingCodeWhereInput[]
    OR?: PairingCodeWhereInput[]
    NOT?: PairingCodeWhereInput | PairingCodeWhereInput[]
    initiatorUserId?: UuidFilter<"PairingCode"> | string
    initiatorDeviceId?: UuidFilter<"PairingCode"> | string
    expiresAt?: DateTimeFilter<"PairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"PairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"PairingCode"> | Date | string
    initiatorUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    initiatorDevice?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }, "code">

  export type PairingCodeOrderByWithAggregationInput = {
    code?: SortOrder
    initiatorUserId?: SortOrder
    initiatorDeviceId?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PairingCodeCountOrderByAggregateInput
    _max?: PairingCodeMaxOrderByAggregateInput
    _min?: PairingCodeMinOrderByAggregateInput
  }

  export type PairingCodeScalarWhereWithAggregatesInput = {
    AND?: PairingCodeScalarWhereWithAggregatesInput | PairingCodeScalarWhereWithAggregatesInput[]
    OR?: PairingCodeScalarWhereWithAggregatesInput[]
    NOT?: PairingCodeScalarWhereWithAggregatesInput | PairingCodeScalarWhereWithAggregatesInput[]
    code?: StringWithAggregatesFilter<"PairingCode"> | string
    initiatorUserId?: UuidWithAggregatesFilter<"PairingCode"> | string
    initiatorDeviceId?: UuidWithAggregatesFilter<"PairingCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PairingCode"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"PairingCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PairingCode"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceCreateInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDevicesInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
    device: DeviceCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    userId: string
    deviceId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
    device?: DeviceUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    userId: string
    deviceId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingCreateInput = {
    id?: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
    sourceUser: UserCreateNestedOneWithoutPairingsAsSourceInput
    sourceDevice: DeviceCreateNestedOneWithoutPairingsAsSourceInput
    viewerUser: UserCreateNestedOneWithoutPairingsAsViewerInput
    viewerDevice: DeviceCreateNestedOneWithoutPairingsAsViewerInput
  }

  export type PairingUncheckedCreateInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceUser?: UserUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    sourceDevice?: DeviceUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    viewerUser?: UserUpdateOneRequiredWithoutPairingsAsViewerNestedInput
    viewerDevice?: DeviceUpdateOneRequiredWithoutPairingsAsViewerNestedInput
  }

  export type PairingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingCreateManyInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingCodeCreateInput = {
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    initiatorUser: UserCreateNestedOneWithoutPairingCodesInitiatedInput
    initiatorDevice: DeviceCreateNestedOneWithoutPairingCodesInitiatedInput
  }

  export type PairingCodeUncheckedCreateInput = {
    code: string
    initiatorUserId: string
    initiatorDeviceId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCodeUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorUser?: UserUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput
    initiatorDevice?: DeviceUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput
  }

  export type PairingCodeUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    initiatorDeviceId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingCodeCreateManyInput = {
    code: string
    initiatorUserId: string
    initiatorDeviceId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCodeUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingCodeUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    initiatorDeviceId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type PairingListRelationFilter = {
    every?: PairingWhereInput
    some?: PairingWhereInput
    none?: PairingWhereInput
  }

  export type PairingCodeListRelationFilter = {
    every?: PairingCodeWhereInput
    some?: PairingCodeWhereInput
    none?: PairingCodeWhereInput
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PairingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PairingCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    platform?: SortOrder
    pushToken?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type EnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DeviceScalarRelationFilter = {
    is?: DeviceWhereInput
    isNot?: DeviceWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    replacedById?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    replacedById?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deviceId?: SortOrder
    tokenHash?: SortOrder
    expiresAt?: SortOrder
    replacedById?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPairingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PairingStatus | EnumPairingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPairingStatusFilter<$PrismaModel> | $Enums.PairingStatus
  }

  export type PairingSourceDeviceIdViewerDeviceIdCompoundUniqueInput = {
    sourceDeviceId: string
    viewerDeviceId: string
  }

  export type PairingCountOrderByAggregateInput = {
    id?: SortOrder
    sourceUserId?: SortOrder
    sourceDeviceId?: SortOrder
    viewerUserId?: SortOrder
    viewerDeviceId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type PairingMaxOrderByAggregateInput = {
    id?: SortOrder
    sourceUserId?: SortOrder
    sourceDeviceId?: SortOrder
    viewerUserId?: SortOrder
    viewerDeviceId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type PairingMinOrderByAggregateInput = {
    id?: SortOrder
    sourceUserId?: SortOrder
    sourceDeviceId?: SortOrder
    viewerUserId?: SortOrder
    viewerDeviceId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
  }

  export type EnumPairingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PairingStatus | EnumPairingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPairingStatusWithAggregatesFilter<$PrismaModel> | $Enums.PairingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPairingStatusFilter<$PrismaModel>
    _max?: NestedEnumPairingStatusFilter<$PrismaModel>
  }

  export type PairingCodeCountOrderByAggregateInput = {
    code?: SortOrder
    initiatorUserId?: SortOrder
    initiatorDeviceId?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PairingCodeMaxOrderByAggregateInput = {
    code?: SortOrder
    initiatorUserId?: SortOrder
    initiatorDeviceId?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PairingCodeMinOrderByAggregateInput = {
    code?: SortOrder
    initiatorUserId?: SortOrder
    initiatorDeviceId?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PairingCreateNestedManyWithoutSourceUserInput = {
    create?: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput> | PairingCreateWithoutSourceUserInput[] | PairingUncheckedCreateWithoutSourceUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceUserInput | PairingCreateOrConnectWithoutSourceUserInput[]
    createMany?: PairingCreateManySourceUserInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCreateNestedManyWithoutViewerUserInput = {
    create?: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput> | PairingCreateWithoutViewerUserInput[] | PairingUncheckedCreateWithoutViewerUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerUserInput | PairingCreateOrConnectWithoutViewerUserInput[]
    createMany?: PairingCreateManyViewerUserInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCodeCreateNestedManyWithoutInitiatorUserInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput> | PairingCodeCreateWithoutInitiatorUserInput[] | PairingCodeUncheckedCreateWithoutInitiatorUserInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorUserInput | PairingCodeCreateOrConnectWithoutInitiatorUserInput[]
    createMany?: PairingCodeCreateManyInitiatorUserInputEnvelope
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
  }

  export type DeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PairingUncheckedCreateNestedManyWithoutSourceUserInput = {
    create?: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput> | PairingCreateWithoutSourceUserInput[] | PairingUncheckedCreateWithoutSourceUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceUserInput | PairingCreateOrConnectWithoutSourceUserInput[]
    createMany?: PairingCreateManySourceUserInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingUncheckedCreateNestedManyWithoutViewerUserInput = {
    create?: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput> | PairingCreateWithoutViewerUserInput[] | PairingUncheckedCreateWithoutViewerUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerUserInput | PairingCreateOrConnectWithoutViewerUserInput[]
    createMany?: PairingCreateManyViewerUserInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput> | PairingCodeCreateWithoutInitiatorUserInput[] | PairingCodeUncheckedCreateWithoutInitiatorUserInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorUserInput | PairingCodeCreateOrConnectWithoutInitiatorUserInput[]
    createMany?: PairingCodeCreateManyInitiatorUserInputEnvelope
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PairingUpdateManyWithoutSourceUserNestedInput = {
    create?: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput> | PairingCreateWithoutSourceUserInput[] | PairingUncheckedCreateWithoutSourceUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceUserInput | PairingCreateOrConnectWithoutSourceUserInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutSourceUserInput | PairingUpsertWithWhereUniqueWithoutSourceUserInput[]
    createMany?: PairingCreateManySourceUserInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutSourceUserInput | PairingUpdateWithWhereUniqueWithoutSourceUserInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutSourceUserInput | PairingUpdateManyWithWhereWithoutSourceUserInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingUpdateManyWithoutViewerUserNestedInput = {
    create?: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput> | PairingCreateWithoutViewerUserInput[] | PairingUncheckedCreateWithoutViewerUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerUserInput | PairingCreateOrConnectWithoutViewerUserInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutViewerUserInput | PairingUpsertWithWhereUniqueWithoutViewerUserInput[]
    createMany?: PairingCreateManyViewerUserInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutViewerUserInput | PairingUpdateWithWhereUniqueWithoutViewerUserInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutViewerUserInput | PairingUpdateManyWithWhereWithoutViewerUserInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingCodeUpdateManyWithoutInitiatorUserNestedInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput> | PairingCodeCreateWithoutInitiatorUserInput[] | PairingCodeUncheckedCreateWithoutInitiatorUserInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorUserInput | PairingCodeCreateOrConnectWithoutInitiatorUserInput[]
    upsert?: PairingCodeUpsertWithWhereUniqueWithoutInitiatorUserInput | PairingCodeUpsertWithWhereUniqueWithoutInitiatorUserInput[]
    createMany?: PairingCodeCreateManyInitiatorUserInputEnvelope
    set?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    disconnect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    delete?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    update?: PairingCodeUpdateWithWhereUniqueWithoutInitiatorUserInput | PairingCodeUpdateWithWhereUniqueWithoutInitiatorUserInput[]
    updateMany?: PairingCodeUpdateManyWithWhereWithoutInitiatorUserInput | PairingCodeUpdateManyWithWhereWithoutInitiatorUserInput[]
    deleteMany?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
  }

  export type DeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput> | DeviceCreateWithoutUserInput[] | DeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutUserInput | DeviceCreateOrConnectWithoutUserInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutUserInput | DeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeviceCreateManyUserInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutUserInput | DeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutUserInput | DeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PairingUncheckedUpdateManyWithoutSourceUserNestedInput = {
    create?: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput> | PairingCreateWithoutSourceUserInput[] | PairingUncheckedCreateWithoutSourceUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceUserInput | PairingCreateOrConnectWithoutSourceUserInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutSourceUserInput | PairingUpsertWithWhereUniqueWithoutSourceUserInput[]
    createMany?: PairingCreateManySourceUserInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutSourceUserInput | PairingUpdateWithWhereUniqueWithoutSourceUserInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutSourceUserInput | PairingUpdateManyWithWhereWithoutSourceUserInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingUncheckedUpdateManyWithoutViewerUserNestedInput = {
    create?: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput> | PairingCreateWithoutViewerUserInput[] | PairingUncheckedCreateWithoutViewerUserInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerUserInput | PairingCreateOrConnectWithoutViewerUserInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutViewerUserInput | PairingUpsertWithWhereUniqueWithoutViewerUserInput[]
    createMany?: PairingCreateManyViewerUserInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutViewerUserInput | PairingUpdateWithWhereUniqueWithoutViewerUserInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutViewerUserInput | PairingUpdateManyWithWhereWithoutViewerUserInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput> | PairingCodeCreateWithoutInitiatorUserInput[] | PairingCodeUncheckedCreateWithoutInitiatorUserInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorUserInput | PairingCodeCreateOrConnectWithoutInitiatorUserInput[]
    upsert?: PairingCodeUpsertWithWhereUniqueWithoutInitiatorUserInput | PairingCodeUpsertWithWhereUniqueWithoutInitiatorUserInput[]
    createMany?: PairingCodeCreateManyInitiatorUserInputEnvelope
    set?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    disconnect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    delete?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    update?: PairingCodeUpdateWithWhereUniqueWithoutInitiatorUserInput | PairingCodeUpdateWithWhereUniqueWithoutInitiatorUserInput[]
    updateMany?: PairingCodeUpdateManyWithWhereWithoutInitiatorUserInput | PairingCodeUpdateManyWithWhereWithoutInitiatorUserInput[]
    deleteMany?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDevicesInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    connect?: UserWhereUniqueInput
  }

  export type RefreshTokenCreateNestedManyWithoutDeviceInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PairingCreateNestedManyWithoutSourceDeviceInput = {
    create?: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput> | PairingCreateWithoutSourceDeviceInput[] | PairingUncheckedCreateWithoutSourceDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceDeviceInput | PairingCreateOrConnectWithoutSourceDeviceInput[]
    createMany?: PairingCreateManySourceDeviceInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCreateNestedManyWithoutViewerDeviceInput = {
    create?: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput> | PairingCreateWithoutViewerDeviceInput[] | PairingUncheckedCreateWithoutViewerDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerDeviceInput | PairingCreateOrConnectWithoutViewerDeviceInput[]
    createMany?: PairingCreateManyViewerDeviceInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCodeCreateNestedManyWithoutInitiatorDeviceInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput> | PairingCodeCreateWithoutInitiatorDeviceInput[] | PairingCodeUncheckedCreateWithoutInitiatorDeviceInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorDeviceInput | PairingCodeCreateOrConnectWithoutInitiatorDeviceInput[]
    createMany?: PairingCodeCreateManyInitiatorDeviceInputEnvelope
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PairingUncheckedCreateNestedManyWithoutSourceDeviceInput = {
    create?: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput> | PairingCreateWithoutSourceDeviceInput[] | PairingUncheckedCreateWithoutSourceDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceDeviceInput | PairingCreateOrConnectWithoutSourceDeviceInput[]
    createMany?: PairingCreateManySourceDeviceInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingUncheckedCreateNestedManyWithoutViewerDeviceInput = {
    create?: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput> | PairingCreateWithoutViewerDeviceInput[] | PairingUncheckedCreateWithoutViewerDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerDeviceInput | PairingCreateOrConnectWithoutViewerDeviceInput[]
    createMany?: PairingCreateManyViewerDeviceInputEnvelope
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
  }

  export type PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput> | PairingCodeCreateWithoutInitiatorDeviceInput[] | PairingCodeUncheckedCreateWithoutInitiatorDeviceInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorDeviceInput | PairingCodeCreateOrConnectWithoutInitiatorDeviceInput[]
    createMany?: PairingCodeCreateManyInitiatorDeviceInputEnvelope
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
  }

  export type EnumDevicePlatformFieldUpdateOperationsInput = {
    set?: $Enums.DevicePlatform
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    upsert?: UserUpsertWithoutDevicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDevicesInput, UserUpdateWithoutDevicesInput>, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type RefreshTokenUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput | RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput | RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutDeviceInput | RefreshTokenUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PairingUpdateManyWithoutSourceDeviceNestedInput = {
    create?: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput> | PairingCreateWithoutSourceDeviceInput[] | PairingUncheckedCreateWithoutSourceDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceDeviceInput | PairingCreateOrConnectWithoutSourceDeviceInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutSourceDeviceInput | PairingUpsertWithWhereUniqueWithoutSourceDeviceInput[]
    createMany?: PairingCreateManySourceDeviceInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutSourceDeviceInput | PairingUpdateWithWhereUniqueWithoutSourceDeviceInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutSourceDeviceInput | PairingUpdateManyWithWhereWithoutSourceDeviceInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingUpdateManyWithoutViewerDeviceNestedInput = {
    create?: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput> | PairingCreateWithoutViewerDeviceInput[] | PairingUncheckedCreateWithoutViewerDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerDeviceInput | PairingCreateOrConnectWithoutViewerDeviceInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutViewerDeviceInput | PairingUpsertWithWhereUniqueWithoutViewerDeviceInput[]
    createMany?: PairingCreateManyViewerDeviceInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutViewerDeviceInput | PairingUpdateWithWhereUniqueWithoutViewerDeviceInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutViewerDeviceInput | PairingUpdateManyWithWhereWithoutViewerDeviceInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput> | PairingCodeCreateWithoutInitiatorDeviceInput[] | PairingCodeUncheckedCreateWithoutInitiatorDeviceInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorDeviceInput | PairingCodeCreateOrConnectWithoutInitiatorDeviceInput[]
    upsert?: PairingCodeUpsertWithWhereUniqueWithoutInitiatorDeviceInput | PairingCodeUpsertWithWhereUniqueWithoutInitiatorDeviceInput[]
    createMany?: PairingCodeCreateManyInitiatorDeviceInputEnvelope
    set?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    disconnect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    delete?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    update?: PairingCodeUpdateWithWhereUniqueWithoutInitiatorDeviceInput | PairingCodeUpdateWithWhereUniqueWithoutInitiatorDeviceInput[]
    updateMany?: PairingCodeUpdateManyWithWhereWithoutInitiatorDeviceInput | PairingCodeUpdateManyWithWhereWithoutInitiatorDeviceInput[]
    deleteMany?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput> | RefreshTokenCreateWithoutDeviceInput[] | RefreshTokenUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutDeviceInput | RefreshTokenCreateOrConnectWithoutDeviceInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput | RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: RefreshTokenCreateManyDeviceInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput | RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutDeviceInput | RefreshTokenUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput = {
    create?: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput> | PairingCreateWithoutSourceDeviceInput[] | PairingUncheckedCreateWithoutSourceDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutSourceDeviceInput | PairingCreateOrConnectWithoutSourceDeviceInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutSourceDeviceInput | PairingUpsertWithWhereUniqueWithoutSourceDeviceInput[]
    createMany?: PairingCreateManySourceDeviceInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutSourceDeviceInput | PairingUpdateWithWhereUniqueWithoutSourceDeviceInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutSourceDeviceInput | PairingUpdateManyWithWhereWithoutSourceDeviceInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput = {
    create?: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput> | PairingCreateWithoutViewerDeviceInput[] | PairingUncheckedCreateWithoutViewerDeviceInput[]
    connectOrCreate?: PairingCreateOrConnectWithoutViewerDeviceInput | PairingCreateOrConnectWithoutViewerDeviceInput[]
    upsert?: PairingUpsertWithWhereUniqueWithoutViewerDeviceInput | PairingUpsertWithWhereUniqueWithoutViewerDeviceInput[]
    createMany?: PairingCreateManyViewerDeviceInputEnvelope
    set?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    disconnect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    delete?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    connect?: PairingWhereUniqueInput | PairingWhereUniqueInput[]
    update?: PairingUpdateWithWhereUniqueWithoutViewerDeviceInput | PairingUpdateWithWhereUniqueWithoutViewerDeviceInput[]
    updateMany?: PairingUpdateManyWithWhereWithoutViewerDeviceInput | PairingUpdateManyWithWhereWithoutViewerDeviceInput[]
    deleteMany?: PairingScalarWhereInput | PairingScalarWhereInput[]
  }

  export type PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput = {
    create?: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput> | PairingCodeCreateWithoutInitiatorDeviceInput[] | PairingCodeUncheckedCreateWithoutInitiatorDeviceInput[]
    connectOrCreate?: PairingCodeCreateOrConnectWithoutInitiatorDeviceInput | PairingCodeCreateOrConnectWithoutInitiatorDeviceInput[]
    upsert?: PairingCodeUpsertWithWhereUniqueWithoutInitiatorDeviceInput | PairingCodeUpsertWithWhereUniqueWithoutInitiatorDeviceInput[]
    createMany?: PairingCodeCreateManyInitiatorDeviceInputEnvelope
    set?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    disconnect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    delete?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    connect?: PairingCodeWhereUniqueInput | PairingCodeWhereUniqueInput[]
    update?: PairingCodeUpdateWithWhereUniqueWithoutInitiatorDeviceInput | PairingCodeUpdateWithWhereUniqueWithoutInitiatorDeviceInput[]
    updateMany?: PairingCodeUpdateManyWithWhereWithoutInitiatorDeviceInput | PairingCodeUpdateManyWithWhereWithoutInitiatorDeviceInput[]
    deleteMany?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutRefreshTokensInput
    connect?: DeviceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type DeviceUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutRefreshTokensInput
    upsert?: DeviceUpsertWithoutRefreshTokensInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutRefreshTokensInput, DeviceUpdateWithoutRefreshTokensInput>, DeviceUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutPairingsAsSourceInput = {
    create?: XOR<UserCreateWithoutPairingsAsSourceInput, UserUncheckedCreateWithoutPairingsAsSourceInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingsAsSourceInput
    connect?: UserWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutPairingsAsSourceInput = {
    create?: XOR<DeviceCreateWithoutPairingsAsSourceInput, DeviceUncheckedCreateWithoutPairingsAsSourceInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingsAsSourceInput
    connect?: DeviceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPairingsAsViewerInput = {
    create?: XOR<UserCreateWithoutPairingsAsViewerInput, UserUncheckedCreateWithoutPairingsAsViewerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingsAsViewerInput
    connect?: UserWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutPairingsAsViewerInput = {
    create?: XOR<DeviceCreateWithoutPairingsAsViewerInput, DeviceUncheckedCreateWithoutPairingsAsViewerInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingsAsViewerInput
    connect?: DeviceWhereUniqueInput
  }

  export type EnumPairingStatusFieldUpdateOperationsInput = {
    set?: $Enums.PairingStatus
  }

  export type UserUpdateOneRequiredWithoutPairingsAsSourceNestedInput = {
    create?: XOR<UserCreateWithoutPairingsAsSourceInput, UserUncheckedCreateWithoutPairingsAsSourceInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingsAsSourceInput
    upsert?: UserUpsertWithoutPairingsAsSourceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPairingsAsSourceInput, UserUpdateWithoutPairingsAsSourceInput>, UserUncheckedUpdateWithoutPairingsAsSourceInput>
  }

  export type DeviceUpdateOneRequiredWithoutPairingsAsSourceNestedInput = {
    create?: XOR<DeviceCreateWithoutPairingsAsSourceInput, DeviceUncheckedCreateWithoutPairingsAsSourceInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingsAsSourceInput
    upsert?: DeviceUpsertWithoutPairingsAsSourceInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutPairingsAsSourceInput, DeviceUpdateWithoutPairingsAsSourceInput>, DeviceUncheckedUpdateWithoutPairingsAsSourceInput>
  }

  export type UserUpdateOneRequiredWithoutPairingsAsViewerNestedInput = {
    create?: XOR<UserCreateWithoutPairingsAsViewerInput, UserUncheckedCreateWithoutPairingsAsViewerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingsAsViewerInput
    upsert?: UserUpsertWithoutPairingsAsViewerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPairingsAsViewerInput, UserUpdateWithoutPairingsAsViewerInput>, UserUncheckedUpdateWithoutPairingsAsViewerInput>
  }

  export type DeviceUpdateOneRequiredWithoutPairingsAsViewerNestedInput = {
    create?: XOR<DeviceCreateWithoutPairingsAsViewerInput, DeviceUncheckedCreateWithoutPairingsAsViewerInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingsAsViewerInput
    upsert?: DeviceUpsertWithoutPairingsAsViewerInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutPairingsAsViewerInput, DeviceUpdateWithoutPairingsAsViewerInput>, DeviceUncheckedUpdateWithoutPairingsAsViewerInput>
  }

  export type UserCreateNestedOneWithoutPairingCodesInitiatedInput = {
    create?: XOR<UserCreateWithoutPairingCodesInitiatedInput, UserUncheckedCreateWithoutPairingCodesInitiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingCodesInitiatedInput
    connect?: UserWhereUniqueInput
  }

  export type DeviceCreateNestedOneWithoutPairingCodesInitiatedInput = {
    create?: XOR<DeviceCreateWithoutPairingCodesInitiatedInput, DeviceUncheckedCreateWithoutPairingCodesInitiatedInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingCodesInitiatedInput
    connect?: DeviceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput = {
    create?: XOR<UserCreateWithoutPairingCodesInitiatedInput, UserUncheckedCreateWithoutPairingCodesInitiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairingCodesInitiatedInput
    upsert?: UserUpsertWithoutPairingCodesInitiatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPairingCodesInitiatedInput, UserUpdateWithoutPairingCodesInitiatedInput>, UserUncheckedUpdateWithoutPairingCodesInitiatedInput>
  }

  export type DeviceUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput = {
    create?: XOR<DeviceCreateWithoutPairingCodesInitiatedInput, DeviceUncheckedCreateWithoutPairingCodesInitiatedInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutPairingCodesInitiatedInput
    upsert?: DeviceUpsertWithoutPairingCodesInitiatedInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutPairingCodesInitiatedInput, DeviceUpdateWithoutPairingCodesInitiatedInput>, DeviceUncheckedUpdateWithoutPairingCodesInitiatedInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDevicePlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformFilter<$PrismaModel> | $Enums.DevicePlatform
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DevicePlatform | EnumDevicePlatformFieldRefInput<$PrismaModel>
    in?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.DevicePlatform[] | ListEnumDevicePlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumDevicePlatformWithAggregatesFilter<$PrismaModel> | $Enums.DevicePlatform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDevicePlatformFilter<$PrismaModel>
    _max?: NestedEnumDevicePlatformFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPairingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PairingStatus | EnumPairingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPairingStatusFilter<$PrismaModel> | $Enums.PairingStatus
  }

  export type NestedEnumPairingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PairingStatus | EnumPairingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PairingStatus[] | ListEnumPairingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPairingStatusWithAggregatesFilter<$PrismaModel> | $Enums.PairingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPairingStatusFilter<$PrismaModel>
    _max?: NestedEnumPairingStatusFilter<$PrismaModel>
  }

  export type DeviceCreateWithoutUserInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceCreateOrConnectWithoutUserInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceCreateManyUserInputEnvelope = {
    data: DeviceCreateManyUserInput | DeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    device: DeviceCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    deviceId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PairingCreateWithoutSourceUserInput = {
    id?: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
    sourceDevice: DeviceCreateNestedOneWithoutPairingsAsSourceInput
    viewerUser: UserCreateNestedOneWithoutPairingsAsViewerInput
    viewerDevice: DeviceCreateNestedOneWithoutPairingsAsViewerInput
  }

  export type PairingUncheckedCreateWithoutSourceUserInput = {
    id?: string
    sourceDeviceId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateOrConnectWithoutSourceUserInput = {
    where: PairingWhereUniqueInput
    create: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput>
  }

  export type PairingCreateManySourceUserInputEnvelope = {
    data: PairingCreateManySourceUserInput | PairingCreateManySourceUserInput[]
    skipDuplicates?: boolean
  }

  export type PairingCreateWithoutViewerUserInput = {
    id?: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
    sourceUser: UserCreateNestedOneWithoutPairingsAsSourceInput
    sourceDevice: DeviceCreateNestedOneWithoutPairingsAsSourceInput
    viewerDevice: DeviceCreateNestedOneWithoutPairingsAsViewerInput
  }

  export type PairingUncheckedCreateWithoutViewerUserInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateOrConnectWithoutViewerUserInput = {
    where: PairingWhereUniqueInput
    create: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput>
  }

  export type PairingCreateManyViewerUserInputEnvelope = {
    data: PairingCreateManyViewerUserInput | PairingCreateManyViewerUserInput[]
    skipDuplicates?: boolean
  }

  export type PairingCodeCreateWithoutInitiatorUserInput = {
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    initiatorDevice: DeviceCreateNestedOneWithoutPairingCodesInitiatedInput
  }

  export type PairingCodeUncheckedCreateWithoutInitiatorUserInput = {
    code: string
    initiatorDeviceId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCodeCreateOrConnectWithoutInitiatorUserInput = {
    where: PairingCodeWhereUniqueInput
    create: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput>
  }

  export type PairingCodeCreateManyInitiatorUserInputEnvelope = {
    data: PairingCodeCreateManyInitiatorUserInput | PairingCodeCreateManyInitiatorUserInput[]
    skipDuplicates?: boolean
  }

  export type DeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
    create: XOR<DeviceCreateWithoutUserInput, DeviceUncheckedCreateWithoutUserInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutUserInput, DeviceUncheckedUpdateWithoutUserInput>
  }

  export type DeviceUpdateManyWithWhereWithoutUserInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    OR?: DeviceScalarWhereInput[]
    NOT?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    id?: UuidFilter<"Device"> | string
    userId?: UuidFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    platform?: EnumDevicePlatformFilter<"Device"> | $Enums.DevicePlatform
    pushToken?: StringNullableFilter<"Device"> | string | null
    lastSeenAt?: DateTimeNullableFilter<"Device"> | Date | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Device"> | Date | string | null
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    deviceId?: UuidFilter<"RefreshToken"> | string
    tokenHash?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    replacedById?: UuidNullableFilter<"RefreshToken"> | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type PairingUpsertWithWhereUniqueWithoutSourceUserInput = {
    where: PairingWhereUniqueInput
    update: XOR<PairingUpdateWithoutSourceUserInput, PairingUncheckedUpdateWithoutSourceUserInput>
    create: XOR<PairingCreateWithoutSourceUserInput, PairingUncheckedCreateWithoutSourceUserInput>
  }

  export type PairingUpdateWithWhereUniqueWithoutSourceUserInput = {
    where: PairingWhereUniqueInput
    data: XOR<PairingUpdateWithoutSourceUserInput, PairingUncheckedUpdateWithoutSourceUserInput>
  }

  export type PairingUpdateManyWithWhereWithoutSourceUserInput = {
    where: PairingScalarWhereInput
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyWithoutSourceUserInput>
  }

  export type PairingScalarWhereInput = {
    AND?: PairingScalarWhereInput | PairingScalarWhereInput[]
    OR?: PairingScalarWhereInput[]
    NOT?: PairingScalarWhereInput | PairingScalarWhereInput[]
    id?: UuidFilter<"Pairing"> | string
    sourceUserId?: UuidFilter<"Pairing"> | string
    sourceDeviceId?: UuidFilter<"Pairing"> | string
    viewerUserId?: UuidFilter<"Pairing"> | string
    viewerDeviceId?: UuidFilter<"Pairing"> | string
    status?: EnumPairingStatusFilter<"Pairing"> | $Enums.PairingStatus
    createdAt?: DateTimeFilter<"Pairing"> | Date | string
    revokedAt?: DateTimeNullableFilter<"Pairing"> | Date | string | null
  }

  export type PairingUpsertWithWhereUniqueWithoutViewerUserInput = {
    where: PairingWhereUniqueInput
    update: XOR<PairingUpdateWithoutViewerUserInput, PairingUncheckedUpdateWithoutViewerUserInput>
    create: XOR<PairingCreateWithoutViewerUserInput, PairingUncheckedCreateWithoutViewerUserInput>
  }

  export type PairingUpdateWithWhereUniqueWithoutViewerUserInput = {
    where: PairingWhereUniqueInput
    data: XOR<PairingUpdateWithoutViewerUserInput, PairingUncheckedUpdateWithoutViewerUserInput>
  }

  export type PairingUpdateManyWithWhereWithoutViewerUserInput = {
    where: PairingScalarWhereInput
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyWithoutViewerUserInput>
  }

  export type PairingCodeUpsertWithWhereUniqueWithoutInitiatorUserInput = {
    where: PairingCodeWhereUniqueInput
    update: XOR<PairingCodeUpdateWithoutInitiatorUserInput, PairingCodeUncheckedUpdateWithoutInitiatorUserInput>
    create: XOR<PairingCodeCreateWithoutInitiatorUserInput, PairingCodeUncheckedCreateWithoutInitiatorUserInput>
  }

  export type PairingCodeUpdateWithWhereUniqueWithoutInitiatorUserInput = {
    where: PairingCodeWhereUniqueInput
    data: XOR<PairingCodeUpdateWithoutInitiatorUserInput, PairingCodeUncheckedUpdateWithoutInitiatorUserInput>
  }

  export type PairingCodeUpdateManyWithWhereWithoutInitiatorUserInput = {
    where: PairingCodeScalarWhereInput
    data: XOR<PairingCodeUpdateManyMutationInput, PairingCodeUncheckedUpdateManyWithoutInitiatorUserInput>
  }

  export type PairingCodeScalarWhereInput = {
    AND?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
    OR?: PairingCodeScalarWhereInput[]
    NOT?: PairingCodeScalarWhereInput | PairingCodeScalarWhereInput[]
    code?: StringFilter<"PairingCode"> | string
    initiatorUserId?: UuidFilter<"PairingCode"> | string
    initiatorDeviceId?: UuidFilter<"PairingCode"> | string
    expiresAt?: DateTimeFilter<"PairingCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"PairingCode"> | Date | string | null
    createdAt?: DateTimeFilter<"PairingCode"> | Date | string
  }

  export type UserCreateWithoutDevicesInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUncheckedCreateWithoutDevicesInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserCreateOrConnectWithoutDevicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
  }

  export type RefreshTokenCreateWithoutDeviceInput = {
    id?: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutDeviceInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput>
  }

  export type RefreshTokenCreateManyDeviceInputEnvelope = {
    data: RefreshTokenCreateManyDeviceInput | RefreshTokenCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type PairingCreateWithoutSourceDeviceInput = {
    id?: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
    sourceUser: UserCreateNestedOneWithoutPairingsAsSourceInput
    viewerUser: UserCreateNestedOneWithoutPairingsAsViewerInput
    viewerDevice: DeviceCreateNestedOneWithoutPairingsAsViewerInput
  }

  export type PairingUncheckedCreateWithoutSourceDeviceInput = {
    id?: string
    sourceUserId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateOrConnectWithoutSourceDeviceInput = {
    where: PairingWhereUniqueInput
    create: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput>
  }

  export type PairingCreateManySourceDeviceInputEnvelope = {
    data: PairingCreateManySourceDeviceInput | PairingCreateManySourceDeviceInput[]
    skipDuplicates?: boolean
  }

  export type PairingCreateWithoutViewerDeviceInput = {
    id?: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
    sourceUser: UserCreateNestedOneWithoutPairingsAsSourceInput
    sourceDevice: DeviceCreateNestedOneWithoutPairingsAsSourceInput
    viewerUser: UserCreateNestedOneWithoutPairingsAsViewerInput
  }

  export type PairingUncheckedCreateWithoutViewerDeviceInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerUserId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateOrConnectWithoutViewerDeviceInput = {
    where: PairingWhereUniqueInput
    create: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput>
  }

  export type PairingCreateManyViewerDeviceInputEnvelope = {
    data: PairingCreateManyViewerDeviceInput | PairingCreateManyViewerDeviceInput[]
    skipDuplicates?: boolean
  }

  export type PairingCodeCreateWithoutInitiatorDeviceInput = {
    code: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    initiatorUser: UserCreateNestedOneWithoutPairingCodesInitiatedInput
  }

  export type PairingCodeUncheckedCreateWithoutInitiatorDeviceInput = {
    code: string
    initiatorUserId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCodeCreateOrConnectWithoutInitiatorDeviceInput = {
    where: PairingCodeWhereUniqueInput
    create: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput>
  }

  export type PairingCodeCreateManyInitiatorDeviceInputEnvelope = {
    data: PairingCodeCreateManyInitiatorDeviceInput | PairingCodeCreateManyInitiatorDeviceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDevicesInput = {
    update: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutDeviceInput, RefreshTokenUncheckedUpdateWithoutDeviceInput>
    create: XOR<RefreshTokenCreateWithoutDeviceInput, RefreshTokenUncheckedCreateWithoutDeviceInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutDeviceInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutDeviceInput, RefreshTokenUncheckedUpdateWithoutDeviceInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutDeviceInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutDeviceInput>
  }

  export type PairingUpsertWithWhereUniqueWithoutSourceDeviceInput = {
    where: PairingWhereUniqueInput
    update: XOR<PairingUpdateWithoutSourceDeviceInput, PairingUncheckedUpdateWithoutSourceDeviceInput>
    create: XOR<PairingCreateWithoutSourceDeviceInput, PairingUncheckedCreateWithoutSourceDeviceInput>
  }

  export type PairingUpdateWithWhereUniqueWithoutSourceDeviceInput = {
    where: PairingWhereUniqueInput
    data: XOR<PairingUpdateWithoutSourceDeviceInput, PairingUncheckedUpdateWithoutSourceDeviceInput>
  }

  export type PairingUpdateManyWithWhereWithoutSourceDeviceInput = {
    where: PairingScalarWhereInput
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyWithoutSourceDeviceInput>
  }

  export type PairingUpsertWithWhereUniqueWithoutViewerDeviceInput = {
    where: PairingWhereUniqueInput
    update: XOR<PairingUpdateWithoutViewerDeviceInput, PairingUncheckedUpdateWithoutViewerDeviceInput>
    create: XOR<PairingCreateWithoutViewerDeviceInput, PairingUncheckedCreateWithoutViewerDeviceInput>
  }

  export type PairingUpdateWithWhereUniqueWithoutViewerDeviceInput = {
    where: PairingWhereUniqueInput
    data: XOR<PairingUpdateWithoutViewerDeviceInput, PairingUncheckedUpdateWithoutViewerDeviceInput>
  }

  export type PairingUpdateManyWithWhereWithoutViewerDeviceInput = {
    where: PairingScalarWhereInput
    data: XOR<PairingUpdateManyMutationInput, PairingUncheckedUpdateManyWithoutViewerDeviceInput>
  }

  export type PairingCodeUpsertWithWhereUniqueWithoutInitiatorDeviceInput = {
    where: PairingCodeWhereUniqueInput
    update: XOR<PairingCodeUpdateWithoutInitiatorDeviceInput, PairingCodeUncheckedUpdateWithoutInitiatorDeviceInput>
    create: XOR<PairingCodeCreateWithoutInitiatorDeviceInput, PairingCodeUncheckedCreateWithoutInitiatorDeviceInput>
  }

  export type PairingCodeUpdateWithWhereUniqueWithoutInitiatorDeviceInput = {
    where: PairingCodeWhereUniqueInput
    data: XOR<PairingCodeUpdateWithoutInitiatorDeviceInput, PairingCodeUncheckedUpdateWithoutInitiatorDeviceInput>
  }

  export type PairingCodeUpdateManyWithWhereWithoutInitiatorDeviceInput = {
    where: PairingCodeScalarWhereInput
    data: XOR<PairingCodeUpdateManyMutationInput, PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceInput>
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type DeviceCreateWithoutRefreshTokensInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDevicesInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceCreateOrConnectWithoutRefreshTokensInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput
  }

  export type DeviceUpsertWithoutRefreshTokensInput = {
    update: XOR<DeviceUpdateWithoutRefreshTokensInput, DeviceUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<DeviceCreateWithoutRefreshTokensInput, DeviceUncheckedCreateWithoutRefreshTokensInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutRefreshTokensInput, DeviceUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type DeviceUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type UserCreateWithoutPairingsAsSourceInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUncheckedCreateWithoutPairingsAsSourceInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerUserInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserCreateOrConnectWithoutPairingsAsSourceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPairingsAsSourceInput, UserUncheckedCreateWithoutPairingsAsSourceInput>
  }

  export type DeviceCreateWithoutPairingsAsSourceInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDevicesInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUncheckedCreateWithoutPairingsAsSourceInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerDeviceInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceCreateOrConnectWithoutPairingsAsSourceInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutPairingsAsSourceInput, DeviceUncheckedCreateWithoutPairingsAsSourceInput>
  }

  export type UserCreateWithoutPairingsAsViewerInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceUserInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserUncheckedCreateWithoutPairingsAsViewerInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceUserInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorUserInput
  }

  export type UserCreateOrConnectWithoutPairingsAsViewerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPairingsAsViewerInput, UserUncheckedCreateWithoutPairingsAsViewerInput>
  }

  export type DeviceCreateWithoutPairingsAsViewerInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDevicesInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceDeviceInput
    pairingCodesInitiated?: PairingCodeCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceUncheckedCreateWithoutPairingsAsViewerInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceDeviceInput
    pairingCodesInitiated?: PairingCodeUncheckedCreateNestedManyWithoutInitiatorDeviceInput
  }

  export type DeviceCreateOrConnectWithoutPairingsAsViewerInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutPairingsAsViewerInput, DeviceUncheckedCreateWithoutPairingsAsViewerInput>
  }

  export type UserUpsertWithoutPairingsAsSourceInput = {
    update: XOR<UserUpdateWithoutPairingsAsSourceInput, UserUncheckedUpdateWithoutPairingsAsSourceInput>
    create: XOR<UserCreateWithoutPairingsAsSourceInput, UserUncheckedCreateWithoutPairingsAsSourceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPairingsAsSourceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPairingsAsSourceInput, UserUncheckedUpdateWithoutPairingsAsSourceInput>
  }

  export type UserUpdateWithoutPairingsAsSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPairingsAsSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerUserNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput
  }

  export type DeviceUpsertWithoutPairingsAsSourceInput = {
    update: XOR<DeviceUpdateWithoutPairingsAsSourceInput, DeviceUncheckedUpdateWithoutPairingsAsSourceInput>
    create: XOR<DeviceCreateWithoutPairingsAsSourceInput, DeviceUncheckedCreateWithoutPairingsAsSourceInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutPairingsAsSourceInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutPairingsAsSourceInput, DeviceUncheckedUpdateWithoutPairingsAsSourceInput>
  }

  export type DeviceUpdateWithoutPairingsAsSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutPairingsAsSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type UserUpsertWithoutPairingsAsViewerInput = {
    update: XOR<UserUpdateWithoutPairingsAsViewerInput, UserUncheckedUpdateWithoutPairingsAsViewerInput>
    create: XOR<UserCreateWithoutPairingsAsViewerInput, UserUncheckedCreateWithoutPairingsAsViewerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPairingsAsViewerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPairingsAsViewerInput, UserUncheckedUpdateWithoutPairingsAsViewerInput>
  }

  export type UserUpdateWithoutPairingsAsViewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceUserNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPairingsAsViewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceUserNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorUserNestedInput
  }

  export type DeviceUpsertWithoutPairingsAsViewerInput = {
    update: XOR<DeviceUpdateWithoutPairingsAsViewerInput, DeviceUncheckedUpdateWithoutPairingsAsViewerInput>
    create: XOR<DeviceCreateWithoutPairingsAsViewerInput, DeviceUncheckedCreateWithoutPairingsAsViewerInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutPairingsAsViewerInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutPairingsAsViewerInput, DeviceUncheckedUpdateWithoutPairingsAsViewerInput>
  }

  export type DeviceUpdateWithoutPairingsAsViewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutPairingsAsViewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type UserCreateWithoutPairingCodesInitiatedInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerUserInput
  }

  export type UserUncheckedCreateWithoutPairingCodesInitiatedInput = {
    id?: string
    email: string
    passwordHash: string
    displayName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceUserInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerUserInput
  }

  export type UserCreateOrConnectWithoutPairingCodesInitiatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPairingCodesInitiatedInput, UserUncheckedCreateWithoutPairingCodesInitiatedInput>
  }

  export type DeviceCreateWithoutPairingCodesInitiatedInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDevicesInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingCreateNestedManyWithoutViewerDeviceInput
  }

  export type DeviceUncheckedCreateWithoutPairingCodesInitiatedInput = {
    id?: string
    userId: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutDeviceInput
    pairingsAsSource?: PairingUncheckedCreateNestedManyWithoutSourceDeviceInput
    pairingsAsViewer?: PairingUncheckedCreateNestedManyWithoutViewerDeviceInput
  }

  export type DeviceCreateOrConnectWithoutPairingCodesInitiatedInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutPairingCodesInitiatedInput, DeviceUncheckedCreateWithoutPairingCodesInitiatedInput>
  }

  export type UserUpsertWithoutPairingCodesInitiatedInput = {
    update: XOR<UserUpdateWithoutPairingCodesInitiatedInput, UserUncheckedUpdateWithoutPairingCodesInitiatedInput>
    create: XOR<UserCreateWithoutPairingCodesInitiatedInput, UserUncheckedCreateWithoutPairingCodesInitiatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPairingCodesInitiatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPairingCodesInitiatedInput, UserUncheckedUpdateWithoutPairingCodesInitiatedInput>
  }

  export type UserUpdateWithoutPairingCodesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPairingCodesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceUserNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerUserNestedInput
  }

  export type DeviceUpsertWithoutPairingCodesInitiatedInput = {
    update: XOR<DeviceUpdateWithoutPairingCodesInitiatedInput, DeviceUncheckedUpdateWithoutPairingCodesInitiatedInput>
    create: XOR<DeviceCreateWithoutPairingCodesInitiatedInput, DeviceUncheckedCreateWithoutPairingCodesInitiatedInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutPairingCodesInitiatedInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutPairingCodesInitiatedInput, DeviceUncheckedUpdateWithoutPairingCodesInitiatedInput>
  }

  export type DeviceUpdateWithoutPairingCodesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutPairingCodesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput
  }

  export type DeviceCreateManyUserInput = {
    id?: string
    name: string
    platform: $Enums.DevicePlatform
    pushToken?: string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    deviceId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCreateManySourceUserInput = {
    id?: string
    sourceDeviceId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateManyViewerUserInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCodeCreateManyInitiatorUserInput = {
    code: string
    initiatorDeviceId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DeviceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutDeviceNestedInput
    pairingsAsSource?: PairingUncheckedUpdateManyWithoutSourceDeviceNestedInput
    pairingsAsViewer?: PairingUncheckedUpdateManyWithoutViewerDeviceNestedInput
    pairingCodesInitiated?: PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    platform?: EnumDevicePlatformFieldUpdateOperationsInput | $Enums.DevicePlatform
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingUpdateWithoutSourceUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceDevice?: DeviceUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    viewerUser?: UserUpdateOneRequiredWithoutPairingsAsViewerNestedInput
    viewerDevice?: DeviceUpdateOneRequiredWithoutPairingsAsViewerNestedInput
  }

  export type PairingUncheckedUpdateWithoutSourceUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUncheckedUpdateManyWithoutSourceUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUpdateWithoutViewerUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceUser?: UserUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    sourceDevice?: DeviceUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    viewerDevice?: DeviceUpdateOneRequiredWithoutPairingsAsViewerNestedInput
  }

  export type PairingUncheckedUpdateWithoutViewerUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUncheckedUpdateManyWithoutViewerUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingCodeUpdateWithoutInitiatorUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorDevice?: DeviceUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput
  }

  export type PairingCodeUncheckedUpdateWithoutInitiatorUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorDeviceId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingCodeUncheckedUpdateManyWithoutInitiatorUserInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorDeviceId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyDeviceInput = {
    id?: string
    userId: string
    tokenHash: string
    expiresAt: Date | string
    replacedById?: string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PairingCreateManySourceDeviceInput = {
    id?: string
    sourceUserId: string
    viewerUserId: string
    viewerDeviceId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCreateManyViewerDeviceInput = {
    id?: string
    sourceUserId: string
    sourceDeviceId: string
    viewerUserId: string
    status?: $Enums.PairingStatus
    createdAt?: Date | string
    revokedAt?: Date | string | null
  }

  export type PairingCodeCreateManyInitiatorDeviceInput = {
    code: string
    initiatorUserId: string
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replacedById?: NullableStringFieldUpdateOperationsInput | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingUpdateWithoutSourceDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceUser?: UserUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    viewerUser?: UserUpdateOneRequiredWithoutPairingsAsViewerNestedInput
    viewerDevice?: DeviceUpdateOneRequiredWithoutPairingsAsViewerNestedInput
  }

  export type PairingUncheckedUpdateWithoutSourceDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUncheckedUpdateManyWithoutSourceDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    viewerDeviceId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUpdateWithoutViewerDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sourceUser?: UserUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    sourceDevice?: DeviceUpdateOneRequiredWithoutPairingsAsSourceNestedInput
    viewerUser?: UserUpdateOneRequiredWithoutPairingsAsViewerNestedInput
  }

  export type PairingUncheckedUpdateWithoutViewerDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingUncheckedUpdateManyWithoutViewerDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    sourceUserId?: StringFieldUpdateOperationsInput | string
    sourceDeviceId?: StringFieldUpdateOperationsInput | string
    viewerUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumPairingStatusFieldUpdateOperationsInput | $Enums.PairingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PairingCodeUpdateWithoutInitiatorDeviceInput = {
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorUser?: UserUpdateOneRequiredWithoutPairingCodesInitiatedNestedInput
  }

  export type PairingCodeUncheckedUpdateWithoutInitiatorDeviceInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairingCodeUncheckedUpdateManyWithoutInitiatorDeviceInput = {
    code?: StringFieldUpdateOperationsInput | string
    initiatorUserId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}