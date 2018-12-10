import { Injectable } from "@angular/core";
import { GoogleApiService } from "./GoogleApiService";
import GoogleAuth = gapi.auth2.GoogleAuth;
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(private googleApi: GoogleApiService) {
        this.googleApi.onLoad().subscribe(() => {
            this.loadGapiAuth();
        });
    }

    public getAuth(newInstance = false): Observable<GoogleAuth> {
        if (!this.GoogleAuth || newInstance) {
            return this.googleApi.onLoad()
                .pipe(mergeMap(() => this.loadGapiAuth()));
        }
        return of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        let subj = new Subject<GoogleAuth>()

        gapi.load('auth2', () => {
            gapi.auth2.init(this.googleApi.getConfig().getClientConfig())
                .then((auth: GoogleAuth) => {
                    this.GoogleAuth = auth;
                    subj.next(auth);
                    subj.complete();
                }).catch((err: any) => {
                    subj.error(err);
                });
        });

        return subj.asObservable()
    }
}
