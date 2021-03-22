// Generated GraphQL Schema TypeScript Types
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
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

export type Query = {
  __typename?: 'Query';
  QueryAllTodos: Array<TodoItem>;
  QueryTodoById?: Maybe<TodoItem>;
  QueryTodoByString: Array<TodoItem>;
  QueryTodoByTypes: Array<TodoItem>;
  QueryUserTodos: Array<TodoItem>;
  QueryAllUsers: Array<User>;
  QueryUserById?: Maybe<User>;
  QueryUserByString?: Maybe<Array<User>>;
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


export type QueryQueryUserTodosArgs = {
  id: Scalars['Int'];
};


export type QueryQueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryQueryUserByStringArgs = {
  str: Scalars['String'];
};

export type TodoItem = {
  __typename?: 'TodoItem';
  id: Scalars['ID'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  finished: Scalars['Boolean'];
  type: Scalars['String'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  nickName?: Maybe<Scalars['String']>;
  todos?: Maybe<Array<TodoItem>>;
};


/** Todo Item Type */
export enum ItemType {
  Life = 'LIFE',
  Feature = 'FEATURE',
  Bug = 'BUG',
  Idea = 'IDEA'
}

export type Mutation = {
  __typename?: 'Mutation';
  MutateTodoStatus?: Maybe<TodoItem>;
  CreateTodo?: Maybe<TodoItem>;
  UpdateTodo?: Maybe<TodoItem>;
  DeleteTodoById?: Maybe<TodoItem>;
  DeleteUserTodos: BatchPayload;
  CreateUser: User;
  UpdateUser: User;
  DeleteUser: User;
};


export type MutationMutateTodoStatusArgs = {
  status: Scalars['Boolean'];
  id: Scalars['Int'];
};


export type MutationCreateTodoArgs = {
  createParams: CreateTodoInput;
};


export type MutationUpdateTodoArgs = {
  updateParams: UpdateTodoInput;
};


export type MutationDeleteTodoByIdArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserTodosArgs = {
  userId: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  createParams: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  updateParams: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type CreateTodoInput = {
  title: Scalars['String'];
  userId: Scalars['Int'];
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateTodoInput = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  nickName?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  nickName?: Maybe<Scalars['String']>;
};

export type TodoFieldsFragment = (
  { __typename?: 'TodoItem' }
  & Pick<TodoItem, 'id' | 'title' | 'content' | 'type' | 'creatorId'>
  & { creator?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFieldsFragment
  )> }
);

export type UserFragmentFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'nickName'>
);

export type QueryAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryAllTodosQuery = (
  { __typename?: 'Query' }
  & { QueryAllTodos: Array<(
    { __typename?: 'TodoItem' }
    & TodoFieldsFragment
  )> }
);

export type QueryTodoByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QueryTodoByIdQuery = (
  { __typename?: 'Query' }
  & { QueryTodoById?: Maybe<(
    { __typename?: 'TodoItem' }
    & TodoFieldsFragment
  )> }
);

export type QueryTodoByTypesQueryVariables = Exact<{
  type: ItemType;
}>;


export type QueryTodoByTypesQuery = (
  { __typename?: 'Query' }
  & { QueryTodoByTypes: Array<(
    { __typename?: 'TodoItem' }
    & TodoFieldsFragment
  )> }
);

export type QueryTodoByStringQueryVariables = Exact<{
  str: Scalars['String'];
}>;


export type QueryTodoByStringQuery = (
  { __typename?: 'Query' }
  & { QueryTodoByString: Array<(
    { __typename?: 'TodoItem' }
    & TodoFieldsFragment
  )> }
);

export type QueryUserTodosQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QueryUserTodosQuery = (
  { __typename?: 'Query' }
  & { QueryUserTodos: Array<(
    { __typename?: 'TodoItem' }
    & TodoFieldsFragment
  )> }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TodoItem: ResolverTypeWrapper<TodoItem>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  ItemType: ItemType;
  Mutation: ResolverTypeWrapper<{}>;
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  BatchPayload: ResolverTypeWrapper<BatchPayload>;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  String: Scalars['String'];
  TodoItem: TodoItem;
  ID: Scalars['ID'];
  Boolean: Scalars['Boolean'];
  User: User;
  Timestamp: Scalars['Timestamp'];
  Mutation: {};
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  BatchPayload: BatchPayload;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  QueryAllTodos?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType>;
  QueryTodoById?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByIdArgs, 'id'>>;
  QueryTodoByString?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByStringArgs, 'str'>>;
  QueryTodoByTypes?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryTodoByTypesArgs, 'type'>>;
  QueryUserTodos?: Resolver<Array<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<QueryQueryUserTodosArgs, 'id'>>;
  QueryAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  QueryUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryQueryUserByIdArgs, 'id'>>;
  QueryUserByString?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryQueryUserByStringArgs, 'str'>>;
};

export type TodoItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoItem'] = ResolversParentTypes['TodoItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creatorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
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

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  MutateTodoStatus?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationMutateTodoStatusArgs, 'status' | 'id'>>;
  CreateTodo?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'createParams'>>;
  UpdateTodo?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'updateParams'>>;
  DeleteTodoById?: Resolver<Maybe<ResolversTypes['TodoItem']>, ParentType, ContextType, RequireFields<MutationDeleteTodoByIdArgs, 'id'>>;
  DeleteUserTodos?: Resolver<ResolversTypes['BatchPayload'], ParentType, ContextType, RequireFields<MutationDeleteUserTodosArgs, 'userId'>>;
  CreateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createParams'>>;
  UpdateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateParams'>>;
  DeleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
};

export type BatchPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BatchPayload'] = ResolversParentTypes['BatchPayload']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  TodoItem?: TodoItemResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  BatchPayload?: BatchPayloadResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

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
    
// The file generated on: 2021.03.22 11:03:84 am-
