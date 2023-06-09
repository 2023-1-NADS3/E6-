import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface UserInfo{
  name: string;
  type: string;
}


@Injectable({
  providedIn: 'root'
})
  
export class AuthService {

  public API: string = 'http://localhost:3000';
  public isAuthenticated: boolean = false;
  public userType?: string;
  public user: any = {}

  constructor(private router: Router) { }


  

  getUserObject() {
    localStorage.getItem('user')
  }

  async getUserFromStorage(): Promise<UserInfo | null> {
    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
      return await JSON.parse(userInfo)
    } else {
      return null;
      // try to fetch
      // if not work logout
    }
  }

  isLoggedIn(): boolean {
    // return false
    console.log(localStorage.getItem('access_token'))
    return !!localStorage.getItem('access_token');
  }

  saveToken(token: string): void{
    localStorage.setItem('access_token', `Bearer ${token}`)
  }


  getUserInfo(): any {
      const cookieValue = document.cookie.split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('user='))
        ?.split('=')[1];
    return cookieValue
  }

  getToken(): any{
    return localStorage.getItem('access_token')
  }

  saveType(type: string): void{
    localStorage.setItem('type', type)
  }

  getType(): string | null {
    const type = localStorage.getItem('type');
    if (type) return type;
    return null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/dash')
  }

  test_id: string | null = null
  test_name: string | null = null
  saveTest(ong_id?: string | null, ong_name?: string | null) {
    this.test_id = ong_id || null;
    this.test_name = ong_name || null; 
  }
  getTest() {
    return { ong_id: this.test_id, ong_name: this.test_name };
  }

}
