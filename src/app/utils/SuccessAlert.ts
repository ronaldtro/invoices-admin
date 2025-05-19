// import { BehaviorSubject } from "rxjs";

import { Alert } from "./Alert";

// interface Alert {
//     state: boolean,
//     message: string
// }
// const alertSubject:BehaviorSubject<Alert> = new BehaviorSubject<Alert>({state: false, message: ""});

// export function getAlertSubject(){
//     return alertSubject.asObservable();
// }

// export function setMessageAlertSubject(message:string){
//     alertSubject.next({...alertSubject.getValue(), message});
// }

// export function setAlertSubject(state: boolean){
//     alertSubject.next({...alertSubject.getValue(), state});
// }

export const SuccessAlert = new Alert();