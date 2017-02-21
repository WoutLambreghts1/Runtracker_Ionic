import {NgModule, ErrorHandler}   from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp}                    from './app.component';

import {HomePage}                 from '../pages/home/home';
import {LoginPage}                from "../pages/login/login";
import {TrackingchoicePage}       from "../pages/trackingchoice/trackingchoice";
import {TrackinggoalPage}         from "../pages/trackinggoal/trackinggoal";
import {TrackingNotRealtimePage}  from "../pages/tracking-not-realtime/tracking-not-realtime";

import {AUTH_PROVIDERS}           from 'angular2-jwt';
import {AuthConfig, AuthHttp}     from 'angular2-jwt';
import {AuthService}              from '../services/auth/auth.service';
import { Http }                   from '@angular/http';
import { Storage }                from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TrackingchoicePage,
    TrackinggoalPage,
    TrackingNotRealtimePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TrackingchoicePage,
    TrackinggoalPage,
    TrackingNotRealtimePage
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {
}
