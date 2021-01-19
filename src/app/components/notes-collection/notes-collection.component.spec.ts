import { async, ComponentFixture, fakeAsync, TestBed, tick, inject } from '@angular/core/testing';
import { NotesCollectionComponent } from './notes-collection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortService, AlertsService } from '@nextgen/web-care-portal-core-library';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';

describe('NotesCollectionComponent', () => {
  let component: NotesCollectionComponent;
  let fixture: ComponentFixture<NotesCollectionComponent>;

  const sortService: Partial<SortService> = {
    convertSort() {}
  };
  const alertsService: Partial<AlertsService> = {
    showErrorSnackbar() { },
    showSuccessSnackbar() {}
  };
  const notesService: Partial<NotesService> = {
    getNotes() {
      return of({
        data: []
      });
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCollectionComponent ],
      imports: [
        MatCheckboxModule,
        MatToolbarModule,
        GridModule,
        FormsModule
      ],
      providers: [
        HttpClientTestingModule,
        {
        provide: AlertsService,
        useValue: alertsService
      }, {
        provide: SortService,
        useValue: sortService
      }, {
        provide: NotesService,
        useValue: notesService
      }],
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

  describe('toggleSystemNotes', () => {
    it('should toggle row with loading type System', () => {
      component.systemChecked = true;
      component.toggleSystemNotes();
      expect(component.systemChecked).toEqual(false);
    });
  });

  describe('toggleUserNotes', () => {
    it('should toggle row with loading type User', () => {
      component.userChecked = true;
      component.toggleUserNotes();
      expect(component.userChecked).toEqual(false);
    });

  });

  describe('Search', () => {
    it('should show grid rows containing searchValue', () => {
      component.searchValue = "who";
      component.Search();
      expect(component.gridData.length).toEqual(1);
    });

    it('should show all grid rows when searchValue is erased', () => {
      component.searchValue = "";
      component.Search();
      expect(component.gridData.length).toEqual(3);
    });
  });


});
