module.exports = {
    "scalars": [
        2,
        3,
        4,
        6,
        7,
        8
    ],
    "types": {
        "Query": {
            "QueryAllTodos": [
                1
            ],
            "QueryTodoById": [
                1,
                {
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "QueryTodoByString": [
                1,
                {
                    "str": [
                        3,
                        "String!"
                    ]
                }
            ],
            "QueryTodoByTypes": [
                1,
                {
                    "type": [
                        8,
                        "ItemType!"
                    ]
                }
            ],
            "QueryUserTodos": [
                1,
                {
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "QueryAllUsers": [
                5
            ],
            "QueryUserById": [
                5,
                {
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "QueryUserByString": [
                5,
                {
                    "str": [
                        3,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "TodoItem": {
            "id": [
                2
            ],
            "title": [
                3
            ],
            "content": [
                3
            ],
            "finished": [
                4
            ],
            "type": [
                3
            ],
            "creator": [
                5
            ],
            "creatorId": [
                6
            ],
            "createdAt": [
                7
            ],
            "updatedAt": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "String": {},
        "Boolean": {},
        "User": {
            "id": [
                2
            ],
            "name": [
                3
            ],
            "nickName": [
                3
            ],
            "todos": [
                1
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "Timestamp": {},
        "ItemType": {},
        "Mutation": {
            "MutateTodoStatus": [
                1,
                {
                    "status": [
                        4,
                        "Boolean!"
                    ],
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "CreateTodo": [
                1,
                {
                    "createParams": [
                        10,
                        "CreateTodoInput!"
                    ]
                }
            ],
            "UpdateTodo": [
                1,
                {
                    "updateParams": [
                        11,
                        "UpdateTodoInput!"
                    ]
                }
            ],
            "DeleteTodoById": [
                1,
                {
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "DeleteUserTodos": [
                12,
                {
                    "userId": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "CreateUser": [
                5,
                {
                    "createParams": [
                        13,
                        "CreateUserInput!"
                    ]
                }
            ],
            "UpdateUser": [
                5,
                {
                    "updateParams": [
                        14,
                        "UpdateUserInput!"
                    ]
                }
            ],
            "DeleteUser": [
                5,
                {
                    "id": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "CreateTodoInput": {
            "title": [
                3
            ],
            "userId": [
                6
            ],
            "content": [
                3
            ],
            "type": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "UpdateTodoInput": {
            "id": [
                6
            ],
            "title": [
                3
            ],
            "content": [
                3
            ],
            "type": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "BatchPayload": {
            "count": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "CreateUserInput": {
            "name": [
                3
            ],
            "nickName": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "UpdateUserInput": {
            "id": [
                6
            ],
            "name": [
                3
            ],
            "nickName": [
                3
            ],
            "__typename": [
                3
            ]
        }
    }
}