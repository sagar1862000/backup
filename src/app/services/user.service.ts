import { Injectable, OnInit } from "@angular/core";
import { DbService } from "./db.service";
import { Router } from "@angular/router";

declare var $: any;

@Injectable()
export class UserService implements OnInit {
  profile: any;
  managers:any;u
  clientsdepartment: string;
  PF: any = {};
  mp: any = {};
  bot_language_code: any;
    
    constructor(public db:DbService,private router: Router) {
        this.setProfile();
        this.GetBotLanguage();
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }


    setProfile(): any {
        debugger;
        if (!this.profile?.profilepic) {
          this.db.list('user/profile/', null, ((response): void => {    
            if (response.is_ats === '0' || response.is_ats === 0) {
              this.clientsdepartment = 'Department';
            } else if (response.is_ats === '1' || response.is_ats === 1) {
              this.clientsdepartment = 'Client';
            } else {
              this.clientsdepartment = 'Client/Department';
            }
    
            this.profile = response;
            this.profile.profilepic = "";//this.db.rooturi + 'user/profile/' + this.profile.profilepic;
            this.PF = response;
            document.title = 'PR : ' + this.profile.application;
    
          }));
        }
        if (!this.mp.mploaded) {
          this.db.list('mypermission/', null, ((response): void => {
            const data = response;
            this.mp = { mploaded: true };
            if (data !== null) {
              for (const i in data) {
                if (data[i]) {
                  this.mp[data[i].slug] = true;
                }
              }
            }
            if (!this.mp.page_dashboard && this.router.url === '/dashboard') {
              this.router.navigate(['myjob']);
            }
            
          }));
          this.mp.mploaded = false;
        }
      }

      loadmyteam(): void {
        this.db.list('user/myteam/', null, ((response): void => {
          this.managers = response;
          // console.log(response);
        })
        );
      }

      
    GetBotLanguage(): any {

        this.db.list('languagecode/', null, ((response): void => {
          this.bot_language_code = response;
        }));
      }
}