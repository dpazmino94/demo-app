import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit, Inject, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

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
  // Admin Password 
  password: string;
  constructor(
    public dialogRef: MatDialogRef<any>,
    public db: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  /**
   * This function closes the dialog when there are a click outside the dialog
   *
   * @param {string} [result]
   * @memberof CommonDialogComponent
   */
  onNoClick(result?: string): void {
    this.dialogRef.close(result);
  }

  ngAfterContentInit() {
    if (this.data.title) { // This activates when it is an update dialog
      this.title = this.data.title;
      this.description = this.data.description;
      this.temporalId = this.data.id;
      this.deleteController = this.data.deleteController;
    }
  }

  /**
   * This function saves the data into Firebase
   *
   * @memberof CommonDialogComponent
   */
  saveDataFirebase() {
    // Data model
    this.dataItems = {
      title: this.title,
      description: this.description,
      createdOn: moment().calendar(new Date())
    };
    // This if controls the Update, Delete and Create functionality
    if (this.data.title) { 
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
