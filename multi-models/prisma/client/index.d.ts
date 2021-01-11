
/**
 * Client
**/

import * as runtime from './runtime';

export import DMMF = runtime.DMMF

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

/**
 * Prisma Client JS version: 2.14.0
 * Query Engine version: 5d491261d382a2a5ffdc71de17072b0e409f1cc1
 */
export type PrismaVersion = {
  client: string
}

export const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export type InputJsonObject = {[Key in string]?: JsonValue}
 
export interface InputJsonArray extends Array<JsonValue> {}
 
export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
 type SelectAndInclude = {
  select: any
  include: any
}
type HasSelect = {
  select: any
}
type HasInclude = {
  include: any
}
type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

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
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any>
? False
: T extends Date
? False
: T extends Buffer
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

export type Union = any

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

type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<Record<Exclude<Keys<_U>, keyof U>, never>> : never;

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
  U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
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
 * Like `Pick`, but with an array
 */
type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>





/**
 * Model CategoriesOnPosts
 */

export type CategoriesOnPosts = {
  postId: number
  categoryId: number
}

/**
 * Model Category
 */

export type Category = {
  id: number
  name: string
}

/**
 * Model Post
 */

export type Post = {
  id: number
  postUUID: string
  createdAt: Date
  updatedAt: Date
  title: string
  content: string | null
  published: boolean
  authorId: number
}

/**
 * Model Profile
 */

export type Profile = {
  id: number
  bio: string | null
  profileViews: number
  userId: number
}

/**
 * Model User
 */

export type User = {
  id: number
  name: string
  age: number
  avaliable: boolean
  createdAt: Date
  updatedAt: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CategoriesOnPosts
 * const categoriesOnPosts = await prisma.categoriesOnPosts.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CategoriesOnPosts
   * const categoriesOnPosts = await prisma.categoriesOnPosts.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']

      /**
   * `prisma.categoriesOnPosts`: Exposes CRUD operations for the **CategoriesOnPosts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoriesOnPosts
    * const categoriesOnPosts = await prisma.categoriesOnPosts.findMany()
    * ```
    */
  get categoriesOnPosts(): Prisma.CategoriesOnPostsDelegate;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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

  /**
   * Prisma Client JS version: 2.14.0
   * Query Engine version: 5d491261d382a2a5ffdc71de17072b0e409f1cc1
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

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
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
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

  export type Union = any

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

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<Record<Exclude<Keys<_U>, keyof U>, never>> : never;

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
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Pick<T, TupleToUnion<K>>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    CategoriesOnPosts: 'CategoriesOnPosts',
    Category: 'Category',
    Post: 'Post',
    Profile: 'Profile',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }


  /**
   * Model CategoriesOnPosts
   */


  export type AggregateCategoriesOnPosts = {
    count: number | null
    avg: CategoriesOnPostsAvgAggregateOutputType | null
    sum: CategoriesOnPostsSumAggregateOutputType | null
    min: CategoriesOnPostsMinAggregateOutputType | null
    max: CategoriesOnPostsMaxAggregateOutputType | null
  }

  export type CategoriesOnPostsAvgAggregateOutputType = {
    postId: number
    categoryId: number
  }

  export type CategoriesOnPostsSumAggregateOutputType = {
    postId: number
    categoryId: number
  }

  export type CategoriesOnPostsMinAggregateOutputType = {
    postId: number
    categoryId: number
  }

  export type CategoriesOnPostsMaxAggregateOutputType = {
    postId: number
    categoryId: number
  }

  export type CategoriesOnPostsCountAggregateOutputType = {
    postId: number
    categoryId: number
    _all: number
  }


  export type CategoriesOnPostsAvgAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type CategoriesOnPostsSumAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type CategoriesOnPostsMinAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type CategoriesOnPostsMaxAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type CategoriesOnPostsCountAggregateInputType = {
    postId?: true
    categoryId?: true
    _all?: true
  }

  export type AggregateCategoriesOnPostsArgs = {
    /**
     * Filter which CategoriesOnPosts to aggregate.
    **/
    where?: CategoriesOnPostsWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of CategoriesOnPosts to fetch.
    **/
    orderBy?: Enumerable<CategoriesOnPostsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CategoriesOnPostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnPosts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnPosts.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoriesOnPosts
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CategoriesOnPostsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CategoriesOnPostsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CategoriesOnPostsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CategoriesOnPostsMaxAggregateInputType
  }

  export type GetCategoriesOnPostsAggregateType<T extends AggregateCategoriesOnPostsArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetCategoriesOnPostsAggregateScalarType<T[P]>
  }

  export type GetCategoriesOnPostsAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof CategoriesOnPostsAvgAggregateOutputType ? CategoriesOnPostsAvgAggregateOutputType[P] : never
  }

    



  export type CategoriesOnPostsSelect = {
    post?: boolean | PostArgs
    postId?: boolean
    category?: boolean | CategoryArgs
    categoryId?: boolean
  }

  export type CategoriesOnPostsInclude = {
    post?: boolean | PostArgs
    category?: boolean | CategoryArgs
  }

  export type CategoriesOnPostsGetPayload<
    S extends boolean | null | undefined | CategoriesOnPostsArgs,
    U = keyof S
      > = S extends true
        ? CategoriesOnPosts
    : S extends undefined
    ? never
    : S extends CategoriesOnPostsArgs | FindManyCategoriesOnPostsArgs
    ?'include' extends U
    ? CategoriesOnPosts  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'post'
        ? PostGetPayload<S['include'][P]> :
        P extends 'category'
        ? CategoryGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof CategoriesOnPosts ?CategoriesOnPosts [P]
  : 
          P extends 'post'
        ? PostGetPayload<S['select'][P]> :
        P extends 'category'
        ? CategoryGetPayload<S['select'][P]> : never
  } 
    : CategoriesOnPosts
  : CategoriesOnPosts


  export interface CategoriesOnPostsDelegate {
    /**
     * Find zero or one CategoriesOnPosts that matches the filter.
     * @param {FindUniqueCategoriesOnPostsArgs} args - Arguments to find a CategoriesOnPosts
     * @example
     * // Get one CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueCategoriesOnPostsArgs>(
      args: Subset<T, FindUniqueCategoriesOnPostsArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts | null>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T> | null>>

    /**
     * Find the first CategoriesOnPosts that matches the filter.
     * @param {FindFirstCategoriesOnPostsArgs} args - Arguments to find a CategoriesOnPosts
     * @example
     * // Get one CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstCategoriesOnPostsArgs>(
      args?: Subset<T, FindFirstCategoriesOnPostsArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts | null>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T> | null>>

    /**
     * Find zero or more CategoriesOnPosts that matches the filter.
     * @param {FindManyCategoriesOnPostsArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.findMany()
     * 
     * // Get first 10 CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const categoriesOnPostsWithPostIdOnly = await prisma.categoriesOnPosts.findMany({ select: { postId: true } })
     * 
    **/
    findMany<T extends FindManyCategoriesOnPostsArgs>(
      args?: Subset<T, FindManyCategoriesOnPostsArgs>
    ): CheckSelect<T, Promise<Array<CategoriesOnPosts>>, Promise<Array<CategoriesOnPostsGetPayload<T>>>>

    /**
     * Create a CategoriesOnPosts.
     * @param {CategoriesOnPostsCreateArgs} args - Arguments to create a CategoriesOnPosts.
     * @example
     * // Create one CategoriesOnPosts
     * const CategoriesOnPosts = await prisma.categoriesOnPosts.create({
     *   data: {
     *     // ... data to create a CategoriesOnPosts
     *   }
     * })
     * 
    **/
    create<T extends CategoriesOnPostsCreateArgs>(
      args: Subset<T, CategoriesOnPostsCreateArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T>>>

    /**
     * Delete a CategoriesOnPosts.
     * @param {CategoriesOnPostsDeleteArgs} args - Arguments to delete one CategoriesOnPosts.
     * @example
     * // Delete one CategoriesOnPosts
     * const CategoriesOnPosts = await prisma.categoriesOnPosts.delete({
     *   where: {
     *     // ... filter to delete one CategoriesOnPosts
     *   }
     * })
     * 
    **/
    delete<T extends CategoriesOnPostsDeleteArgs>(
      args: Subset<T, CategoriesOnPostsDeleteArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T>>>

    /**
     * Update one CategoriesOnPosts.
     * @param {CategoriesOnPostsUpdateArgs} args - Arguments to update one CategoriesOnPosts.
     * @example
     * // Update one CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoriesOnPostsUpdateArgs>(
      args: Subset<T, CategoriesOnPostsUpdateArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T>>>

    /**
     * Delete zero or more CategoriesOnPosts.
     * @param {CategoriesOnPostsDeleteManyArgs} args - Arguments to filter CategoriesOnPosts to delete.
     * @example
     * // Delete a few CategoriesOnPosts
     * const { count } = await prisma.categoriesOnPosts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoriesOnPostsDeleteManyArgs>(
      args?: Subset<T, CategoriesOnPostsDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more CategoriesOnPosts.
     * @param {CategoriesOnPostsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoriesOnPostsUpdateManyArgs>(
      args: Subset<T, CategoriesOnPostsUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one CategoriesOnPosts.
     * @param {CategoriesOnPostsUpsertArgs} args - Arguments to update or create a CategoriesOnPosts.
     * @example
     * // Update or create a CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.upsert({
     *   create: {
     *     // ... data to create a CategoriesOnPosts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoriesOnPosts we want to update
     *   }
     * })
    **/
    upsert<T extends CategoriesOnPostsUpsertArgs>(
      args: Subset<T, CategoriesOnPostsUpsertArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T>>>

    /**
     * Find zero or one CategoriesOnPosts that matches the filter.
     * @param {FindUniqueCategoriesOnPostsArgs} args - Arguments to find a CategoriesOnPosts
     * @deprecated This will be deprecated please use prisma.categoriesOnPosts.findUnique
     * @example
     * // Get one CategoriesOnPosts
     * const categoriesOnPosts = await prisma.categoriesOnPosts.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueCategoriesOnPostsArgs>(
      args: Subset<T, FindUniqueCategoriesOnPostsArgs>
    ): CheckSelect<T, Prisma__CategoriesOnPostsClient<CategoriesOnPosts | null>, Prisma__CategoriesOnPostsClient<CategoriesOnPostsGetPayload<T> | null>>

    /**
     * Count the number of CategoriesOnPosts.
     * @param {FindManyCategoriesOnPostsArgs} args - Arguments to filter CategoriesOnPosts to count.
     * @example
     * // Count the number of CategoriesOnPosts
     * const count = await prisma.categoriesOnPosts.count({
     *   where: {
     *     // ... the filter for the CategoriesOnPosts we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManyCategoriesOnPostsArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a CategoriesOnPosts.
     * @param {AggregateCategoriesOnPostsArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
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
    aggregate<T extends AggregateCategoriesOnPostsArgs>(args: Subset<T, AggregateCategoriesOnPostsArgs>): Promise<GetCategoriesOnPostsAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoriesOnPosts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoriesOnPostsClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    post<T extends PostArgs = {}>(args?: Subset<T, PostArgs>): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>;

    category<T extends CategoryArgs = {}>(args?: Subset<T, CategoryArgs>): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CategoriesOnPosts findUnique
   */
  export type FindUniqueCategoriesOnPostsArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * Filter, which CategoriesOnPosts to fetch.
    **/
    where: CategoriesOnPostsWhereUniqueInput
  }


  /**
   * CategoriesOnPosts findFirst
   */
  export type FindFirstCategoriesOnPostsArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * Filter, which CategoriesOnPosts to fetch.
    **/
    where?: CategoriesOnPostsWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of CategoriesOnPosts to fetch.
    **/
    orderBy?: Enumerable<CategoriesOnPostsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoriesOnPosts.
    **/
    cursor?: CategoriesOnPostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnPosts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnPosts.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of CategoriesOnPosts.
    **/
    distinct?: Enumerable<CategoriesOnPostsScalarFieldEnum>
  }


  /**
   * CategoriesOnPosts findMany
   */
  export type FindManyCategoriesOnPostsArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * Filter, which CategoriesOnPosts to fetch.
    **/
    where?: CategoriesOnPostsWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of CategoriesOnPosts to fetch.
    **/
    orderBy?: Enumerable<CategoriesOnPostsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoriesOnPosts.
    **/
    cursor?: CategoriesOnPostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnPosts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnPosts.
    **/
    skip?: number
    distinct?: Enumerable<CategoriesOnPostsScalarFieldEnum>
  }


  /**
   * CategoriesOnPosts create
   */
  export type CategoriesOnPostsCreateArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * The data needed to create a CategoriesOnPosts.
    **/
    data: CategoriesOnPostsCreateInput
  }


  /**
   * CategoriesOnPosts update
   */
  export type CategoriesOnPostsUpdateArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * The data needed to update a CategoriesOnPosts.
    **/
    data: CategoriesOnPostsUpdateInput
    /**
     * Choose, which CategoriesOnPosts to update.
    **/
    where: CategoriesOnPostsWhereUniqueInput
  }


  /**
   * CategoriesOnPosts updateMany
   */
  export type CategoriesOnPostsUpdateManyArgs = {
    data: CategoriesOnPostsUpdateManyMutationInput
    where?: CategoriesOnPostsWhereInput
  }


  /**
   * CategoriesOnPosts upsert
   */
  export type CategoriesOnPostsUpsertArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * The filter to search for the CategoriesOnPosts to update in case it exists.
    **/
    where: CategoriesOnPostsWhereUniqueInput
    /**
     * In case the CategoriesOnPosts found by the `where` argument doesn't exist, create a new CategoriesOnPosts with this data.
    **/
    create: CategoriesOnPostsCreateInput
    /**
     * In case the CategoriesOnPosts was found with the provided `where` argument, update it with this data.
    **/
    update: CategoriesOnPostsUpdateInput
  }


  /**
   * CategoriesOnPosts delete
   */
  export type CategoriesOnPostsDeleteArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
    /**
     * Filter which CategoriesOnPosts to delete.
    **/
    where: CategoriesOnPostsWhereUniqueInput
  }


  /**
   * CategoriesOnPosts deleteMany
   */
  export type CategoriesOnPostsDeleteManyArgs = {
    where?: CategoriesOnPostsWhereInput
  }


  /**
   * CategoriesOnPosts without action
   */
  export type CategoriesOnPostsArgs = {
    /**
     * Select specific fields to fetch from the CategoriesOnPosts
    **/
    select?: CategoriesOnPostsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoriesOnPostsInclude | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    count: number | null
    avg: CategoryAvgAggregateOutputType | null
    sum: CategorySumAggregateOutputType | null
    min: CategoryMinAggregateOutputType | null
    max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number
  }

  export type CategorySumAggregateOutputType = {
    id: number
  }

  export type CategoryMinAggregateOutputType = {
    id: number
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number | null
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type AggregateCategoryArgs = {
    /**
     * Filter which Category to aggregate.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends AggregateCategoryArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetCategoryAggregateScalarType<T[P]>
  }

  export type GetCategoryAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof CategoryAvgAggregateOutputType ? CategoryAvgAggregateOutputType[P] : never
  }

    



  export type CategorySelect = {
    id?: boolean
    name?: boolean
    posts?: boolean | FindManyCategoriesOnPostsArgs
  }

  export type CategoryInclude = {
    posts?: boolean | FindManyCategoriesOnPostsArgs
  }

  export type CategoryGetPayload<
    S extends boolean | null | undefined | CategoryArgs,
    U = keyof S
      > = S extends true
        ? Category
    : S extends undefined
    ? never
    : S extends CategoryArgs | FindManyCategoryArgs
    ?'include' extends U
    ? Category  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'posts'
        ? Array < CategoriesOnPostsGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Category ?Category [P]
  : 
          P extends 'posts'
        ? Array < CategoriesOnPostsGetPayload<S['select'][P]>>  : never
  } 
    : Category
  : Category


  export interface CategoryDelegate {
    /**
     * Find zero or one Category that matches the filter.
     * @param {FindUniqueCategoryArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueCategoryArgs>(
      args: Subset<T, FindUniqueCategoryArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>

    /**
     * Find the first Category that matches the filter.
     * @param {FindFirstCategoryArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstCategoryArgs>(
      args?: Subset<T, FindFirstCategoryArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>

    /**
     * Find zero or more Categories that matches the filter.
     * @param {FindManyCategoryArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManyCategoryArgs>(
      args?: Subset<T, FindManyCategoryArgs>
    ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs>(
      args: Subset<T, CategoryCreateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs>(
      args: Subset<T, CategoryDeleteArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs>(
      args: Subset<T, CategoryUpdateArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: Subset<T, CategoryDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Categories.
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs>(
      args: Subset<T, CategoryUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs>(
      args: Subset<T, CategoryUpsertArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category>, Prisma__CategoryClient<CategoryGetPayload<T>>>

    /**
     * Find zero or one Category that matches the filter.
     * @param {FindUniqueCategoryArgs} args - Arguments to find a Category
     * @deprecated This will be deprecated please use prisma.category.findUnique
     * @example
     * // Get one Category
     * const category = await prisma.category.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueCategoryArgs>(
      args: Subset<T, FindUniqueCategoryArgs>
    ): CheckSelect<T, Prisma__CategoryClient<Category | null>, Prisma__CategoryClient<CategoryGetPayload<T> | null>>

    /**
     * Count the number of Categories.
     * @param {FindManyCategoryArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManyCategoryArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a Category.
     * @param {AggregateCategoryArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
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
    aggregate<T extends AggregateCategoryArgs>(args: Subset<T, AggregateCategoryArgs>): Promise<GetCategoryAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends FindManyCategoriesOnPostsArgs = {}>(args?: Subset<T, FindManyCategoriesOnPostsArgs>): CheckSelect<T, Promise<Array<CategoriesOnPosts>>, Promise<Array<CategoriesOnPostsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Category findUnique
   */
  export type FindUniqueCategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category findFirst
   */
  export type FindFirstCategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Categories.
    **/
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type FindManyCategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Categories to fetch.
    **/
    where?: CategoryWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Categories to fetch.
    **/
    orderBy?: Enumerable<CategoryOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
    **/
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to create a Category.
    **/
    data: CategoryCreateInput
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to update a Category.
    **/
    data: CategoryUpdateInput
    /**
     * Choose, which Category to update.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs = {
    data: CategoryUpdateManyMutationInput
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * The filter to search for the Category to update in case it exists.
    **/
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
    **/
    create: CategoryCreateInput
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
    **/
    update: CategoryUpdateInput
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
    /**
     * Filter which Category to delete.
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs = {
    where?: CategoryWhereInput
  }


  /**
   * Category without action
   */
  export type CategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: CategoryInclude | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    count: number | null
    avg: PostAvgAggregateOutputType | null
    sum: PostSumAggregateOutputType | null
    min: PostMinAggregateOutputType | null
    max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number
    authorId: number
  }

  export type PostSumAggregateOutputType = {
    id: number
    authorId: number
  }

  export type PostMinAggregateOutputType = {
    id: number
    postUUID: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number
  }

  export type PostMaxAggregateOutputType = {
    id: number
    postUUID: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number
  }

  export type PostCountAggregateOutputType = {
    id: number
    postUUID: number | null
    createdAt: number | null
    updatedAt: number | null
    title: number | null
    content: number | null
    published: number | null
    authorId: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    postUUID?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    postUUID?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    postUUID?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    _all?: true
  }

  export type AggregatePostArgs = {
    /**
     * Filter which Post to aggregate.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends AggregatePostArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>
  }

  export type GetPostAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof PostAvgAggregateOutputType ? PostAvgAggregateOutputType[P] : never
  }

    



  export type PostSelect = {
    id?: boolean
    postUUID?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    categories?: boolean | FindManyCategoriesOnPostsArgs
  }

  export type PostInclude = {
    author?: boolean | UserArgs
    categories?: boolean | FindManyCategoriesOnPostsArgs
  }

  export type PostGetPayload<
    S extends boolean | null | undefined | PostArgs,
    U = keyof S
      > = S extends true
        ? Post
    : S extends undefined
    ? never
    : S extends PostArgs | FindManyPostArgs
    ?'include' extends U
    ? Post  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'author'
        ? UserGetPayload<S['include'][P]> :
        P extends 'categories'
        ? Array < CategoriesOnPostsGetPayload<S['include'][P]>>  : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Post ?Post [P]
  : 
          P extends 'author'
        ? UserGetPayload<S['select'][P]> :
        P extends 'categories'
        ? Array < CategoriesOnPostsGetPayload<S['select'][P]>>  : never
  } 
    : Post
  : Post


  export interface PostDelegate {
    /**
     * Find zero or one Post that matches the filter.
     * @param {FindUniquePostArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniquePostArgs>(
      args: Subset<T, FindUniquePostArgs>
    ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>

    /**
     * Find the first Post that matches the filter.
     * @param {FindFirstPostArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstPostArgs>(
      args?: Subset<T, FindFirstPostArgs>
    ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>

    /**
     * Find zero or more Posts that matches the filter.
     * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManyPostArgs>(
      args?: Subset<T, FindManyPostArgs>
    ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: Subset<T, PostCreateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: Subset<T, PostDeleteArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: Subset<T, PostUpdateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: Subset<T, PostDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Posts.
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: Subset<T, PostUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: Subset<T, PostUpsertArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Find zero or one Post that matches the filter.
     * @param {FindUniquePostArgs} args - Arguments to find a Post
     * @deprecated This will be deprecated please use prisma.post.findUnique
     * @example
     * // Get one Post
     * const post = await prisma.post.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniquePostArgs>(
      args: Subset<T, FindUniquePostArgs>
    ): CheckSelect<T, Prisma__PostClient<Post | null>, Prisma__PostClient<PostGetPayload<T> | null>>

    /**
     * Count the number of Posts.
     * @param {FindManyPostArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a Post.
     * @param {AggregatePostArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
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
    aggregate<T extends AggregatePostArgs>(args: Subset<T, AggregatePostArgs>): Promise<GetPostAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    categories<T extends FindManyCategoriesOnPostsArgs = {}>(args?: Subset<T, FindManyCategoriesOnPostsArgs>): CheckSelect<T, Promise<Array<CategoriesOnPosts>>, Promise<Array<CategoriesOnPostsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Post findUnique
   */
  export type FindUniquePostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post findFirst
   */
  export type FindFirstPostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Posts.
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post findMany
   */
  export type FindManyPostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
    **/
    where?: PostWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Posts to fetch.
    **/
    orderBy?: Enumerable<PostOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
    **/
    data: PostCreateInput
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
    **/
    data: PostUpdateInput
    /**
     * Choose, which Post to update.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    data: PostUpdateManyMutationInput
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
    **/
    create: PostCreateInput
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
    **/
    update: PostUpdateInput
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    where?: PostWhereInput
  }


  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: PostInclude | null
  }



  /**
   * Model Profile
   */


  export type AggregateProfile = {
    count: number | null
    avg: ProfileAvgAggregateOutputType | null
    sum: ProfileSumAggregateOutputType | null
    min: ProfileMinAggregateOutputType | null
    max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number
    profileViews: number
    userId: number
  }

  export type ProfileSumAggregateOutputType = {
    id: number
    profileViews: number
    userId: number
  }

  export type ProfileMinAggregateOutputType = {
    id: number
    bio: string | null
    profileViews: number
    userId: number
  }

  export type ProfileMaxAggregateOutputType = {
    id: number
    bio: string | null
    profileViews: number
    userId: number
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    bio: number | null
    profileViews: number
    userId: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
    profileViews?: true
    userId?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
    profileViews?: true
    userId?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    bio?: true
    profileViews?: true
    userId?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    bio?: true
    profileViews?: true
    userId?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    bio?: true
    profileViews?: true
    userId?: true
    _all?: true
  }

  export type AggregateProfileArgs = {
    /**
     * Filter which Profile to aggregate.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends AggregateProfileArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetProfileAggregateScalarType<T[P]>
  }

  export type GetProfileAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof ProfileAvgAggregateOutputType ? ProfileAvgAggregateOutputType[P] : never
  }

    



  export type ProfileSelect = {
    id?: boolean
    bio?: boolean
    profileViews?: boolean
    user?: boolean | UserArgs
    userId?: boolean
  }

  export type ProfileInclude = {
    user?: boolean | UserArgs
  }

  export type ProfileGetPayload<
    S extends boolean | null | undefined | ProfileArgs,
    U = keyof S
      > = S extends true
        ? Profile
    : S extends undefined
    ? never
    : S extends ProfileArgs | FindManyProfileArgs
    ?'include' extends U
    ? Profile  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'user'
        ? UserGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Profile ?Profile [P]
  : 
          P extends 'user'
        ? UserGetPayload<S['select'][P]> : never
  } 
    : Profile
  : Profile


  export interface ProfileDelegate {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {FindUniqueProfileArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueProfileArgs>(
      args: Subset<T, FindUniqueProfileArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>

    /**
     * Find the first Profile that matches the filter.
     * @param {FindFirstProfileArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstProfileArgs>(
      args?: Subset<T, FindFirstProfileArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>

    /**
     * Find zero or more Profiles that matches the filter.
     * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FindManyProfileArgs>(
      args?: Subset<T, FindManyProfileArgs>
    ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: Subset<T, ProfileCreateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: Subset<T, ProfileDeleteArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: Subset<T, ProfileUpdateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: Subset<T, ProfileDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: Subset<T, ProfileUpdateManyArgs>
    ): Promise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: Subset<T, ProfileUpsertArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Find zero or one Profile that matches the filter.
     * @param {FindUniqueProfileArgs} args - Arguments to find a Profile
     * @deprecated This will be deprecated please use prisma.profile.findUnique
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueProfileArgs>(
      args: Subset<T, FindUniqueProfileArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>

    /**
     * Count the number of Profiles.
     * @param {FindManyProfileArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a Profile.
     * @param {AggregateProfileArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
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
    aggregate<T extends AggregateProfileArgs>(args: Subset<T, AggregateProfileArgs>): Promise<GetProfileAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Profile findUnique
   */
  export type FindUniqueProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile findFirst
   */
  export type FindFirstProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Profiles.
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile findMany
   */
  export type FindManyProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profiles to fetch.
    **/
    where?: ProfileWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Profiles to fetch.
    **/
    orderBy?: Enumerable<ProfileOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to create a Profile.
    **/
    data: ProfileCreateInput
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to update a Profile.
    **/
    data: ProfileUpdateInput
    /**
     * Choose, which Profile to update.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    data: ProfileUpdateManyMutationInput
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * The filter to search for the Profile to update in case it exists.
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
    **/
    create: ProfileCreateInput
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
    **/
    update: ProfileUpdateInput
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
    /**
     * Filter which Profile to delete.
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    where?: ProfileWhereInput
  }


  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: ProfileInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    count: number | null
    avg: UserAvgAggregateOutputType | null
    sum: UserSumAggregateOutputType | null
    min: UserMinAggregateOutputType | null
    max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number
    age: number
  }

  export type UserSumAggregateOutputType = {
    id: number
    age: number
  }

  export type UserMinAggregateOutputType = {
    id: number
    name: string | null
    age: number
    avaliable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number
    name: string | null
    age: number
    avaliable: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number | null
    age: number
    avaliable: number | null
    createdAt: number | null
    updatedAt: number | null
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    age?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    age?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    age?: true
    avaliable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    age?: true
    avaliable?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    age?: true
    avaliable?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AggregateUserArgs = {
    /**
     * Filter which User to aggregate.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    count?: true
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends AggregateUserArgs> = {
    [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
  }

  export type GetUserAggregateScalarType<T extends any> = {
    [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
  }

    



  export type UserSelect = {
    id?: boolean
    name?: boolean
    age?: boolean
    posts?: boolean | FindManyPostArgs
    profile?: boolean | ProfileArgs
    avaliable?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude = {
    posts?: boolean | FindManyPostArgs
    profile?: boolean | ProfileArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | FindManyUserArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'posts'
        ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'profile'
        ? ProfileGetPayload<S['include'][P]> | null : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof User ?User [P]
  : 
          P extends 'posts'
        ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'profile'
        ? ProfileGetPayload<S['select'][P]> | null : never
  } 
    : User
  : User


  export interface UserDelegate {
    /**
     * Find zero or one User that matches the filter.
     * @param {FindUniqueUserArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FindUniqueUserArgs>(
      args: Subset<T, FindUniqueUserArgs>
    ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>

    /**
     * Find the first User that matches the filter.
     * @param {FindFirstUserArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FindFirstUserArgs>(
      args?: Subset<T, FindFirstUserArgs>
    ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>

    /**
     * Find zero or more Users that matches the filter.
     * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends FindManyUserArgs>(
      args?: Subset<T, FindManyUserArgs>
    ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>

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
    **/
    create<T extends UserCreateArgs>(
      args: Subset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    **/
    delete<T extends UserDeleteArgs>(
      args: Subset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    **/
    update<T extends UserUpdateArgs>(
      args: Subset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: Subset<T, UserDeleteManyArgs>
    ): Promise<BatchPayload>

    /**
     * Update zero or more Users.
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
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: Subset<T, UserUpdateManyArgs>
    ): Promise<BatchPayload>

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
    **/
    upsert<T extends UserUpsertArgs>(
      args: Subset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find zero or one User that matches the filter.
     * @param {FindUniqueUserArgs} args - Arguments to find a User
     * @deprecated This will be deprecated please use prisma.user.findUnique
     * @example
     * // Get one User
     * const user = await prisma.user.findOne({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findOne<T extends FindUniqueUserArgs>(
      args: Subset<T, FindUniqueUserArgs>
    ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>

    /**
     * Count the number of Users.
     * @param {FindManyUserArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

    /**
     * Allows you to perform aggregations operations on a User.
     * @param {AggregateUserArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
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
    aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>


  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

    profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null>, Prisma__ProfileClient<ProfileGetPayload<T> | null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type FindUniqueUserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type FindFirstUserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs
     * 
     * Filter by unique combinations of Users.
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type FindManyUserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
    **/
    where?: UserWhereInput
    /**
     * @link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs
     * 
     * Determine the order of Users to fetch.
    **/
    orderBy?: Enumerable<UserOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
    **/
    data: UserCreateInput
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
    **/
    data: UserUpdateInput
    /**
     * Choose, which User to update.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
    **/
    create: UserCreateInput
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
    **/
    update: UserUpdateInput
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
    **/
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CategoriesOnPostsScalarFieldEnum: {
    postId: 'postId',
    categoryId: 'categoryId'
  };

  export type CategoriesOnPostsScalarFieldEnum = (typeof CategoriesOnPostsScalarFieldEnum)[keyof typeof CategoriesOnPostsScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    postUUID: 'postUUID',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    content: 'content',
    published: 'published',
    authorId: 'authorId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    bio: 'bio',
    profileViews: 'profileViews',
    userId: 'userId'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    age: 'age',
    avaliable: 'avaliable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type CategoriesOnPostsWhereInput = {
    AND?: Enumerable<CategoriesOnPostsWhereInput>
    OR?: Enumerable<CategoriesOnPostsWhereInput>
    NOT?: Enumerable<CategoriesOnPostsWhereInput>
    post?: XOR<PostWhereInput, PostRelationFilter>
    postId?: IntFilter | number
    category?: XOR<CategoryWhereInput, CategoryRelationFilter>
    categoryId?: IntFilter | number
  }

  export type CategoriesOnPostsOrderByInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type CategoriesOnPostsWhereUniqueInput = {
    postId_categoryId?: CategoriesOnPostsPostIdCategoryIdCompoundUniqueInput
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    posts?: CategoriesOnPostsListRelationFilter
  }

  export type CategoryOrderByInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryWhereUniqueInput = {
    id?: number
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: IntFilter | number
    postUUID?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    author?: XOR<UserWhereInput, UserRelationFilter>
    authorId?: IntFilter | number
    categories?: CategoriesOnPostsListRelationFilter
  }

  export type PostOrderByInput = {
    id?: SortOrder
    postUUID?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostWhereUniqueInput = {
    id?: number
  }

  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: IntFilter | number
    bio?: StringNullableFilter | string | null
    profileViews?: IntFilter | number
    user?: XOR<UserWhereInput, UserRelationFilter>
    userId?: IntFilter | number
  }

  export type ProfileOrderByInput = {
    id?: SortOrder
    bio?: SortOrder
    profileViews?: SortOrder
    userId?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: number
    userId?: number
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    age?: IntFilter | number
    posts?: PostListRelationFilter
    profile?: XOR<ProfileWhereInput, ProfileRelationFilter> | null
    avaliable?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserOrderByInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    avaliable?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: number
    name?: string
  }

  export type CategoriesOnPostsCreateInput = {
    post: PostCreateOneWithoutCategoriesInput
    category: CategoryCreateOneWithoutPostsInput
  }

  export type CategoriesOnPostsUpdateInput = {
    post?: PostUpdateOneRequiredWithoutCategoriesInput
    category?: CategoryUpdateOneRequiredWithoutPostsInput
  }

  export type CategoriesOnPostsUpdateManyMutationInput = {

  }

  export type CategoryCreateInput = {
    name: string
    posts?: CategoriesOnPostsCreateManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    posts?: CategoriesOnPostsUpdateManyWithoutCategoryInput
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateInput = {
    postUUID?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateOneWithoutPostsInput
    categories?: CategoriesOnPostsCreateManyWithoutPostInput
  }

  export type PostUpdateInput = {
    postUUID?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutPostsInput
    categories?: CategoriesOnPostsUpdateManyWithoutPostInput
  }

  export type PostUpdateManyMutationInput = {
    postUUID?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProfileCreateInput = {
    bio?: string | null
    profileViews?: number
    user: UserCreateOneWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileViews?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutProfileInput
  }

  export type ProfileUpdateManyMutationInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileViews?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    name: string
    age?: number
    avaliable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateManyWithoutAuthorInput
    profile?: ProfileCreateOneWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    avaliable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorInput
    profile?: ProfileUpdateOneWithoutUserInput
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    avaliable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoriesOnPostsPostIdCategoryIdCompoundUniqueInput = {
    postId: number
    categoryId: number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type CategoriesOnPostsListRelationFilter = {
    every?: CategoriesOnPostsWhereInput
    some?: CategoriesOnPostsWhereInput
    none?: CategoriesOnPostsWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type ProfileRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type PostCreateOneWithoutCategoriesInput = {
    create?: PostCreateWithoutCategoriesInput
    connect?: PostWhereUniqueInput
    connectOrCreate?: PostCreateOrConnectWithoutcategoriesInput
  }

  export type CategoryCreateOneWithoutPostsInput = {
    create?: CategoryCreateWithoutPostsInput
    connect?: CategoryWhereUniqueInput
    connectOrCreate?: CategoryCreateOrConnectWithoutpostsInput
  }

  export type PostUpdateOneRequiredWithoutCategoriesInput = {
    create?: PostCreateWithoutCategoriesInput
    connect?: PostWhereUniqueInput
    update?: PostUpdateWithoutCategoriesInput
    upsert?: PostUpsertWithoutCategoriesInput
    connectOrCreate?: PostCreateOrConnectWithoutcategoriesInput
  }

  export type CategoryUpdateOneRequiredWithoutPostsInput = {
    create?: CategoryCreateWithoutPostsInput
    connect?: CategoryWhereUniqueInput
    update?: CategoryUpdateWithoutPostsInput
    upsert?: CategoryUpsertWithoutPostsInput
    connectOrCreate?: CategoryCreateOrConnectWithoutpostsInput
  }

  export type CategoriesOnPostsCreateManyWithoutCategoryInput = {
    create?: Enumerable<CategoriesOnPostsCreateWithoutCategoryInput>
    connect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    connectOrCreate?: Enumerable<CategoriesOnPostsCreateOrConnectWithoutcategoryInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CategoriesOnPostsUpdateManyWithoutCategoryInput = {
    create?: Enumerable<CategoriesOnPostsCreateWithoutCategoryInput>
    connect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    set?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    disconnect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    delete?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    update?: Enumerable<CategoriesOnPostsUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<CategoriesOnPostsUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<CategoriesOnPostsScalarWhereInput>
    upsert?: Enumerable<CategoriesOnPostsUpsertWithWhereUniqueWithoutCategoryInput>
    connectOrCreate?: Enumerable<CategoriesOnPostsCreateOrConnectWithoutcategoryInput>
  }

  export type UserCreateOneWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutpostsInput
  }

  export type CategoriesOnPostsCreateManyWithoutPostInput = {
    create?: Enumerable<CategoriesOnPostsCreateWithoutPostInput>
    connect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    connectOrCreate?: Enumerable<CategoriesOnPostsCreateOrConnectWithoutpostInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPostsInput = {
    create?: UserCreateWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: UserUpdateWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connectOrCreate?: UserCreateOrConnectWithoutpostsInput
  }

  export type CategoriesOnPostsUpdateManyWithoutPostInput = {
    create?: Enumerable<CategoriesOnPostsCreateWithoutPostInput>
    connect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    set?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    disconnect?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    delete?: Enumerable<CategoriesOnPostsWhereUniqueInput>
    update?: Enumerable<CategoriesOnPostsUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<CategoriesOnPostsUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<CategoriesOnPostsScalarWhereInput>
    upsert?: Enumerable<CategoriesOnPostsUpsertWithWhereUniqueWithoutPostInput>
    connectOrCreate?: Enumerable<CategoriesOnPostsCreateOrConnectWithoutpostInput>
  }

  export type UserCreateOneWithoutProfileInput = {
    create?: UserCreateWithoutProfileInput
    connect?: UserWhereUniqueInput
    connectOrCreate?: UserCreateOrConnectWithoutprofileInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProfileInput = {
    create?: UserCreateWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: UserUpdateWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connectOrCreate?: UserCreateOrConnectWithoutprofileInput
  }

  export type PostCreateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput>
    connect?: Enumerable<PostWhereUniqueInput>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
  }

  export type ProfileCreateOneWithoutUserInput = {
    create?: ProfileCreateWithoutUserInput
    connect?: ProfileWhereUniqueInput
    connectOrCreate?: ProfileCreateOrConnectWithoutuserInput
  }

  export type PostUpdateManyWithoutAuthorInput = {
    create?: Enumerable<PostCreateWithoutAuthorInput>
    connect?: Enumerable<PostWhereUniqueInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutauthorInput>
  }

  export type ProfileUpdateOneWithoutUserInput = {
    create?: ProfileCreateWithoutUserInput
    connect?: ProfileWhereUniqueInput
    disconnect?: boolean
    delete?: boolean
    update?: ProfileUpdateWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    connectOrCreate?: ProfileCreateOrConnectWithoutuserInput
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type PostCreateWithoutCategoriesInput = {
    postUUID?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateOneWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutcategoriesInput = {
    where: PostWhereUniqueInput
    create: PostCreateWithoutCategoriesInput
  }

  export type CategoryCreateWithoutPostsInput = {
    name: string
  }

  export type CategoryCreateOrConnectWithoutpostsInput = {
    where: CategoryWhereUniqueInput
    create: CategoryCreateWithoutPostsInput
  }

  export type PostUpdateWithoutCategoriesInput = {
    postUUID?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutPostsInput
  }

  export type PostUpsertWithoutCategoriesInput = {
    update: PostUpdateWithoutCategoriesInput
    create: PostCreateWithoutCategoriesInput
  }

  export type CategoryUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUpsertWithoutPostsInput = {
    update: CategoryUpdateWithoutPostsInput
    create: CategoryCreateWithoutPostsInput
  }

  export type CategoriesOnPostsCreateWithoutCategoryInput = {
    post: PostCreateOneWithoutCategoriesInput
  }

  export type CategoriesOnPostsCreateOrConnectWithoutcategoryInput = {
    where: CategoriesOnPostsWhereUniqueInput
    create: CategoriesOnPostsCreateWithoutCategoryInput
  }

  export type CategoriesOnPostsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnPostsWhereUniqueInput
    data: CategoriesOnPostsUpdateWithoutCategoryInput
  }

  export type CategoriesOnPostsUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoriesOnPostsScalarWhereInput
    data: CategoriesOnPostsUpdateManyMutationInput
  }

  export type CategoriesOnPostsScalarWhereInput = {
    AND?: Enumerable<CategoriesOnPostsScalarWhereInput>
    OR?: Enumerable<CategoriesOnPostsScalarWhereInput>
    NOT?: Enumerable<CategoriesOnPostsScalarWhereInput>
    postId?: IntFilter | number
    categoryId?: IntFilter | number
  }

  export type CategoriesOnPostsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnPostsWhereUniqueInput
    update: CategoriesOnPostsUpdateWithoutCategoryInput
    create: CategoriesOnPostsCreateWithoutCategoryInput
  }

  export type UserCreateWithoutPostsInput = {
    name: string
    age?: number
    avaliable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutpostsInput = {
    where: UserWhereUniqueInput
    create: UserCreateWithoutPostsInput
  }

  export type CategoriesOnPostsCreateWithoutPostInput = {
    category: CategoryCreateOneWithoutPostsInput
  }

  export type CategoriesOnPostsCreateOrConnectWithoutpostInput = {
    where: CategoriesOnPostsWhereUniqueInput
    create: CategoriesOnPostsCreateWithoutPostInput
  }

  export type UserUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    avaliable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserInput
  }

  export type UserUpsertWithoutPostsInput = {
    update: UserUpdateWithoutPostsInput
    create: UserCreateWithoutPostsInput
  }

  export type CategoriesOnPostsUpdateWithWhereUniqueWithoutPostInput = {
    where: CategoriesOnPostsWhereUniqueInput
    data: CategoriesOnPostsUpdateWithoutPostInput
  }

  export type CategoriesOnPostsUpdateManyWithWhereWithoutPostInput = {
    where: CategoriesOnPostsScalarWhereInput
    data: CategoriesOnPostsUpdateManyMutationInput
  }

  export type CategoriesOnPostsUpsertWithWhereUniqueWithoutPostInput = {
    where: CategoriesOnPostsWhereUniqueInput
    update: CategoriesOnPostsUpdateWithoutPostInput
    create: CategoriesOnPostsCreateWithoutPostInput
  }

  export type UserCreateWithoutProfileInput = {
    name: string
    age?: number
    avaliable?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutprofileInput = {
    where: UserWhereUniqueInput
    create: UserCreateWithoutProfileInput
  }

  export type UserUpdateWithoutProfileInput = {
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    avaliable?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorInput
  }

  export type UserUpsertWithoutProfileInput = {
    update: UserUpdateWithoutProfileInput
    create: UserCreateWithoutProfileInput
  }

  export type PostCreateWithoutAuthorInput = {
    postUUID?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
    categories?: CategoriesOnPostsCreateManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutauthorInput = {
    where: PostWhereUniqueInput
    create: PostCreateWithoutAuthorInput
  }

  export type ProfileCreateWithoutUserInput = {
    bio?: string | null
    profileViews?: number
  }

  export type ProfileCreateOrConnectWithoutuserInput = {
    where: ProfileWhereUniqueInput
    create: ProfileCreateWithoutUserInput
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: PostUpdateWithoutAuthorInput
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: PostUpdateManyMutationInput
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: IntFilter | number
    postUUID?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    authorId?: IntFilter | number
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: PostUpdateWithoutAuthorInput
    create: PostCreateWithoutAuthorInput
  }

  export type ProfileUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileViews?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileUpsertWithoutUserInput = {
    update: ProfileUpdateWithoutUserInput
    create: ProfileCreateWithoutUserInput
  }

  export type CategoriesOnPostsUpdateWithoutCategoryInput = {
    post?: PostUpdateOneRequiredWithoutCategoriesInput
  }

  export type CategoriesOnPostsUpdateWithoutPostInput = {
    category?: CategoryUpdateOneRequiredWithoutPostsInput
  }

  export type PostUpdateWithoutAuthorInput = {
    postUUID?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    categories?: CategoriesOnPostsUpdateManyWithoutPostInput
  }



  /**
   * Batch Payload for updateMany & deleteMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}

/*
* Exports for compatibility introduced in 2.12.0
* Please import from the Prisma namespace instead
*/

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsScalarFieldEnum`
 */
export type CategoriesOnPostsScalarFieldEnum = Prisma.CategoriesOnPostsScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.CategoryScalarFieldEnum`
 */
export type CategoryScalarFieldEnum = Prisma.CategoryScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.PostScalarFieldEnum`
 */
export type PostScalarFieldEnum = Prisma.PostScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.ProfileScalarFieldEnum`
 */
export type ProfileScalarFieldEnum = Prisma.ProfileScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.UserScalarFieldEnum`
 */
export type UserScalarFieldEnum = Prisma.UserScalarFieldEnum

/**
 * @deprecated Renamed to `Prisma.SortOrder`
 */
export type SortOrder = Prisma.SortOrder

/**
 * @deprecated Renamed to `Prisma.ModelName`
 */
export type ModelName = Prisma.ModelName

/**
 * @deprecated Renamed to `Prisma.AggregateCategoriesOnPosts`
 */
export type AggregateCategoriesOnPosts = Prisma.AggregateCategoriesOnPosts

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsAvgAggregateOutputType`
 */
export type CategoriesOnPostsAvgAggregateOutputType = Prisma.CategoriesOnPostsAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsSumAggregateOutputType`
 */
export type CategoriesOnPostsSumAggregateOutputType = Prisma.CategoriesOnPostsSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsMinAggregateOutputType`
 */
export type CategoriesOnPostsMinAggregateOutputType = Prisma.CategoriesOnPostsMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsMaxAggregateOutputType`
 */
export type CategoriesOnPostsMaxAggregateOutputType = Prisma.CategoriesOnPostsMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCountAggregateOutputType`
 */
export type CategoriesOnPostsCountAggregateOutputType = Prisma.CategoriesOnPostsCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateCategoriesOnPostsArgs`
 */
export type AggregateCategoriesOnPostsArgs = Prisma.AggregateCategoriesOnPostsArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsAvgAggregateInputType`
 */
export type CategoriesOnPostsAvgAggregateInputType = Prisma.CategoriesOnPostsAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsSumAggregateInputType`
 */
export type CategoriesOnPostsSumAggregateInputType = Prisma.CategoriesOnPostsSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsMinAggregateInputType`
 */
export type CategoriesOnPostsMinAggregateInputType = Prisma.CategoriesOnPostsMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsMaxAggregateInputType`
 */
export type CategoriesOnPostsMaxAggregateInputType = Prisma.CategoriesOnPostsMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCountAggregateInputType`
 */
export type CategoriesOnPostsCountAggregateInputType = Prisma.CategoriesOnPostsCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsSelect`
 */
export type CategoriesOnPostsSelect = Prisma.CategoriesOnPostsSelect

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsInclude`
 */
export type CategoriesOnPostsInclude = Prisma.CategoriesOnPostsInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueCategoriesOnPostsArgs`
 */
export type FindUniqueCategoriesOnPostsArgs = Prisma.FindUniqueCategoriesOnPostsArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstCategoriesOnPostsArgs`
 */
export type FindFirstCategoriesOnPostsArgs = Prisma.FindFirstCategoriesOnPostsArgs

/**
 * @deprecated Renamed to `Prisma.FindManyCategoriesOnPostsArgs`
 */
export type FindManyCategoriesOnPostsArgs = Prisma.FindManyCategoriesOnPostsArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateArgs`
 */
export type CategoriesOnPostsCreateArgs = Prisma.CategoriesOnPostsCreateArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateArgs`
 */
export type CategoriesOnPostsUpdateArgs = Prisma.CategoriesOnPostsUpdateArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyArgs`
 */
export type CategoriesOnPostsUpdateManyArgs = Prisma.CategoriesOnPostsUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpsertArgs`
 */
export type CategoriesOnPostsUpsertArgs = Prisma.CategoriesOnPostsUpsertArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsDeleteArgs`
 */
export type CategoriesOnPostsDeleteArgs = Prisma.CategoriesOnPostsDeleteArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsDeleteManyArgs`
 */
export type CategoriesOnPostsDeleteManyArgs = Prisma.CategoriesOnPostsDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregateCategory`
 */
export type AggregateCategory = Prisma.AggregateCategory

/**
 * @deprecated Renamed to `Prisma.CategoryAvgAggregateOutputType`
 */
export type CategoryAvgAggregateOutputType = Prisma.CategoryAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategorySumAggregateOutputType`
 */
export type CategorySumAggregateOutputType = Prisma.CategorySumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoryMinAggregateOutputType`
 */
export type CategoryMinAggregateOutputType = Prisma.CategoryMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoryMaxAggregateOutputType`
 */
export type CategoryMaxAggregateOutputType = Prisma.CategoryMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.CategoryCountAggregateOutputType`
 */
export type CategoryCountAggregateOutputType = Prisma.CategoryCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateCategoryArgs`
 */
export type AggregateCategoryArgs = Prisma.AggregateCategoryArgs

/**
 * @deprecated Renamed to `Prisma.CategoryAvgAggregateInputType`
 */
export type CategoryAvgAggregateInputType = Prisma.CategoryAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategorySumAggregateInputType`
 */
export type CategorySumAggregateInputType = Prisma.CategorySumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoryMinAggregateInputType`
 */
export type CategoryMinAggregateInputType = Prisma.CategoryMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoryMaxAggregateInputType`
 */
export type CategoryMaxAggregateInputType = Prisma.CategoryMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategoryCountAggregateInputType`
 */
export type CategoryCountAggregateInputType = Prisma.CategoryCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.CategorySelect`
 */
export type CategorySelect = Prisma.CategorySelect

/**
 * @deprecated Renamed to `Prisma.CategoryInclude`
 */
export type CategoryInclude = Prisma.CategoryInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueCategoryArgs`
 */
export type FindUniqueCategoryArgs = Prisma.FindUniqueCategoryArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstCategoryArgs`
 */
export type FindFirstCategoryArgs = Prisma.FindFirstCategoryArgs

/**
 * @deprecated Renamed to `Prisma.FindManyCategoryArgs`
 */
export type FindManyCategoryArgs = Prisma.FindManyCategoryArgs

/**
 * @deprecated Renamed to `Prisma.CategoryCreateArgs`
 */
export type CategoryCreateArgs = Prisma.CategoryCreateArgs

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateArgs`
 */
export type CategoryUpdateArgs = Prisma.CategoryUpdateArgs

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateManyArgs`
 */
export type CategoryUpdateManyArgs = Prisma.CategoryUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.CategoryUpsertArgs`
 */
export type CategoryUpsertArgs = Prisma.CategoryUpsertArgs

/**
 * @deprecated Renamed to `Prisma.CategoryDeleteArgs`
 */
export type CategoryDeleteArgs = Prisma.CategoryDeleteArgs

/**
 * @deprecated Renamed to `Prisma.CategoryDeleteManyArgs`
 */
export type CategoryDeleteManyArgs = Prisma.CategoryDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregatePost`
 */
export type AggregatePost = Prisma.AggregatePost

/**
 * @deprecated Renamed to `Prisma.PostAvgAggregateOutputType`
 */
export type PostAvgAggregateOutputType = Prisma.PostAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PostSumAggregateOutputType`
 */
export type PostSumAggregateOutputType = Prisma.PostSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PostMinAggregateOutputType`
 */
export type PostMinAggregateOutputType = Prisma.PostMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PostMaxAggregateOutputType`
 */
export type PostMaxAggregateOutputType = Prisma.PostMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.PostCountAggregateOutputType`
 */
export type PostCountAggregateOutputType = Prisma.PostCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregatePostArgs`
 */
export type AggregatePostArgs = Prisma.AggregatePostArgs

/**
 * @deprecated Renamed to `Prisma.PostAvgAggregateInputType`
 */
export type PostAvgAggregateInputType = Prisma.PostAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PostSumAggregateInputType`
 */
export type PostSumAggregateInputType = Prisma.PostSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PostMinAggregateInputType`
 */
export type PostMinAggregateInputType = Prisma.PostMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PostMaxAggregateInputType`
 */
export type PostMaxAggregateInputType = Prisma.PostMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PostCountAggregateInputType`
 */
export type PostCountAggregateInputType = Prisma.PostCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.PostSelect`
 */
export type PostSelect = Prisma.PostSelect

/**
 * @deprecated Renamed to `Prisma.PostInclude`
 */
export type PostInclude = Prisma.PostInclude

/**
 * @deprecated Renamed to `Prisma.FindUniquePostArgs`
 */
export type FindUniquePostArgs = Prisma.FindUniquePostArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstPostArgs`
 */
export type FindFirstPostArgs = Prisma.FindFirstPostArgs

/**
 * @deprecated Renamed to `Prisma.FindManyPostArgs`
 */
export type FindManyPostArgs = Prisma.FindManyPostArgs

/**
 * @deprecated Renamed to `Prisma.PostCreateArgs`
 */
export type PostCreateArgs = Prisma.PostCreateArgs

/**
 * @deprecated Renamed to `Prisma.PostUpdateArgs`
 */
export type PostUpdateArgs = Prisma.PostUpdateArgs

/**
 * @deprecated Renamed to `Prisma.PostUpdateManyArgs`
 */
export type PostUpdateManyArgs = Prisma.PostUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.PostUpsertArgs`
 */
export type PostUpsertArgs = Prisma.PostUpsertArgs

/**
 * @deprecated Renamed to `Prisma.PostDeleteArgs`
 */
export type PostDeleteArgs = Prisma.PostDeleteArgs

/**
 * @deprecated Renamed to `Prisma.PostDeleteManyArgs`
 */
export type PostDeleteManyArgs = Prisma.PostDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregateProfile`
 */
export type AggregateProfile = Prisma.AggregateProfile

/**
 * @deprecated Renamed to `Prisma.ProfileAvgAggregateOutputType`
 */
export type ProfileAvgAggregateOutputType = Prisma.ProfileAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.ProfileSumAggregateOutputType`
 */
export type ProfileSumAggregateOutputType = Prisma.ProfileSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.ProfileMinAggregateOutputType`
 */
export type ProfileMinAggregateOutputType = Prisma.ProfileMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.ProfileMaxAggregateOutputType`
 */
export type ProfileMaxAggregateOutputType = Prisma.ProfileMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.ProfileCountAggregateOutputType`
 */
export type ProfileCountAggregateOutputType = Prisma.ProfileCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateProfileArgs`
 */
export type AggregateProfileArgs = Prisma.AggregateProfileArgs

/**
 * @deprecated Renamed to `Prisma.ProfileAvgAggregateInputType`
 */
export type ProfileAvgAggregateInputType = Prisma.ProfileAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.ProfileSumAggregateInputType`
 */
export type ProfileSumAggregateInputType = Prisma.ProfileSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.ProfileMinAggregateInputType`
 */
export type ProfileMinAggregateInputType = Prisma.ProfileMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.ProfileMaxAggregateInputType`
 */
export type ProfileMaxAggregateInputType = Prisma.ProfileMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.ProfileCountAggregateInputType`
 */
export type ProfileCountAggregateInputType = Prisma.ProfileCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.ProfileSelect`
 */
export type ProfileSelect = Prisma.ProfileSelect

/**
 * @deprecated Renamed to `Prisma.ProfileInclude`
 */
export type ProfileInclude = Prisma.ProfileInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueProfileArgs`
 */
export type FindUniqueProfileArgs = Prisma.FindUniqueProfileArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstProfileArgs`
 */
export type FindFirstProfileArgs = Prisma.FindFirstProfileArgs

/**
 * @deprecated Renamed to `Prisma.FindManyProfileArgs`
 */
export type FindManyProfileArgs = Prisma.FindManyProfileArgs

/**
 * @deprecated Renamed to `Prisma.ProfileCreateArgs`
 */
export type ProfileCreateArgs = Prisma.ProfileCreateArgs

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateArgs`
 */
export type ProfileUpdateArgs = Prisma.ProfileUpdateArgs

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateManyArgs`
 */
export type ProfileUpdateManyArgs = Prisma.ProfileUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.ProfileUpsertArgs`
 */
export type ProfileUpsertArgs = Prisma.ProfileUpsertArgs

/**
 * @deprecated Renamed to `Prisma.ProfileDeleteArgs`
 */
export type ProfileDeleteArgs = Prisma.ProfileDeleteArgs

/**
 * @deprecated Renamed to `Prisma.ProfileDeleteManyArgs`
 */
export type ProfileDeleteManyArgs = Prisma.ProfileDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.AggregateUser`
 */
export type AggregateUser = Prisma.AggregateUser

/**
 * @deprecated Renamed to `Prisma.UserAvgAggregateOutputType`
 */
export type UserAvgAggregateOutputType = Prisma.UserAvgAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.UserSumAggregateOutputType`
 */
export type UserSumAggregateOutputType = Prisma.UserSumAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.UserMinAggregateOutputType`
 */
export type UserMinAggregateOutputType = Prisma.UserMinAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.UserMaxAggregateOutputType`
 */
export type UserMaxAggregateOutputType = Prisma.UserMaxAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.UserCountAggregateOutputType`
 */
export type UserCountAggregateOutputType = Prisma.UserCountAggregateOutputType

/**
 * @deprecated Renamed to `Prisma.AggregateUserArgs`
 */
export type AggregateUserArgs = Prisma.AggregateUserArgs

/**
 * @deprecated Renamed to `Prisma.UserAvgAggregateInputType`
 */
export type UserAvgAggregateInputType = Prisma.UserAvgAggregateInputType

/**
 * @deprecated Renamed to `Prisma.UserSumAggregateInputType`
 */
export type UserSumAggregateInputType = Prisma.UserSumAggregateInputType

/**
 * @deprecated Renamed to `Prisma.UserMinAggregateInputType`
 */
export type UserMinAggregateInputType = Prisma.UserMinAggregateInputType

/**
 * @deprecated Renamed to `Prisma.UserMaxAggregateInputType`
 */
export type UserMaxAggregateInputType = Prisma.UserMaxAggregateInputType

/**
 * @deprecated Renamed to `Prisma.UserCountAggregateInputType`
 */
export type UserCountAggregateInputType = Prisma.UserCountAggregateInputType

/**
 * @deprecated Renamed to `Prisma.UserSelect`
 */
export type UserSelect = Prisma.UserSelect

/**
 * @deprecated Renamed to `Prisma.UserInclude`
 */
export type UserInclude = Prisma.UserInclude

/**
 * @deprecated Renamed to `Prisma.FindUniqueUserArgs`
 */
export type FindUniqueUserArgs = Prisma.FindUniqueUserArgs

/**
 * @deprecated Renamed to `Prisma.FindFirstUserArgs`
 */
export type FindFirstUserArgs = Prisma.FindFirstUserArgs

/**
 * @deprecated Renamed to `Prisma.FindManyUserArgs`
 */
export type FindManyUserArgs = Prisma.FindManyUserArgs

/**
 * @deprecated Renamed to `Prisma.UserCreateArgs`
 */
export type UserCreateArgs = Prisma.UserCreateArgs

/**
 * @deprecated Renamed to `Prisma.UserUpdateArgs`
 */
export type UserUpdateArgs = Prisma.UserUpdateArgs

/**
 * @deprecated Renamed to `Prisma.UserUpdateManyArgs`
 */
export type UserUpdateManyArgs = Prisma.UserUpdateManyArgs

/**
 * @deprecated Renamed to `Prisma.UserUpsertArgs`
 */
export type UserUpsertArgs = Prisma.UserUpsertArgs

/**
 * @deprecated Renamed to `Prisma.UserDeleteArgs`
 */
export type UserDeleteArgs = Prisma.UserDeleteArgs

/**
 * @deprecated Renamed to `Prisma.UserDeleteManyArgs`
 */
export type UserDeleteManyArgs = Prisma.UserDeleteManyArgs

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsWhereInput`
 */
export type CategoriesOnPostsWhereInput = Prisma.CategoriesOnPostsWhereInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsOrderByInput`
 */
export type CategoriesOnPostsOrderByInput = Prisma.CategoriesOnPostsOrderByInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsWhereUniqueInput`
 */
export type CategoriesOnPostsWhereUniqueInput = Prisma.CategoriesOnPostsWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.CategoryWhereInput`
 */
export type CategoryWhereInput = Prisma.CategoryWhereInput

/**
 * @deprecated Renamed to `Prisma.CategoryOrderByInput`
 */
export type CategoryOrderByInput = Prisma.CategoryOrderByInput

/**
 * @deprecated Renamed to `Prisma.CategoryWhereUniqueInput`
 */
export type CategoryWhereUniqueInput = Prisma.CategoryWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.PostWhereInput`
 */
export type PostWhereInput = Prisma.PostWhereInput

/**
 * @deprecated Renamed to `Prisma.PostOrderByInput`
 */
export type PostOrderByInput = Prisma.PostOrderByInput

/**
 * @deprecated Renamed to `Prisma.PostWhereUniqueInput`
 */
export type PostWhereUniqueInput = Prisma.PostWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.ProfileWhereInput`
 */
export type ProfileWhereInput = Prisma.ProfileWhereInput

/**
 * @deprecated Renamed to `Prisma.ProfileOrderByInput`
 */
export type ProfileOrderByInput = Prisma.ProfileOrderByInput

/**
 * @deprecated Renamed to `Prisma.ProfileWhereUniqueInput`
 */
export type ProfileWhereUniqueInput = Prisma.ProfileWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.UserWhereInput`
 */
export type UserWhereInput = Prisma.UserWhereInput

/**
 * @deprecated Renamed to `Prisma.UserOrderByInput`
 */
export type UserOrderByInput = Prisma.UserOrderByInput

/**
 * @deprecated Renamed to `Prisma.UserWhereUniqueInput`
 */
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateInput`
 */
export type CategoriesOnPostsCreateInput = Prisma.CategoriesOnPostsCreateInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateInput`
 */
export type CategoriesOnPostsUpdateInput = Prisma.CategoriesOnPostsUpdateInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyMutationInput`
 */
export type CategoriesOnPostsUpdateManyMutationInput = Prisma.CategoriesOnPostsUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.CategoryCreateInput`
 */
export type CategoryCreateInput = Prisma.CategoryCreateInput

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateInput`
 */
export type CategoryUpdateInput = Prisma.CategoryUpdateInput

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateManyMutationInput`
 */
export type CategoryUpdateManyMutationInput = Prisma.CategoryUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.PostCreateInput`
 */
export type PostCreateInput = Prisma.PostCreateInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateInput`
 */
export type PostUpdateInput = Prisma.PostUpdateInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateManyMutationInput`
 */
export type PostUpdateManyMutationInput = Prisma.PostUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.ProfileCreateInput`
 */
export type ProfileCreateInput = Prisma.ProfileCreateInput

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateInput`
 */
export type ProfileUpdateInput = Prisma.ProfileUpdateInput

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateManyMutationInput`
 */
export type ProfileUpdateManyMutationInput = Prisma.ProfileUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.UserCreateInput`
 */
export type UserCreateInput = Prisma.UserCreateInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateInput`
 */
export type UserUpdateInput = Prisma.UserUpdateInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateManyMutationInput`
 */
export type UserUpdateManyMutationInput = Prisma.UserUpdateManyMutationInput

/**
 * @deprecated Renamed to `Prisma.PostRelationFilter`
 */
export type PostRelationFilter = Prisma.PostRelationFilter

/**
 * @deprecated Renamed to `Prisma.IntFilter`
 */
export type IntFilter = Prisma.IntFilter

/**
 * @deprecated Renamed to `Prisma.CategoryRelationFilter`
 */
export type CategoryRelationFilter = Prisma.CategoryRelationFilter

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsPostIdCategoryIdCompoundUniqueInput`
 */
export type CategoriesOnPostsPostIdCategoryIdCompoundUniqueInput = Prisma.CategoriesOnPostsPostIdCategoryIdCompoundUniqueInput

/**
 * @deprecated Renamed to `Prisma.StringFilter`
 */
export type StringFilter = Prisma.StringFilter

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsListRelationFilter`
 */
export type CategoriesOnPostsListRelationFilter = Prisma.CategoriesOnPostsListRelationFilter

/**
 * @deprecated Renamed to `Prisma.DateTimeFilter`
 */
export type DateTimeFilter = Prisma.DateTimeFilter

/**
 * @deprecated Renamed to `Prisma.StringNullableFilter`
 */
export type StringNullableFilter = Prisma.StringNullableFilter

/**
 * @deprecated Renamed to `Prisma.BoolFilter`
 */
export type BoolFilter = Prisma.BoolFilter

/**
 * @deprecated Renamed to `Prisma.UserRelationFilter`
 */
export type UserRelationFilter = Prisma.UserRelationFilter

/**
 * @deprecated Renamed to `Prisma.PostListRelationFilter`
 */
export type PostListRelationFilter = Prisma.PostListRelationFilter

/**
 * @deprecated Renamed to `Prisma.ProfileRelationFilter`
 */
export type ProfileRelationFilter = Prisma.ProfileRelationFilter

/**
 * @deprecated Renamed to `Prisma.PostCreateOneWithoutCategoriesInput`
 */
export type PostCreateOneWithoutCategoriesInput = Prisma.PostCreateOneWithoutCategoriesInput

/**
 * @deprecated Renamed to `Prisma.CategoryCreateOneWithoutPostsInput`
 */
export type CategoryCreateOneWithoutPostsInput = Prisma.CategoryCreateOneWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateOneRequiredWithoutCategoriesInput`
 */
export type PostUpdateOneRequiredWithoutCategoriesInput = Prisma.PostUpdateOneRequiredWithoutCategoriesInput

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateOneRequiredWithoutPostsInput`
 */
export type CategoryUpdateOneRequiredWithoutPostsInput = Prisma.CategoryUpdateOneRequiredWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateManyWithoutCategoryInput`
 */
export type CategoriesOnPostsCreateManyWithoutCategoryInput = Prisma.CategoriesOnPostsCreateManyWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.StringFieldUpdateOperationsInput`
 */
export type StringFieldUpdateOperationsInput = Prisma.StringFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyWithoutCategoryInput`
 */
export type CategoriesOnPostsUpdateManyWithoutCategoryInput = Prisma.CategoriesOnPostsUpdateManyWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.UserCreateOneWithoutPostsInput`
 */
export type UserCreateOneWithoutPostsInput = Prisma.UserCreateOneWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateManyWithoutPostInput`
 */
export type CategoriesOnPostsCreateManyWithoutPostInput = Prisma.CategoriesOnPostsCreateManyWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.DateTimeFieldUpdateOperationsInput`
 */
export type DateTimeFieldUpdateOperationsInput = Prisma.DateTimeFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.NullableStringFieldUpdateOperationsInput`
 */
export type NullableStringFieldUpdateOperationsInput = Prisma.NullableStringFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.BoolFieldUpdateOperationsInput`
 */
export type BoolFieldUpdateOperationsInput = Prisma.BoolFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateOneRequiredWithoutPostsInput`
 */
export type UserUpdateOneRequiredWithoutPostsInput = Prisma.UserUpdateOneRequiredWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyWithoutPostInput`
 */
export type CategoriesOnPostsUpdateManyWithoutPostInput = Prisma.CategoriesOnPostsUpdateManyWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.UserCreateOneWithoutProfileInput`
 */
export type UserCreateOneWithoutProfileInput = Prisma.UserCreateOneWithoutProfileInput

/**
 * @deprecated Renamed to `Prisma.IntFieldUpdateOperationsInput`
 */
export type IntFieldUpdateOperationsInput = Prisma.IntFieldUpdateOperationsInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateOneRequiredWithoutProfileInput`
 */
export type UserUpdateOneRequiredWithoutProfileInput = Prisma.UserUpdateOneRequiredWithoutProfileInput

/**
 * @deprecated Renamed to `Prisma.PostCreateManyWithoutAuthorInput`
 */
export type PostCreateManyWithoutAuthorInput = Prisma.PostCreateManyWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.ProfileCreateOneWithoutUserInput`
 */
export type ProfileCreateOneWithoutUserInput = Prisma.ProfileCreateOneWithoutUserInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateManyWithoutAuthorInput`
 */
export type PostUpdateManyWithoutAuthorInput = Prisma.PostUpdateManyWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateOneWithoutUserInput`
 */
export type ProfileUpdateOneWithoutUserInput = Prisma.ProfileUpdateOneWithoutUserInput

/**
 * @deprecated Renamed to `Prisma.NestedIntFilter`
 */
export type NestedIntFilter = Prisma.NestedIntFilter

/**
 * @deprecated Renamed to `Prisma.NestedStringFilter`
 */
export type NestedStringFilter = Prisma.NestedStringFilter

/**
 * @deprecated Renamed to `Prisma.NestedDateTimeFilter`
 */
export type NestedDateTimeFilter = Prisma.NestedDateTimeFilter

/**
 * @deprecated Renamed to `Prisma.NestedStringNullableFilter`
 */
export type NestedStringNullableFilter = Prisma.NestedStringNullableFilter

/**
 * @deprecated Renamed to `Prisma.NestedBoolFilter`
 */
export type NestedBoolFilter = Prisma.NestedBoolFilter

/**
 * @deprecated Renamed to `Prisma.PostCreateWithoutCategoriesInput`
 */
export type PostCreateWithoutCategoriesInput = Prisma.PostCreateWithoutCategoriesInput

/**
 * @deprecated Renamed to `Prisma.PostCreateOrConnectWithoutcategoriesInput`
 */
export type PostCreateOrConnectWithoutcategoriesInput = Prisma.PostCreateOrConnectWithoutcategoriesInput

/**
 * @deprecated Renamed to `Prisma.CategoryCreateWithoutPostsInput`
 */
export type CategoryCreateWithoutPostsInput = Prisma.CategoryCreateWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoryCreateOrConnectWithoutpostsInput`
 */
export type CategoryCreateOrConnectWithoutpostsInput = Prisma.CategoryCreateOrConnectWithoutpostsInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateWithoutCategoriesInput`
 */
export type PostUpdateWithoutCategoriesInput = Prisma.PostUpdateWithoutCategoriesInput

/**
 * @deprecated Renamed to `Prisma.PostUpsertWithoutCategoriesInput`
 */
export type PostUpsertWithoutCategoriesInput = Prisma.PostUpsertWithoutCategoriesInput

/**
 * @deprecated Renamed to `Prisma.CategoryUpdateWithoutPostsInput`
 */
export type CategoryUpdateWithoutPostsInput = Prisma.CategoryUpdateWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoryUpsertWithoutPostsInput`
 */
export type CategoryUpsertWithoutPostsInput = Prisma.CategoryUpsertWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateWithoutCategoryInput`
 */
export type CategoriesOnPostsCreateWithoutCategoryInput = Prisma.CategoriesOnPostsCreateWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateOrConnectWithoutcategoryInput`
 */
export type CategoriesOnPostsCreateOrConnectWithoutcategoryInput = Prisma.CategoriesOnPostsCreateOrConnectWithoutcategoryInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateWithWhereUniqueWithoutCategoryInput`
 */
export type CategoriesOnPostsUpdateWithWhereUniqueWithoutCategoryInput = Prisma.CategoriesOnPostsUpdateWithWhereUniqueWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyWithWhereWithoutCategoryInput`
 */
export type CategoriesOnPostsUpdateManyWithWhereWithoutCategoryInput = Prisma.CategoriesOnPostsUpdateManyWithWhereWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsScalarWhereInput`
 */
export type CategoriesOnPostsScalarWhereInput = Prisma.CategoriesOnPostsScalarWhereInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpsertWithWhereUniqueWithoutCategoryInput`
 */
export type CategoriesOnPostsUpsertWithWhereUniqueWithoutCategoryInput = Prisma.CategoriesOnPostsUpsertWithWhereUniqueWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.UserCreateWithoutPostsInput`
 */
export type UserCreateWithoutPostsInput = Prisma.UserCreateWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.UserCreateOrConnectWithoutpostsInput`
 */
export type UserCreateOrConnectWithoutpostsInput = Prisma.UserCreateOrConnectWithoutpostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateWithoutPostInput`
 */
export type CategoriesOnPostsCreateWithoutPostInput = Prisma.CategoriesOnPostsCreateWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsCreateOrConnectWithoutpostInput`
 */
export type CategoriesOnPostsCreateOrConnectWithoutpostInput = Prisma.CategoriesOnPostsCreateOrConnectWithoutpostInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateWithoutPostsInput`
 */
export type UserUpdateWithoutPostsInput = Prisma.UserUpdateWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.UserUpsertWithoutPostsInput`
 */
export type UserUpsertWithoutPostsInput = Prisma.UserUpsertWithoutPostsInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateWithWhereUniqueWithoutPostInput`
 */
export type CategoriesOnPostsUpdateWithWhereUniqueWithoutPostInput = Prisma.CategoriesOnPostsUpdateWithWhereUniqueWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateManyWithWhereWithoutPostInput`
 */
export type CategoriesOnPostsUpdateManyWithWhereWithoutPostInput = Prisma.CategoriesOnPostsUpdateManyWithWhereWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpsertWithWhereUniqueWithoutPostInput`
 */
export type CategoriesOnPostsUpsertWithWhereUniqueWithoutPostInput = Prisma.CategoriesOnPostsUpsertWithWhereUniqueWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.UserCreateWithoutProfileInput`
 */
export type UserCreateWithoutProfileInput = Prisma.UserCreateWithoutProfileInput

/**
 * @deprecated Renamed to `Prisma.UserCreateOrConnectWithoutprofileInput`
 */
export type UserCreateOrConnectWithoutprofileInput = Prisma.UserCreateOrConnectWithoutprofileInput

/**
 * @deprecated Renamed to `Prisma.UserUpdateWithoutProfileInput`
 */
export type UserUpdateWithoutProfileInput = Prisma.UserUpdateWithoutProfileInput

/**
 * @deprecated Renamed to `Prisma.UserUpsertWithoutProfileInput`
 */
export type UserUpsertWithoutProfileInput = Prisma.UserUpsertWithoutProfileInput

/**
 * @deprecated Renamed to `Prisma.PostCreateWithoutAuthorInput`
 */
export type PostCreateWithoutAuthorInput = Prisma.PostCreateWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.PostCreateOrConnectWithoutauthorInput`
 */
export type PostCreateOrConnectWithoutauthorInput = Prisma.PostCreateOrConnectWithoutauthorInput

/**
 * @deprecated Renamed to `Prisma.ProfileCreateWithoutUserInput`
 */
export type ProfileCreateWithoutUserInput = Prisma.ProfileCreateWithoutUserInput

/**
 * @deprecated Renamed to `Prisma.ProfileCreateOrConnectWithoutuserInput`
 */
export type ProfileCreateOrConnectWithoutuserInput = Prisma.ProfileCreateOrConnectWithoutuserInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput`
 */
export type PostUpdateWithWhereUniqueWithoutAuthorInput = Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateManyWithWhereWithoutAuthorInput`
 */
export type PostUpdateManyWithWhereWithoutAuthorInput = Prisma.PostUpdateManyWithWhereWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.PostScalarWhereInput`
 */
export type PostScalarWhereInput = Prisma.PostScalarWhereInput

/**
 * @deprecated Renamed to `Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput`
 */
export type PostUpsertWithWhereUniqueWithoutAuthorInput = Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput

/**
 * @deprecated Renamed to `Prisma.ProfileUpdateWithoutUserInput`
 */
export type ProfileUpdateWithoutUserInput = Prisma.ProfileUpdateWithoutUserInput

/**
 * @deprecated Renamed to `Prisma.ProfileUpsertWithoutUserInput`
 */
export type ProfileUpsertWithoutUserInput = Prisma.ProfileUpsertWithoutUserInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateWithoutCategoryInput`
 */
export type CategoriesOnPostsUpdateWithoutCategoryInput = Prisma.CategoriesOnPostsUpdateWithoutCategoryInput

/**
 * @deprecated Renamed to `Prisma.CategoriesOnPostsUpdateWithoutPostInput`
 */
export type CategoriesOnPostsUpdateWithoutPostInput = Prisma.CategoriesOnPostsUpdateWithoutPostInput

/**
 * @deprecated Renamed to `Prisma.PostUpdateWithoutAuthorInput`
 */
export type PostUpdateWithoutAuthorInput = Prisma.PostUpdateWithoutAuthorInput