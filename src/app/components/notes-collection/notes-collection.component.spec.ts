import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesCollectionComponent } from './notes-collection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NotesCollectionComponent', () => {
  let component: NotesCollectionComponent;
  let fixture: ComponentFixture<NotesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCollectionComponent ],
      imports: [
        MatCheckboxModule,
        MatToolbarModule,
        GridModule,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
