import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


/**
 * servicio genérico de REST Api.
 */
@Injectable()
export class ApiService {
  // URL calidad
  protected endpointv1 = environment.endpointv1;
  private options: any = {};


  constructor(private readonly httpC: HttpClient) {
    this.options = {
      reportProgress: true,
    };
  }

  /**
   * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados.
   * @param inUrl url a donde hacer post.
   * @param query Es la consulta a realizar.
   * @return Es la respuesta del servidor según la consulta que se realice.
   */
  async post(inUrl: string, query?: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.httpC.post(`${this.endpointv1}${inUrl}`, query)
        .subscribe(response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          reject({
            status: fail.status,
            error: fail.error
          });
        });
    });
  }

  /**
   * Se envia una peticion `GET` a un servidor web y regresa los datos que son recuperados.
   * @param inUrl url a donde hacer get.
   * @return Es la respuesta del servidor según la consulta que se realice.
   */
  async get(inUrl: string): Promise<any> {
    const formedUrl = this.filterAccents(inUrl.split(' ').join('-'));
    return await new Promise((resolve, reject) => {
      this.httpC.get(`${this.endpointv1}${formedUrl}`)
        .subscribe( response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          try {
            fail = fail.json();
          } catch (error) {}
          reject(fail);
        });
    });
  }

  /**
   * Se envia una peticion `DELETE` a un servidor web y regresa los datos que son recuperados.
   * @param inUrl url a donde hacer DELETE.
   * @return Es la respuesta del servidor según la consulta que se realice.
   */
  async delete(inUrl: string): Promise<any> {
    const formedUrl = inUrl.split(' ').join('-');
    return await new Promise((resolve, reject) => {
      this.httpC.delete(`${this.endpointv1}${formedUrl}`)
        .subscribe(response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          try {
            fail = fail.json();
          } catch (error) {
          }
          reject(fail);
        });
    });
  }


  /**
   * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
   * @param inUrl url a donde hacer PUT.
   * @param query Es la consulta a realizar.
   * @return Es la respuesta del servidor según la consulta que se realice.
   */
  async put(inUrl: string, query?: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.httpC.put(`${this.endpointv1}${inUrl}`, query)
        .subscribe(response => {
          try {
            resolve(response);
          } catch (error) {
            reject(response);
          }
        }, fail => {
          reject({
            status: fail.status,
            error: fail.error
          });
        });
    });
  }

  /**
   * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
   * @param valForm Este es el archivo para enviar al servidor.
   * @param inUrl Este es el destino donde se enviara el archivo.
   */
  public fileUpload(valForm: FormData, inUrl: string) {
    const options = {
      reportProgress: true
    };

    const req = new HttpRequest('PUT', `${this.endpointv1}${inUrl}`, valForm, options);
    return this.httpC.request(req)
    .pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error)) // then handle the error
    );
  }

  /**
   * Elimina los acentos de una cadena.
   * @param  value [description]
   * @return       [description]
   */
  private filterAccents(value: string) {
    const accents = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    const original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (let i = 0; i < accents.length; i++) {
      value = value.replace(accents.charAt(i), original.charAt(i));
    }
    return value;
  }

}
