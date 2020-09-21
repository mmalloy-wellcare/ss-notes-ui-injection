import { Injectable } from '@angular/core';
import { Sort } from '@nextgen/web-care-portal-core-library';
import { DataService } from '@nextgen/web-care-portal-core-library';

@Injectable()
export class NotesService {
  private pageSize = 100;
  private notesURI = 'shared-services/ss-notes/v1/ss/notes';

  constructor(private dataService: DataService) { }

  public getNotes(restartRowId: string, sort: Array<Sort>, customHeaders) {
    return this.dataService.getAllRecords(this.notesURI, this.pageSize, restartRowId, sort, customHeaders);
  }
}
