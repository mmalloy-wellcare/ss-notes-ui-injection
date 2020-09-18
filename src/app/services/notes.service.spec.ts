import { async, TestBed, inject } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '@nextgen/web-care-portal-core-library';
import { of } from 'rxjs';
import { AllRecordsCriteria } from '@nextgen/web-care-portal-core-library/lib/services/data/models/all.records.criteria';
import 'rxjs/add/observable/of';
import { NotesService } from './notes.service';

let dataService: Partial<DataService>;

describe('Notes Service', () => {
  let service: NotesService;

  beforeEach(async(() => {
    dataService = {
      getAllRecords(critera: AllRecordsCriteria) {
        return of({
          data: [],
          restartRowId: '0'
        });
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NotesService,
        {
          provide: DataService,
          useValue: dataService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(inject([NotesService], NotesServiceInject => {
    service = NotesServiceInject;
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });


  it('should load reference data list details', () => {
      const customHeaders = {
        recPrimId: '12' , svcTypeCode: 'ARBILL', tbl: 'INVOICE'
      };

      service.getNotes( '0', [], customHeaders).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
    });
  });
});
