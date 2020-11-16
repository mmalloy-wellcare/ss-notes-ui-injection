import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SelectableSettings, GridComponent as KendoGridComponent, ColumnSortSettings } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'ss-notes-ui-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss']
})
export class NotesCollectionComponent implements OnInit {

  public pageSize = 3;

  private data = [{
    "plus": "",
    "history": "",
    "noteId": 1,
    "associatedId": 123456,
    "associatedIdType": "System Assoc",
    "module": "Payments",
    "category": "Credit Memo",
    "title": "Pending Another Department",
    "sendToCallCenter": "Yes",
    "loadingType": "System",
    "system": true,
    "creationDate": "Today",
    "createdBy": "Billy Joe",
    "modifiedDate": "Today",
    "modifiedBy": "Betty Sue"
  }, {
    "plus": "",
    "history": "",
    "noteId": 2,
    "associatedId": 223456,
    "associatedIdType": "User Assoc",
    "module": "Billing / Payments",
    "category": "Reco",
    "title": "Correspondence Required",
    "sendToCallCenter": "No",
    "loadingType": "User",
    "user": true,
    "creationDate": "Yesterday",
    "createdBy": "Billy Bob",
    "modifiedDate": "Yesterday",
    "modifiedBy": "Billy Joe"
  }, {
    "plus": "",
    "history": "",
    "noteId": 3,
    "associatedId": 323456,
    "associatedIdType": "Multiple",
    "module": "Payments",
    "category": "High Payment Amount",
    "title": "Workflow Status Pending",
    "sendToCallCenter": "Yes",
    "loadingType": "Bulk",
    "creationDate": "Today",
    "createdBy": "Sally Mae",
    "modifiedDate": "Today",
    "modifiedBy": "Betty Sue"
}];


public gridData = this.data;

systemChecked = true;
user = true;

includeSystemRows: boolean;
restartRowId = '0';

constructor() {
  //this.loadNotes();
}

ngOnInit() {
}

/*   public pageChange(event: PageChangeEvent): void{
  this.skip = event.skip;
  this.loadNotes();
} */
/* 
private loadNotes(): void{
  this.gridView = {
    data: this.data.slice(this.skip, this.skip + this.pageSize),
    total: this.data.length
  };
} */

loadGridData() {
  const savedRestartRowId = this.restartRowId || '0';
  //this.gridLoading = true;

/*    this.billingPeriodsService.getBillingPeriods(
    this.accountData.AccountID, savedRestartRowId, this.includeVoidedRows,)
    .subscribe(response => {
      this.processGridData(response.data);
      this.saveGridRows();
    },
  (error) => {
    this.alertsService.showErrorSnackbar(error);
    this.gridLoading = false;
  }); */
}

resetGridData() {
  //this.gridView = null;
}

toggleSystemNotes() {
  this.systemChecked = !this.systemChecked;
/*     this.includeSystemRows = !this.includeSystemRows;
  this.restartRowId = '0';
  this.resetGridData();
  this.loadGridData(); */
}

toggleUserNotes() {
  this.user = !this.user;
}


}



