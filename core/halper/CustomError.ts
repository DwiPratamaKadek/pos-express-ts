import { HttpStatus } from "./HttpStatus"

export class CustomError extends Error {
    status!: number
    constructor(status: number, message : string ){
        super(message)
        this.status = status
    }
}

export class BadRequestError extends CustomError{
    constructor(message = "Bad Request"){
        super(HttpStatus.BAD_REQUEST, message)
    }
} 

export class NotFoundError extends CustomError{
    constructor(message = "Not Found"){
        super(HttpStatus.NOT_FOUND, message)
    }
} 

export class UnauthorizedError extends CustomError {
    constructor(message = "Unauthorized") {
        super(HttpStatus.UNAUTHORIZED, message)
    }
}