import { NgModule, ErrorHandler }   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }                    from './app.component';

import { HomePage }                 from '../pages/home/home';
import { LoginPage }                from "../pages/login/login";
import { ProfilePage }              from "../pages/profile/profile";
import { EditprofilePage }          from "../pages/editprofile/editprofile";

import { TrackingchoicePage }       from "../pages/trackingchoice/trackingchoice";
import { TrackinggoalPage }         from "../pages/trackinggoal/trackinggoal";
import { TrackingNotRealtimePage }  from "../pages/tracking-not-realtime/tracking-not-realtime";

import { CountdownModal }           from "../pages/countdown-modal/countdown-modal";
import { SolotrackingModal }        from "../pages/solotracking-modal/solotracking-modal";

import { EditProfileService }       from '../services/user/user.service';
import { AUTH_PROVIDERS }           from 'angular2-jwt';
import { AuthConfig, AuthHttp }     from 'angular2-jwt';
import { AuthService }              from '../services/auth/auth.service';
import { Http }                     from '@angular/http';
import { Storage }                  from '@ionic/storage';

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
    ProfilePage,
    EditprofilePage,
    TrackingchoicePage,
    TrackinggoalPage,
    TrackingNotRealtimePage,
    CountdownModal,
    SolotrackingModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    EditprofilePage,
    TrackingchoicePage,
    TrackinggoalPage,
    TrackingNotRealtimePage,
    CountdownModal,
    SolotrackingModal
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    EditProfileService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {
}
