import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'ss-notes-ui-notes-invoice',
  templateUrl: './notes-invoice.component.html',
  styleUrls: ['./notes-invoice.component.scss']
})
export class NotesInvoiceComponent implements OnInit, OnDestroy {

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

  ngOnInit() {
    //passing recPrimId through the router now
    this.sub = this.routes
    .data
    .subscribe( val => {
      this.recId = val;
    });
    this.loadNotes({recPrimId: this.recId , svcTypeCode: 'ARMGR', tbl: 'INVOICE'});
  }

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
