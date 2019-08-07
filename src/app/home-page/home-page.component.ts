import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from './../common/common-dialog/common-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  // Firebase Data
  items: any;
  // Expand variables
  iconExpandText = 'more'; 
  showDescription = [];

  constructor(public dialog: MatDialog, db: AngularFirestore) {
    // Firebase Data call
    db.collection('items').valueChanges().subscribe(data => {
      console.log(data);
      this.items = data;
    });
  }

  /**
   * This opens the common dialog
   *
   * @memberof HomePageComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * This expands the description in the list
   *
   * @memberof HomePageComponent
   */
  expandDescription(i: number) {
    document.getElementById(i.toString()).innerText = 
    (document.getElementById(i.toString()).innerText  == 'expand_more') ? 
    'expand_less' : 'expand_more';
    if (this.showDescription[i]) {
      this.showDescription[i] = false;
      this.iconExpandText = 'less'
    } else {
      this.showDescription[i] = true;
      this.iconExpandText = 'more'
    }
  }

}
