import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { OAuth2AuthenticateOptions } from '@byteowls/capacitor-oauth2';

export const oauth2Options: OAuth2AuthenticateOptions = {
  appId: '0oaft6l2biU6Yotr3356',
  authorizationBaseUrl: 'https://dev-133320.okta.com/oauth2/default/v1/authorize',
  accessTokenEndpoint: 'https://dev-133320.okta.com/oauth2/default/v1/token',
  scope: 'email openid profile',
  resourceUrl: 'https://dev-133320.okta.com/oauth2/default/v1/userinfo',
  web: {
    redirectUrl: 'http://localhost:8100',
    windowOptions: 'height=600,left=0,top=0',
    additionalParameters: {
      nonce: Math.random().toString(36).substr(2, 5)
    }
  },
  ios: {
    appId: '0oaft6kwksPlgarMw356',
    responseType: 'code',
    customScheme: 'com.okta.dev-133320:/callback'
  },
  android: {
    appId: '0oaft6kwksPlgarMw356',
    responseType: 'code',
    customScheme: 'com.okta.dev-133320:/callback'
  }
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isAuthenticated = false;
  user: any;

  ngOnInit(): void {
    // this.login();
  }

  login() {
    Plugins.OAuth2Client.authenticate(oauth2Options).then(resourceUrlResponse => {
      const accessToken = resourceUrlResponse['access_token'];
      const oauthUserId = resourceUrlResponse['id'];
      const name = resourceUrlResponse['name'];
      // go to backend
      this.isAuthenticated = true;
      this.user = resourceUrlResponse;
      console.log('response', resourceUrlResponse);
    }).catch(reason => {
      console.error('OAuth rejected', reason);
    });
  }

  logout() {
    Plugins.OAuth2Client.logout(oauth2Options).then((response) => {
      // do something
      console.log('logout worked', response);
      this.isAuthenticated = false;
      this.user = null;
    }).catch(reason => {
      console.error('OAuth logout failed', reason);
    });
  }
}
