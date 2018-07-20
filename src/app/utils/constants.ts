export class Constants{
  public static BASE_API_URL = 'http://localhost/FullAngularApp/';
  public static url(url:string):string{
    return this.BASE_API_URL + url;
  }
}
