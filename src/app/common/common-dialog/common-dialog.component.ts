import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements AfterContentInit {
  // NgModels
  title: string;
  description: string;
  // Temporal id for update
  temporalId: string;
  // Objects
  dataItems: Object;
  // Variable that controls the delete functionality
  deleteController: boolean;
  constructor(
    public dialogRef: MatDialogRef<any>,
    public db: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterContentInit() {
    if (this.data) { // This activates when it is an update dialog
      this.title = this.data.title;
      this.description = this.data.description;
      this.temporalId = this.data.id;
      this.deleteController = this.data.deleteController;
    }
  }

  saveDataFirebase() {
    // Data model
    this.dataItems = {
      title: this.title,
      description: this.description
    };
    // This if controls the Update, Delete and Create functionality
    if (this.data) { 
      if (this.deleteController) { // Delete item
        this.db.collection('items').doc(this.temporalId)
        .delete().then(() => {
          this.onNoClick();
        });  
      } else { // Update item
        this.db.collection('items').doc(this.temporalId)
        .set(this.dataItems).then(() => {
          this.onNoClick();
        }); 
      }
    } else { // Create list item
      this.db.collection('items').add(this.dataItems).then(() => {
        this.onNoClick();
      });
    }
  }
}
