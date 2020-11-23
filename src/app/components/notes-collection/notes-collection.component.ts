import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SelectableSettings, GridComponent as KendoGridComponent, ColumnSortSettings } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { NotesCollections } from 'src/app/common/models/notes.model';

@Component({
  selector: 'ss-notes-ui-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss']
})

export class NotesCollectionComponent implements OnInit {
  notes: NotesCollections[] = [];
  public gridData = this.notes;

  private cellHeight = 43;
  private headerHeight = 53;
  private gridBuffer = 70;

  public pageSize = 3; //notes.length
  public gridHeight = (this.pageSize * this.cellHeight) + this.headerHeight + this.gridBuffer;

  systemChecked = true;
  userChecked = true;

  searchValue: any;

constructor() {
}

ngOnInit() {
  this.notes = [{
    "details": "These are the notes deatails.",
    "history": "",
    "noteId": "1",
    "associatedId": "123456",
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
    "details": "Or is it notes history?",
    "history": "",
    "noteId": "2",
    "associatedId": "223456",
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
    "details": "Who knows!",
    "history": "",
    "noteId": "3",
    "associatedId": "323456",
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

  this.gridData = this.notes;
}

toggleSystemNotes() {
  this.systemChecked = !this.systemChecked;
}

toggleUserNotes() {
  this.userChecked = !this.userChecked;
}

public rowCallback = (context: RowClassArgs) => {
  return {
    hidecheckedrow: (context.dataItem.loadingType === 'System' && !this.systemChecked)
                    || (context.dataItem.loadingType === 'User' && !this.userChecked)
  };
}

Search() {
  if(this.searchValue != ""){
    this.gridData = this.gridData.filter(res => {
      return res.details.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.associatedId.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.associatedIdType.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.module.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.category.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.title.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.loadingType.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.createdBy.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.modifiedBy.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase());
    });
  }else if(this.searchValue == ""){
    this.ngOnInit();
  }

}


}



