export class ErrorResponse {
    constructor() {

    }
}


export const errorFactory = (payload: any): ErrorResponse => {
    return Object.assign(new ErrorResponse(), payload);
};
