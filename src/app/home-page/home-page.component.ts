import { MatDialog } from '@angular/material/dialog';
import { Component, AfterContentInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonDialogComponent } from '../common/common-dialog/common-dialog.component';
import * as moment from 'moment';

interface AdminMode {
  password: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements AfterContentInit {
  // Redux variable state
  password$: Observable<boolean>;
  // Firebase Array Data variables
  items = [];
  idItems = [];
  // Expand variables
  iconExpandText = 'more';
  // Description array variable
  showDescription = [];
  // Admin mode button toggle
  onAdminMode = false;
  constructor(
    public dialog: MatDialog,
    private db: AngularFirestore,
    private store: Store<AdminMode>) {
    // Firebase Data call
    db.collection('items').snapshotChanges().subscribe(data => {
      this.items = [];
      this.idItems = [];
      data.forEach((element, index) => {
        this.items.push(element.payload.doc.data());
        let temporalDate = Date.parse(this.items[index].createdOn)
        this.items[index].createdOn = moment(new Date(temporalDate)).calendar();
        this.idItems.push(element.payload.doc.id);
      });
    });
  }

  ngAfterContentInit() {
    // Observe admin password
    this.password$ = this.store.select('password');
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
      (document.getElementById(i.toString()).innerText == 'expand_more') ?
        'expand_less' : 'expand_more';
    if (this.showDescription[i]) {
      this.showDescription[i] = false;
      this.iconExpandText = 'less'
    } else {
      this.showDescription[i] = true;
      this.iconExpandText = 'more'
    }
  }

  /**
   * This function calls the update and delete functionality dialog
   *
   * @param {number} index
   * @param {string} title
   * @param {string} description
   * @param {boolean} deleteController
   * @memberof HomePageComponent
   */
  updateDeleteCollection(index: number, title: string, description: string, deleteController: boolean) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '250px',
      data: {
        title: title,
        description: description,
        id: this.idItems[index],
        deleteController: deleteController,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The update dialog was closed');
    });
  }

  /**
   * This function calls the Redux State variable to activate the Admin Mode
   *
   * @memberof HomePageComponent
   */
  enterAdminMode(exit: boolean) {
    if (!exit) {
      const dialogRef = this.dialog.open(CommonDialogComponent, {
        width: '300px',
        data: {
          state: true
        }
      });
      dialogRef.afterClosed().subscribe(password => {
        this.onAdminMode = (password === 'admin123')? true: false;
        this.store.dispatch({ type: password });
      });
    } else {
      this.onAdminMode = false;
      this.store.dispatch({ type: 'x' });
    }
  }
}
