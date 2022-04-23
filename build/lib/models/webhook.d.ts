import { IWebHookEvent } from "../types";
export declare class WebHook {
    id: string;
    event: IWebHookEvent;
    url: string;
}
export declare const webhookFactory: (payload: any) => WebHook;
