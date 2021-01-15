import { Component, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'ss-notes-ui-notes-invoice',
  templateUrl: './notes-invoice.component.html',
  styleUrls: ['./notes-invoice.component.scss']
})
export class NotesInvoiceComponent implements OnDestroy {
  @Input() set recPrimId(recPrimaryId: string) {
    this.recId = `${recPrimaryId}`;
    this.loadNotes({recPrimId: this.recId , svcTypeCode: 'ARMGR', tbl: 'INVOICE'});
  }

  notesLoading;
  notesData;
  private recId;
  sub;

  constructor(
    private notesService: NotesService,
    private alertsService: AlertsService,
    private changeDetectorRef: ChangeDetectorRef,
    private routes: ActivatedRoute
  ) { }

  get recPrimId() {
    return this.recId;
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
