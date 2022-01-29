import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    Timestamp: any,
}

export interface Query {
    QueryAllTodos: TodoItem[]
    QueryTodoById?: TodoItem
    QueryTodoByString: TodoItem[]
    QueryTodoByTypes: TodoItem[]
    QueryUserTodos: TodoItem[]
    QueryAllUsers: User[]
    QueryUserById?: User
    QueryUserByString?: User[]
    __typename: 'Query'
}

export interface TodoItem {
    id: Scalars['ID']
    title: Scalars['String']
    content?: Scalars['String']
    finished: Scalars['Boolean']
    type: Scalars['String']
    creator?: User
    creatorId?: Scalars['Int']
    createdAt: Scalars['Timestamp']
    updatedAt: Scalars['Timestamp']
    __typename: 'TodoItem'
}

export interface User {
    id: Scalars['ID']
    name: Scalars['String']
    nickName?: Scalars['String']
    todos?: TodoItem[]
    __typename: 'User'
}


/** Todo Item Type */
export type ItemType = 'LIFE' | 'FEATURE' | 'BUG' | 'IDEA'

export interface Mutation {
    MutateTodoStatus?: TodoItem
    CreateTodo?: TodoItem
    UpdateTodo?: TodoItem
    DeleteTodoById?: TodoItem
    DeleteUserTodos: BatchPayload
    CreateUser: User
    UpdateUser: User
    DeleteUser: User
    __typename: 'Mutation'
}

export interface BatchPayload {
    count: Scalars['Int']
    __typename: 'BatchPayload'
}

export interface QueryRequest{
    QueryAllTodos?: TodoItemRequest
    QueryTodoById?: [{id: Scalars['Int']},TodoItemRequest]
    QueryTodoByString?: [{str: Scalars['String']},TodoItemRequest]
    QueryTodoByTypes?: [{type: ItemType},TodoItemRequest]
    QueryUserTodos?: [{id: Scalars['Int']},TodoItemRequest]
    QueryAllUsers?: UserRequest
    QueryUserById?: [{id: Scalars['Int']},UserRequest]
    QueryUserByString?: [{str: Scalars['String']},UserRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TodoItemRequest{
    id?: boolean | number
    title?: boolean | number
    content?: boolean | number
    finished?: boolean | number
    type?: boolean | number
    creator?: UserRequest
    creatorId?: boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    id?: boolean | number
    name?: boolean | number
    nickName?: boolean | number
    todos?: TodoItemRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    MutateTodoStatus?: [{status: Scalars['Boolean'],id: Scalars['Int']},TodoItemRequest]
    CreateTodo?: [{createParams: CreateTodoInput},TodoItemRequest]
    UpdateTodo?: [{updateParams: UpdateTodoInput},TodoItemRequest]
    DeleteTodoById?: [{id: Scalars['Int']},TodoItemRequest]
    DeleteUserTodos?: [{userId: Scalars['Int']},BatchPayloadRequest]
    CreateUser?: [{createParams: CreateUserInput},UserRequest]
    UpdateUser?: [{updateParams: UpdateUserInput},UserRequest]
    DeleteUser?: [{id: Scalars['Int']},UserRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateTodoInput {title: Scalars['String'],userId: Scalars['Int'],content?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}

export interface UpdateTodoInput {id: Scalars['Int'],title?: (Scalars['String'] | null),content?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}

export interface BatchPayloadRequest{
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CreateUserInput {name: Scalars['String'],nickName?: (Scalars['String'] | null)}

export interface UpdateUserInput {id: Scalars['Int'],name?: (Scalars['String'] | null),nickName?: (Scalars['String'] | null)}


const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const TodoItem_possibleTypes = ['TodoItem']
export const isTodoItem = (obj?: { __typename?: any } | null): obj is TodoItem => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTodoItem"')
  return TodoItem_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const BatchPayload_possibleTypes = ['BatchPayload']
export const isBatchPayload = (obj?: { __typename?: any } | null): obj is BatchPayload => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isBatchPayload"')
  return BatchPayload_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain{
    QueryAllTodos: ({get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Promise<FieldsSelection<TodoItem, R>[]>}),
    QueryTodoById: ((args: {id: Scalars['Int']}) => TodoItemPromiseChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Promise<(FieldsSelection<TodoItem, R> | undefined)>}),
    QueryTodoByString: ((args: {str: Scalars['String']}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Promise<FieldsSelection<TodoItem, R>[]>}),
    QueryTodoByTypes: ((args: {type: ItemType}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Promise<FieldsSelection<TodoItem, R>[]>}),
    QueryUserTodos: ((args: {id: Scalars['Int']}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Promise<FieldsSelection<TodoItem, R>[]>}),
    QueryAllUsers: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Promise<FieldsSelection<User, R>[]>}),
    QueryUserById: ((args: {id: Scalars['Int']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    QueryUserByString: ((args: {str: Scalars['String']}) => {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R>[] | undefined)) => Promise<(FieldsSelection<User, R>[] | undefined)>})
}

export interface QueryObservableChain{
    QueryAllTodos: ({get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Observable<FieldsSelection<TodoItem, R>[]>}),
    QueryTodoById: ((args: {id: Scalars['Int']}) => TodoItemObservableChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Observable<(FieldsSelection<TodoItem, R> | undefined)>}),
    QueryTodoByString: ((args: {str: Scalars['String']}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Observable<FieldsSelection<TodoItem, R>[]>}),
    QueryTodoByTypes: ((args: {type: ItemType}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Observable<FieldsSelection<TodoItem, R>[]>}),
    QueryUserTodos: ((args: {id: Scalars['Int']}) => {get: <R extends TodoItemRequest>(request: R, defaultValue?: FieldsSelection<TodoItem, R>[]) => Observable<FieldsSelection<TodoItem, R>[]>}),
    QueryAllUsers: ({get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>[]) => Observable<FieldsSelection<User, R>[]>}),
    QueryUserById: ((args: {id: Scalars['Int']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    QueryUserByString: ((args: {str: Scalars['String']}) => {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R>[] | undefined)) => Observable<(FieldsSelection<User, R>[] | undefined)>})
}

export interface TodoItemPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    content: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    finished: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    creator: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    creatorId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['Timestamp']) => Promise<Scalars['Timestamp']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['Timestamp']) => Promise<Scalars['Timestamp']>})
}

export interface TodoItemObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    content: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    finished: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    type: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    creator: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    creatorId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['Timestamp']) => Observable<Scalars['Timestamp']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['Timestamp']) => Observable<Scalars['Timestamp']>})
}

export interface UserPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    nickName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    todos: ({get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R>[] | undefined)) => Promise<(FieldsSelection<TodoItem, R>[] | undefined)>})
}

export interface UserObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    nickName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    todos: ({get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R>[] | undefined)) => Observable<(FieldsSelection<TodoItem, R>[] | undefined)>})
}

export interface MutationPromiseChain{
    MutateTodoStatus: ((args: {status: Scalars['Boolean'],id: Scalars['Int']}) => TodoItemPromiseChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Promise<(FieldsSelection<TodoItem, R> | undefined)>}),
    CreateTodo: ((args: {createParams: CreateTodoInput}) => TodoItemPromiseChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Promise<(FieldsSelection<TodoItem, R> | undefined)>}),
    UpdateTodo: ((args: {updateParams: UpdateTodoInput}) => TodoItemPromiseChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Promise<(FieldsSelection<TodoItem, R> | undefined)>}),
    DeleteTodoById: ((args: {id: Scalars['Int']}) => TodoItemPromiseChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Promise<(FieldsSelection<TodoItem, R> | undefined)>}),
    DeleteUserTodos: ((args: {userId: Scalars['Int']}) => BatchPayloadPromiseChain & {get: <R extends BatchPayloadRequest>(request: R, defaultValue?: FieldsSelection<BatchPayload, R>) => Promise<FieldsSelection<BatchPayload, R>>}),
    CreateUser: ((args: {createParams: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    UpdateUser: ((args: {updateParams: UpdateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    DeleteUser: ((args: {id: Scalars['Int']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface MutationObservableChain{
    MutateTodoStatus: ((args: {status: Scalars['Boolean'],id: Scalars['Int']}) => TodoItemObservableChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Observable<(FieldsSelection<TodoItem, R> | undefined)>}),
    CreateTodo: ((args: {createParams: CreateTodoInput}) => TodoItemObservableChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Observable<(FieldsSelection<TodoItem, R> | undefined)>}),
    UpdateTodo: ((args: {updateParams: UpdateTodoInput}) => TodoItemObservableChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Observable<(FieldsSelection<TodoItem, R> | undefined)>}),
    DeleteTodoById: ((args: {id: Scalars['Int']}) => TodoItemObservableChain & {get: <R extends TodoItemRequest>(request: R, defaultValue?: (FieldsSelection<TodoItem, R> | undefined)) => Observable<(FieldsSelection<TodoItem, R> | undefined)>}),
    DeleteUserTodos: ((args: {userId: Scalars['Int']}) => BatchPayloadObservableChain & {get: <R extends BatchPayloadRequest>(request: R, defaultValue?: FieldsSelection<BatchPayload, R>) => Observable<FieldsSelection<BatchPayload, R>>}),
    CreateUser: ((args: {createParams: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    UpdateUser: ((args: {updateParams: UpdateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    DeleteUser: ((args: {id: Scalars['Int']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface BatchPayloadPromiseChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface BatchPayloadObservableChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}