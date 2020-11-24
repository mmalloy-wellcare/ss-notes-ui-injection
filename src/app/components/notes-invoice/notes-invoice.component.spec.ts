import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotesInvoiceComponent } from './notes-invoice.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { NotesService } from 'src/app/services/notes.service';
import { of, throwError } from 'rxjs';

describe('NotesInvoiceComponent', () => {
  let component: NotesInvoiceComponent;
  let fixture: ComponentFixture<NotesInvoiceComponent>;

  const alertsService: Partial<AlertsService> = {
    showErrorSnackbar() {},
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
      declarations: [ NotesInvoiceComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: AlertsService,
        useValue: alertsService
      }, {
        provide: NotesService,
        useValue: notesService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error snackbar if error is thrown', inject(
    [NotesService, AlertsService], (notesServiceInject, alertsServiceInject) => {
      spyOn(alertsServiceInject, 'showErrorSnackbar');
      spyOn(notesServiceInject, 'getNotes').and.returnValue(throwError({ status: 404 }));

      component.loadNotes({recPrimId: '12' , svcTypeCode: 'ARBILL', tbl: 'INVOICE'});
      expect(alertsServiceInject.showErrorSnackbar).toHaveBeenCalled();
    })
  );

  it('should set recPrimId and load notes data', () => {
    component.loadNotes({recPrimId: component.recPrimId, svcTypeCode: 'ARBILL', tbl: 'INVOICE'});
    expect(component.notesData.length).toEqual(0);
  });
});
