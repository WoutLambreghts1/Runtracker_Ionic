import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {AuthHttpImpl} from "../../services/auth/auth-http-impl";
import {BACKEND_BASEURL} from "../../assets/globals";
import {Response} from "@angular/http";

import {MQTTService} from "../../services/mqtt/mqtt.service";
import {UserService} from "../../services/auth/user.service";

import {User} from "../../model/user";
import {Competition} from "../../model/competition";
import {Observable} from "rxjs";
import {Packet} from 'mqtt';
import {MQTTPacketType, MQTTPacket} from "../../services/mqtt/packet/mqtt.packet";
import {InviteResponsePacket} from "../../services/mqtt/packet/inviteresponse.packet";
import {ReadyPacket} from "../../services/mqtt/packet/ready.packet";

/*
 Generated class for the ChallengeLoad page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-challenge-load',
  templateUrl: 'challenge-load.html'
})
export class ChallengeLoadPage implements OnInit {
  private compId: number;
  private challengers: User[];

  private messages: Observable<Packet>;

  private userReady: boolean = false;
  private challengerReady: boolean = false;

  private currUser: User;

  ngOnInit() {
    this.authHttp.getAuthHttp().get(BACKEND_BASEURL + "/api/competitions/" + this.compId)
      .map((res: Response) => res.json())
      // .catch(err => console.log(err))
      .subscribe((comp: Competition) => {
        console.log(comp);
        this.challengers = comp.usersRun;
      });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public authHttp: AuthHttpImpl, public mqttService: MQTTService, private userService: UserService) {
    this.userService.getUser().subscribe((user: User) => {
      this.currUser = user;
    });
    //TODO catch statement
    this.compId = navParams.get("compId");
    this.messages = this.mqttService.compMessages;
    this.messages.subscribe(this.on_next);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengeLoadPage');
  }

  private on_next = (message: Packet) => {
    let mqttPacket: MQTTPacket = JSON.parse(message.toString());
    if (mqttPacket.type === MQTTPacketType.INVITE_RESPONSE) {
      let inviteResponsePacket: InviteResponsePacket = JSON.parse(message.toString());
      if (inviteResponsePacket.accepted) {
        this.ngOnInit();
      } else {
        this.authHttp.getAuthHttp().delete(BACKEND_BASEURL + "/api/competitions/delete/" + inviteResponsePacket.compId)
        //todo catch statement
          .subscribe(() => {
            console.log("Trying to delete competition, fails miserably if no permission to do so.")
          });
        this.navCtrl.popToRoot();
      }
    } else if (mqttPacket.type === MQTTPacketType.READY) {
      let readyPacket: ReadyPacket = JSON.parse(message.toString());
      console.log(readyPacket);
      if (readyPacket.userId === this.currUser.userId) {
        this.userReady = readyPacket.ready;
      } else {
        this.challengerReady = readyPacket.ready;
      }
    }
  };

  public onReadyToggle(): void {
    let readyPacket = new ReadyPacket(this.compId, this.currUser.userId, (this.userReady = !this.userReady));
    this.mqttService.publishInCompTopic(JSON.stringify(readyPacket));
  }

  public onCancelClick(): void {
    let cancelResponse = new InviteResponsePacket(this.compId, this.currUser.userId, false);
    this.mqttService.publishInCompTopic(JSON.stringify(cancelResponse));
  }
}