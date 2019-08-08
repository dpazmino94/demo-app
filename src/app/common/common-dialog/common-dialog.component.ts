import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {
  // NgModels
  title: string;
  description: string;
  dataItems: Object;
  constructor(
    public dialogRef: MatDialogRef<any>,
    public db: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      //this.saveDB = this.db.collection('items');
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  saveDataFirebase() {
    this.dataItems = {
      title: this.title,
      description: this.description
    };
    this.db.collection('items').add(this.dataItems).then(() => {
      this.onNoClick();
    });
  }
}
