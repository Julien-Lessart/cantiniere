import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigBack } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConstraintsService {

  constructor(private _http: HttpClient) { }

  private _config = new ConfigBack();
  //Query pour obtenir les contraintes actuelles
  private _getConstraintsQuery:string = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/constraint/find/1`;
  //Query pour update les contraintes
  private _patchConstraintsQuery:string = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/constraint/update/1`;

  /**
   * Appel au back afin d'obtenir les contraintes actuelles
   * @returns la réponse de la query
   */
  getConstraints = () => {
    return this._http.get<any>(
      this._getConstraintsQuery,
      { observe: 'response' }
    );
  }

  /**
   * Update les contraintes avec de nouvelles contraintes
   * @param body un objet contenant
   * @returns la réponse de la query
   */
  patchConstaints = (body:{orderTimeLimit:string, maximumOrderPerDay:number, rateVAT:number}) => {
    const token = localStorage.getItem("id_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const requestOptions = { headers: headers };
    return this._http.patch(
      this._patchConstraintsQuery,
      body,
      requestOptions
    )
  }
  
}
