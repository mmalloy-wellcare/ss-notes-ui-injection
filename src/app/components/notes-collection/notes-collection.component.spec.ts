import { async, ComponentFixture, fakeAsync, TestBed, tick, inject } from '@angular/core/testing';
import { NotesCollectionComponent } from './notes-collection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortService, AlertsService } from '@nextgen/web-care-portal-core-library';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { RowClassArgs } from '@progress/kendo-angular-grid';

describe('NotesCollectionComponent', () => {
  let component: NotesCollectionComponent;
  let fixture: ComponentFixture<NotesCollectionComponent>;

  const mockGridData = [
    {
        "NoteSk": "3",
        "NoteTitle": "Calling member",
        "Note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "NoteCatgTypeCode": "Automation02",
        "SendToCallCtrInd": 1,
        "SvcTypeCode": "ARBILL",
        "Tbl": "INVOICE",
        "Fld": "Automation03",
        "RecPrimId": "12",
        "CreatedDate": "2020-09-09",
        "CreatedBy": "bstark@caidan",
        "associatedId": "123456",
        "associatedIdType": "System Assoc",
        "module": "Payments",
        "category": "Credit Memo",
        "loadingType": "System",
        "modifiedDate": "Today",
        "modifiedBy": "Betty Sue",
        "primIdTypeCode": "subscriberId",
        "primId": "827321841"
      },
      {
        "NoteSk": "4",
        "NoteTitle": "Calling member",
        "Note": "Automation02",
        "NoteCatgTypeCode": "Automation02",
        "SendToCallCtrInd": 0,
        "SvcTypeCode": "ARBILL",
        "Tbl": "INVOICE",
        "Fld": "Automation03",
        "RecPrimId": "12",
        "CreatedDate": "2020-09-09",
        "CreatedBy": "bstark@caidan",
        "associatedId": "223456",
        "associatedIdType": "User Assoc",
        "module": "Billing / Payments",
        "category": "Reco",
        "loadingType": "User",
        "modifiedDate": "Yesterday",
        "modifiedBy": "Billy Joe",
        "primIdTypeCode": "subscriberId",
        "primId": "827321841"
      },
      {
        "NoteSk": "5",
        "NoteTitle": "Calling member",
        "Note": "Automation02",
        "NoteCatgTypeCode": "Automation02",
        "SendToCallCtrInd": 1,
        "SvcTypeCode": "ARBILL",
        "Tbl": "INVOICE",
        "Fld": "Automation03",
        "RecPrimId": "12",
        "CreatedDate": "2020-09-09",
        "CreatedBy": "bstark@caidan",
        "associatedId": "213456",
        "associatedIdType": "User Assoc",
        "module": "Billing / Payments",
        "category": "Reco",
        "loadingType": "User",
        "modifiedDate": "Yesterday",
        "modifiedBy": "Billy Joe",
        "primIdTypeCode": "subscriberId",
        "primId": "827321841"
      },
      {
        "NoteSk": "6",
        "NoteTitle": "Calling member",
        "Note": "Payment Processed",
        "NoteCatgTypeCode": "Automation02",
        "SendToCallCtrInd": 0,
        "SvcTypeCode": "ARMGR",
        "Tbl": "INVOICE",
        "Fld": "Automation03",
        "RecPrimId": "12",
        "CreatedDate": "2020-09-09",
        "CreatedBy": "bstark@caidan",
        "associatedId": "323456",
        "associatedIdType": "Multiple",
        "module": "Payments",
        "category": "High Payment Amount",
        "loadingType": "Bulk",
        "modifiedDate": "Today",
        "modifiedBy": "Betty Sue",
        "primIdTypeCode": "subscriberId",
        "primId": "827321841"
      }     
  ];

  const sortService: Partial<SortService> = {
    convertSort() {}
  };
  const alertsService: Partial<AlertsService> = {
    showErrorSnackbar() { },
  };
  const notesService: Partial<NotesService> = {
    getNotesCollection() {
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

  it('should set primId and load notes data', () => {
    component.primId = '827321841';
    component.loadNotes({ primId: component.primId, primIdTypeCode: 'subscriberId', svcTypeCode: 'ALL', tbl: 'ALL'});
    expect(component.gridData.length).toEqual(0);
  });

  describe('toggleSystemNotes', () => {
    it('should toggle row with loading type System', () => {
      component.systemChecked = true;
      component.toggleSystemNotes();
      expect(component.systemChecked).toEqual(false);
    });

    it('should set hidecheckedrow to true when System is checked and loadingType is System', () => {
      testRowCallBack('System');
      component.systemChecked = true;

      function testRowCallBack(loadingType: string) {
        const context = {
          dataItem: {
            loadingType: loadingType
          }
        } as RowClassArgs;
      
      const result = context.dataItem.loadingType === 'System' && !component.systemChecked;
      expect(component.rowCallback(context)['hidecheckedrow']).toEqual(result);
      }
    });
  });

  describe('toggleUserNotes', () => {
    it('should toggle row with loading type User', () => {
      component.userChecked = true;
      component.toggleUserNotes();
      expect(component.userChecked).toEqual(false);
    });

    it('should set hidecheckedrow to true when User is checked and loadingType is User', () => {
      testRowCallBack('User');
      component.userChecked = true;

      function testRowCallBack(loadingType: string) {
        const context = {
          dataItem: {
            loadingType: loadingType
          }
        } as RowClassArgs;
      
      const result = context.dataItem.loadingType === 'User' && !component.systemChecked;
      expect(component.rowCallback(context)['hidecheckedrow']).toEqual(result);
      }
    });

  });

   describe('Search', () => {
    it('should show grid rows containing searchValue', () => {
      component.gridData = mockGridData;
      component.searchValue = "auto";
      component.Search();
      expect(component.gridData.length).toEqual(2);
    });

     it('should show all grid rows when searchValue is erased', () => {
      spyOn(component, 'ngOnInit');
      component.gridData = mockGridData;
      component.searchValue = "";
      component.Search();
      expect(component.gridData.length).toEqual(4);
    });   
  }); 


});
