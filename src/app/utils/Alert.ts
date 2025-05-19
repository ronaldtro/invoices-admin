import { BehaviorSubject } from "rxjs";

interface AlertInterface {
    state: boolean,
    message: string
}

export class Alert {

    private alertSubject:BehaviorSubject<AlertInterface> = new BehaviorSubject<AlertInterface>({state: false, message: ""});

    constructor(state:boolean = false, message:string="") {
       this.alertSubject.next({state, message});
    }

    getAlertSubject(){
        return this.alertSubject.asObservable();
    }

    setStateAlertSubject(state:boolean){
        this.alertSubject.next({...this.alertSubject.getValue(), state});
    }

    setMessageAlertSubject(message:string){
        this.alertSubject.next({...this.alertSubject.getValue(), message});
    }

}