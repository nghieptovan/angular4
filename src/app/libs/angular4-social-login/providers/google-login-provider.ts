import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';

declare let gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID: string = 'GOOGLE';

  private auth2: any;

  constructor(private clientId: string) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(GoogleLoginProvider.PROVIDER_ID,
        '//apis.google.com/js/platform.js',
        () => {
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: this.clientId,
              scope: 'email'
            });

            this.auth2.then(() => {
              if (this.auth2.isSignedIn.get()) {
                const user: SocialUser = new SocialUser();
                const profile = this.auth2.currentUser.get().getBasicProfile();

                user.id = profile.getId();
                user.name = profile.getName();
                user.email = profile.getEmail();
                user.photoUrl = profile.getImageUrl();
                user.firstName = profile.getGivenName();
                user.lastName = profile.getFamilyName();

                resolve(user);
              }
            });
          });
      });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      const promise = this.auth2.signIn();

      promise.then(() => {
        const user: SocialUser = new SocialUser();
        const profile = this.auth2.currentUser.get().getBasicProfile();

        user.id = profile.getId();
        user.name = profile.getName();
        user.email = profile.getEmail();
        user.photoUrl = profile.getImageUrl();

        resolve(user);
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}
