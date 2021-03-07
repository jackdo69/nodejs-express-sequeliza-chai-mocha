const config = {
    "openapi": "3.0.1",
    "info": {
        "title": "Restfull simple application",
        "description": "Restfull simple application",
        "contact": {
            "name": "Pham Van Tuyen",
            "email": "tuyenpv@fsoft.com.vn"
        },
        "version": "1.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000/"
        }
    ],
    "paths": {
        "/users": {
            "get": {
                "tags": [
                    "Users"
                ],
                "operationId": "GetAllUsers",
                "summary": "Get all users",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Users response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/UserDto"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDto"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/add": {
            "put": {
                "tags": [
                    "Users"
                ],
                "operationId": "AddUser",
                "summary": "Add user",
                "parameters": [],
                "requestBody": {
                    "description": "Add new user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/AddUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserDto"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDto"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/update": {
            "post": {
                "tags": [
                    "Users"
                ],
                "operationId": "UpdateUser",
                "summary": "Update user",
                "parameters": [],
                "requestBody": {
                    "description": "Update user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UpdateUserRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserDto"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Error response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDto"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users/delete/{id}": {
            "delete": {
                "tags": [
                    "Users"
                ],
                "operationId": "DeleteUser",
                "summary": "Delete an existing user",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "number"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Success"
                    },
                    "500": {
                        "description": "Error response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDto"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "AddUserRequest": {
                "required": [
                    "name",
                    "email"
                ],
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "User name"
                    },
                    "email": {
                        "minLength": 6,
                        "type": "string",
                        "description": "User's email"
                    },
                    "age": {
                        "type": "number",
                        "description": "User's age"
                    }
                }
            },
            "UpdateUserRequest": {
                "required": [
                    "id"
                ],
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "description": "User's ID"
                    },
                    "name": {
                        "type": "string",
                        "description": "User name"
                    },
                    "email": {
                        "minLength": 6,
                        "type": "string",
                        "description": "User's email"
                    },
                    "age": {
                        "type": "number",
                        "description": "User's age"
                    }
                }
            },
            "ErrorDto": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "Error message"
                    }
                }
            },
            "UserDto": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "description": "User's ID"
                    },
                    "name": {
                        "type": "string",
                        "description": "User's name"
                    },
                    "email": {
                        "minLength": 6,
                        "type": "string",
                        "description": "User's email"
                    },
                    "age": {
                        "type": "number",
                        "description": "User's age"
                    }
                }
            },
            "ArrayOfUserDtos": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/UserDto"
                }
            }
        }
    }
}

export default config;