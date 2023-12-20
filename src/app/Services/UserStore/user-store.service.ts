import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleFromStore(role: string) {
    this.role$.asObservable();
  }
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameFromStore(role:string) {
    this.fullName$.asObservable();
  }
}
