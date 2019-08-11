import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';

// Angular Material and Firebase imports
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from '../common/common-reducer/simple.reducer';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let de: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [FormsModule,
        StoreModule.forRoot({ password: simpleReducer }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatTreeModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  // Start tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The string in the icon functionality must start as "more" ', () => {
    expect(component.iconExpandText).toContain('more');
  });

  it('Home page component should have the title of the app in an H1 tag', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Programming Challenge');
  });

  it('The TO DO LIST can not be empty', () => {
    expect(component.items).toBeTruthy();
  });
});
