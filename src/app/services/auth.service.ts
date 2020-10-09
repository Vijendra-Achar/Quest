import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  currentUserEmail: string;

  private authErrors = new BehaviorSubject("");

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  get authErrors$() {
    return this.authErrors.asObservable();
  }

  signInUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    }).catch(errors => {
      this.authErrors.next(errors.message);
    })
  }

  signUpUser(email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        userCred.user.updateProfile({
          displayName: name
        })
        this.updateUserData(userCred.user, name);
      }).catch(errors => {
        this.authErrors.next(errors);
      })
  }

  updateUserData(user, name) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: name
    }

    return userRef.set(data, { merge: true });
  }

  signOutUser() {
    let signOut = this.afAuth.signOut();
    this.router.navigate(['/login']);
    return signOut;
  }
}
