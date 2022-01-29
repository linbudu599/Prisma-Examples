// Generated GraphQL Schema TypeScript Types
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type CreateTodoInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
  userId: Scalars['Int'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  nickName?: InputMaybe<Scalars['String']>;
};

/** Todo Item Type */
export enum ItemType {
  Bug = 'BUG',
  Feature = 'FEATURE',
  Idea = 'IDEA',
  Life = 'LIFE'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreateTodo?: Maybe<TodoItem>;
  CreateUser: User;
  DeleteTodoById?: Maybe<TodoItem>;
  DeleteUser: User;
  DeleteUserTodos: BatchPayload;
  MutateTodoStatus?: Maybe<TodoItem>;
  UpdateTodo?: Maybe<TodoItem>;
  UpdateUser: User;
};


export type MutationCreateTodoArgs = {
  createParams: CreateTodoInput;
};


export type MutationCreateUserArgs = {
  createParams: CreateUserInput;
};


export type MutationDeleteTodoByIdArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserTodosArgs = {
  userId: Scalars['Int'];
};


export type MutationMutateTodoStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['Boolean'];
};


export type MutationUpdateTodoArgs = {
  updateParams: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  updateParams: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  QueryAllTodos: Array<TodoItem>;
  QueryAllUsers: Array<User>;
  QueryTodoById?: Maybe<TodoItem>;
  QueryTodoByString: Array<TodoItem>;
  QueryTodoByTypes: Array<TodoItem>;
  QueryUserById?: Maybe<User>;
  QueryUserByString?: Maybe<Array<User>>;
  QueryUserTodos: Array<TodoItem>;
};


export type QueryQueryTodoByIdArgs = {
  id: Scalars['Int'];
};


export type QueryQueryTodoByStringArgs = {
  str: Scalars['String'];
};


export type QueryQueryTodoByTypesArgs = {
  type: ItemType;
};


export type QueryQueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryQueryUserByStringArgs = {
  str: Scalars['String'];
};


export type QueryQueryUserTodosArgs = {
  id: Scalars['Int'];
};

export type TodoItem = {
  __typename?: 'TodoItem';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']>;
  finished: Scalars['Boolean'];
  id: Scalars['ID'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
};

export type UpdateTodoInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  nickName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  nickName?: Maybe<Scalars['String']>;
  todos?: Maybe<Array<TodoItem>>;
};

export type TodoFieldsFragment = { __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined };

export type UserFragmentFieldsFragment = { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined };

export type QueryAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryAllTodosQuery = { __typename?: 'Query', QueryAllTodos: Array<{ __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined }> };

export type QueryTodoByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QueryTodoByIdQuery = { __typename?: 'Query', QueryTodoById?: { __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined } | null | undefined };

export type QueryTodoByTypesQueryVariables = Exact<{
  type: ItemType;
}>;


export type QueryTodoByTypesQuery = { __typename?: 'Query', QueryTodoByTypes: Array<{ __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined }> };

export type QueryTodoByStringQueryVariables = Exact<{
  str: Scalars['String'];
}>;


export type QueryTodoByStringQuery = { __typename?: 'Query', QueryTodoByString: Array<{ __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined }> };

export type QueryUserTodosQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QueryUserTodosQuery = { __typename?: 'Query', QueryUserTodos: Array<{ __typename?: 'TodoItem', id: string, title: string, content?: string | null | undefined, type: string, creatorId?: number | null | undefined, creator?: { __typename?: 'User', id: string, name: string, nickName?: string | null | undefined } | null | undefined }> };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BatchPayload: ResolverTypeWrapper<BatchPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateTodoInput: CreateTodoInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ItemType: ItemType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  TodoItem: ResolverTypeWrapper<TodoItem>;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BatchPayload: BatchPayload;
  Boolean: Scalars['Boolean'];
  CreateTodoInput: CreateTodoInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Timestamp: Scalars['Timestamp'];
  TodoItem: TodoItem;
  UpdateTodoInput: UpdateTodoInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type BatchPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BatchPayload'] = ResolversParentTypes['BatchPayload']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  CreateTodo?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'createParams'>>;
  CreateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createParams'>>;
  DeleteTodoById?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationDeleteTodoByIdArgs, 'id'>>;
  DeleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  DeleteUserTodos?: Resolver<ResolversTypes['BatchPayload'], ParentType, ContextType, RequireFields<MutationDeleteUserTodosArgs, 'userId'>>;
  MutateTodoStatus?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationMutateTodoStatusArgs, 'id' | 'status'>>;
  UpdateTodo?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'updateParams'>>;
  UpdateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateParams'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  QueryAllTodos?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType>;
  QueryAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  QueryTodoById?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByIdArgs, 'id'>>;
  QueryTodoByString?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByStringArgs, 'str'>>;
  QueryTodoByTypes?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByTypesArgs, 'type'>>;
  QueryUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryQueryUserByIdArgs, 'id'>>;
  QueryUserByString?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryQueryUserByStringArgs, 'str'>>;
  QueryUserTodos?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryUserTodosArgs, 'id'>>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TodoItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoItem'] = ResolversParentTypes['TodoItem']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<ResolversTypes['TodoItem']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BatchPayload?: BatchPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TodoItem?: TodoItemResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


export const UserFragmentFieldsFragmentDoc = gql`
    fragment UserFragmentFields on User {
  id
  name
  nickName
}
    `;
export const TodoFieldsFragmentDoc = gql`
    fragment TodoFields on TodoItem {
  id
  title
  content
  type
  creatorId
  creator {
    ...UserFragmentFields
  }
}
    ${UserFragmentFieldsFragmentDoc}`;
export const QueryAllTodosDocument = gql`
    query QueryAllTodos {
  QueryAllTodos {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useQueryAllTodosQuery__
 *
 * To run a query within a React component, call `useQueryAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryAllTodosQuery(baseOptions?: Apollo.QueryHookOptions<QueryAllTodosQuery, QueryAllTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryAllTodosQuery, QueryAllTodosQueryVariables>(QueryAllTodosDocument, options);
      }
export function useQueryAllTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryAllTodosQuery, QueryAllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryAllTodosQuery, QueryAllTodosQueryVariables>(QueryAllTodosDocument, options);
        }
export type QueryAllTodosQueryHookResult = ReturnType<typeof useQueryAllTodosQuery>;
export type QueryAllTodosLazyQueryHookResult = ReturnType<typeof useQueryAllTodosLazyQuery>;
export type QueryAllTodosQueryResult = Apollo.QueryResult<QueryAllTodosQuery, QueryAllTodosQueryVariables>;
export const QueryTodoByIdDocument = gql`
    query QueryTodoById($id: Int!) {
  QueryTodoById(id: $id) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useQueryTodoByIdQuery__
 *
 * To run a query within a React component, call `useQueryTodoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTodoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTodoByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryTodoByIdQuery(baseOptions: Apollo.QueryHookOptions<QueryTodoByIdQuery, QueryTodoByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryTodoByIdQuery, QueryTodoByIdQueryVariables>(QueryTodoByIdDocument, options);
      }
export function useQueryTodoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTodoByIdQuery, QueryTodoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryTodoByIdQuery, QueryTodoByIdQueryVariables>(QueryTodoByIdDocument, options);
        }
export type QueryTodoByIdQueryHookResult = ReturnType<typeof useQueryTodoByIdQuery>;
export type QueryTodoByIdLazyQueryHookResult = ReturnType<typeof useQueryTodoByIdLazyQuery>;
export type QueryTodoByIdQueryResult = Apollo.QueryResult<QueryTodoByIdQuery, QueryTodoByIdQueryVariables>;
export const QueryTodoByTypesDocument = gql`
    query QueryTodoByTypes($type: ItemType!) {
  QueryTodoByTypes(type: $type) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useQueryTodoByTypesQuery__
 *
 * To run a query within a React component, call `useQueryTodoByTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTodoByTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTodoByTypesQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useQueryTodoByTypesQuery(baseOptions: Apollo.QueryHookOptions<QueryTodoByTypesQuery, QueryTodoByTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryTodoByTypesQuery, QueryTodoByTypesQueryVariables>(QueryTodoByTypesDocument, options);
      }
export function useQueryTodoByTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTodoByTypesQuery, QueryTodoByTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryTodoByTypesQuery, QueryTodoByTypesQueryVariables>(QueryTodoByTypesDocument, options);
        }
export type QueryTodoByTypesQueryHookResult = ReturnType<typeof useQueryTodoByTypesQuery>;
export type QueryTodoByTypesLazyQueryHookResult = ReturnType<typeof useQueryTodoByTypesLazyQuery>;
export type QueryTodoByTypesQueryResult = Apollo.QueryResult<QueryTodoByTypesQuery, QueryTodoByTypesQueryVariables>;
export const QueryTodoByStringDocument = gql`
    query QueryTodoByString($str: String!) {
  QueryTodoByString(str: $str) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useQueryTodoByStringQuery__
 *
 * To run a query within a React component, call `useQueryTodoByStringQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryTodoByStringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryTodoByStringQuery({
 *   variables: {
 *      str: // value for 'str'
 *   },
 * });
 */
export function useQueryTodoByStringQuery(baseOptions: Apollo.QueryHookOptions<QueryTodoByStringQuery, QueryTodoByStringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryTodoByStringQuery, QueryTodoByStringQueryVariables>(QueryTodoByStringDocument, options);
      }
export function useQueryTodoByStringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryTodoByStringQuery, QueryTodoByStringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryTodoByStringQuery, QueryTodoByStringQueryVariables>(QueryTodoByStringDocument, options);
        }
export type QueryTodoByStringQueryHookResult = ReturnType<typeof useQueryTodoByStringQuery>;
export type QueryTodoByStringLazyQueryHookResult = ReturnType<typeof useQueryTodoByStringLazyQuery>;
export type QueryTodoByStringQueryResult = Apollo.QueryResult<QueryTodoByStringQuery, QueryTodoByStringQueryVariables>;
export const QueryUserTodosDocument = gql`
    query QueryUserTodos($id: Int!) {
  QueryUserTodos(id: $id) {
    ...TodoFields
  }
}
    ${TodoFieldsFragmentDoc}`;

/**
 * __useQueryUserTodosQuery__
 *
 * To run a query within a React component, call `useQueryUserTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryUserTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryUserTodosQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryUserTodosQuery(baseOptions: Apollo.QueryHookOptions<QueryUserTodosQuery, QueryUserTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryUserTodosQuery, QueryUserTodosQueryVariables>(QueryUserTodosDocument, options);
      }
export function useQueryUserTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryUserTodosQuery, QueryUserTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryUserTodosQuery, QueryUserTodosQueryVariables>(QueryUserTodosDocument, options);
        }
export type QueryUserTodosQueryHookResult = ReturnType<typeof useQueryUserTodosQuery>;
export type QueryUserTodosLazyQueryHookResult = ReturnType<typeof useQueryUserTodosLazyQuery>;
export type QueryUserTodosQueryResult = Apollo.QueryResult<QueryUserTodosQuery, QueryUserTodosQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
// The file generated on: 2022.01.29 11:01:97 am-
