import { Data } from './data.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

  }

  saveQuesPaper(quesPaperValue) {
    return this.afs.collection('quesPapers').add(quesPaperValue);
  }

  getQuesPapers() {
    return this.afs.collection('quesPapers').snapshotChanges().pipe(
      map(data => {
        return data.map(curr => {
          let data = curr.payload.doc.data() as Data;
          let id = curr.payload.doc.id;
          return { ...data, id };
        })
      })
    );
  }

  getOneQuesPaper(paperId) {
    return this.afs.collection('quesPapers').doc(paperId).valueChanges();
  }

  updateOneQuestion(paperId, quesPaperValue) {
    return this.afs.collection('quesPapers').doc(paperId).update(quesPaperValue);
  }

  deleteQuesPaper(paperId) {
    return this.afs.collection('quesPapers').doc(paperId).delete();
  }
}
