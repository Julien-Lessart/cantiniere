import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream:src/app/Services/auth.service.ts
import moment, { Moment } from 'moment';
import { SignInModel, SignUpModel } from '../components/login/login.component';
=======
import moment, { Moment } from "moment";
import { SignUpModel, SignInModel } from '../../components/login/login.component';
>>>>>>> Stashed changes:src/app/services/auth/auth.service.ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  private _config = new configBack();
  // Query pour la connexion utilisateur
  _loginQuery: string = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/login`;

  // Query pour la création d'un utilisateur
  _registerQuery: string = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/user/register`;

  /**
   * Permet le test du mail et du mot de passe pour la connexion
   * @param user le mail et le mot de passe de l'utilisateur
   * @returns la réponse de la query
   */
  loginUser(user: SignInModel) {
    return this._http.get<any>(
      this._loginQuery + `?email=${user.email}&password=${user.password}`,
      { observe: 'response' }
    );
  }

  /**
   * Permet le test du mail et du mot de passe pour la connexion
   * @param user les informations de l'utilisateur
   * @returns la réponse de la query
   */
  registerUser(user: SignUpModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const requestOptions = { headers: headers };
    const data = JSON.stringify(user);
    console.log(data);
    return this._http.put<any>(this._registerQuery, data, requestOptions);
  }

  /**
   * Permet d'ajouter le token d'authentification au local storage avec son expiration
<<<<<<< Updated upstream:src/app/Services/auth.service.ts
   * @param authResult L'objet de laa réponse de l'authentification
   */
  setSession(authResult: any): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
=======
   * @param authResult L'objet de laa réponse de l'authentification 
   */ 
  setSession(authResult:any):void {
>>>>>>> Stashed changes:src/app/services/auth/auth.service.ts
    localStorage.setItem('id_token', authResult[1].idToken);
    localStorage.setItem('expires_at', JSON.stringify(authResult[1].user.exp));
    localStorage.setItem('roles', authResult[1].user.roles);
    localStorage.setItem('user', JSON.stringify(authResult[1].user.user));
  }

  /**
   * Permet de mettre les données de l'utlisateur en cache
   * @param email Pour pouvoir tester si l'utilisateur est le même car les mails sont unique
   */
  /* setUser(email:string):void{
    let indexOfUser = 0;
    let res = this.findAll();
    console.log(res);
    console.log(Object.keys(res).length);
    for(let i = 0; i > Object.keys(res).length; i++ ){
      if(res[i].email === email){
        indexOfUser = i;
      }
    }
    localStorage.setItem('user', JSON.stringify(res[indexOfUser]));
  } */

  /**
   * Permet de supprimer son token et donc de déconnecté l'utlisateur
   */
  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  /**
   * Pour savoir si l'utilisateur est toujours connecté
   * @returns {boolean} true si le token n'est pas encore périmé
   */
<<<<<<< Updated upstream:src/app/Services/auth.service.ts
  public isLoggedIn(): boolean {
=======
  public isLoggedIn():boolean {

    console.log('isLoggedIn :', moment().isBefore(this.getExpiration()));
>>>>>>> Stashed changes:src/app/services/auth/auth.service.ts
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Pour savoir si l'utilisateur n'est pas connécté
   * @returns {boolean} true si l'utilisateur n'est pas connecté
   */
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  /**
   * Helper de isLoggedIn()
   * @returns {Moment} Date a laquelle le token expire
   * */ 
  getExpiration():Moment {
    const expiration = localStorage.getItem("expires_at") || "0";
    const expiresAt = JSON.parse(expiration);
    return moment(moment.unix(expiresAt).format());
  }

<<<<<<< Updated upstream:src/app/Services/auth.service.ts
  isLunchlady():boolean {
    return localStorage.getItem("roles")?.includes("ROLE_LUNCHLADY") == true;
  }

=======
  /**
   * Permet de savoir si c'est la cantinière qui est connecté grace a son role stocke dans le localStorage
   * @returns True si l'utilisateur est la cantinière
   */
  isLunchlady():boolean {
    return localStorage.getItem("roles")?.includes("ROLE_LUNCHLADY") == true;
  }
>>>>>>> Stashed changes:src/app/services/auth/auth.service.ts
  
}

// Config de l'url
export class configBack {
  protocol: string = 'http';
  domain: string = 'localhost';
  port: string = '8080';
  context: string = 'stone.lunchtime';
}
