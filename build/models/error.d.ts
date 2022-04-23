import { ICreateError } from '../types';
export declare class ErrorResponse {
    constructor();
}
export declare const errorFactory: (payload: ICreateError) => ErrorResponse;
