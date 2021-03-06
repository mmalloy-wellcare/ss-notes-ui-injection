import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'ss-notes-ui-notes-invoice',
  templateUrl: './notes-invoice.component.html',
  styleUrls: ['./notes-invoice.component.scss']
})
export class NotesInvoiceComponent {
  @Input() set recPrimId(recPrimaryId: string) {
    this.recId = `${recPrimaryId}`;
    this.loadNotes({recPrimId: this.recId , svcTypeCode: 'ARMGR', tbl: 'INVOICE'});
  }
  get recPrimId() {
    return this.recId;
  }

  notesLoading;
  notesData;
  private recId;

  constructor(
    private notesService: NotesService,
    private alertsService: AlertsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  loadNotes(customHeader) {
    this.notesLoading = true;
    this.notesService.getNotes('0', [], customHeader).subscribe(res => {
      this.notesData = res.data;
      this.notesLoading = false;
      this.changeDetectorRef.detectChanges();
    }, (error) => {
      this.alertsService.showErrorSnackbar(error);
      this.notesLoading = false;
    });
  }
}
