import { Component, OnDestroy, ChangeDetectorRef, OnInit, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RowClassArgs, SelectableSettings, ColumnSortSettings, GridDataResult, PageChangeEvent, GridComponent as KendoGridComponent } from '@progress/kendo-angular-grid';
import { ScrollableGridComponent, SortService, AlertsService, Template, ValidationService } from '@nextgen/web-care-portal-core-library';
import { NotesCollections } from 'src/app/common/models/notes.model';
import { NotesService } from 'src/app/services/notes.service';
import { TemplatesService } from '../../services/templates.service';

@Component({
  selector: 'ss-notes-ui-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NotesCollectionComponent extends ScrollableGridComponent implements OnInit, OnDestroy {
  @HostBinding('class.web-component-flex') webComponentFlex = true;

  private tmpltTypeCodeInput: string;

  @Input() set tmpltTypeCode(id: string) {
    this.tmpltTypeCodeInput = id;
    this.restartRowId = '0';
    this.loadGridData();
  }

  get tmpltTypeCode(): string {
    return this.tmpltTypeCodeInput;
  }


  notes: NotesCollections[] = [];
  public gridData = this.notes;

  notesLoading;
  notesData;
  sub;

  expandedHistoryMap = new Map();
  formGroup: FormGroup;
  editModeRowIndex: number;

  savingEntry;
  isArchive = false;

  private cellHeight = 43;
  private headerHeight = 53;
  private gridBuffer = 70;

  public pageSize = this.notes.length;
  public gridHeight = (this.pageSize * this.cellHeight) + this.headerHeight + this.gridBuffer;

  systemChecked = true;
  userChecked = true;

  searchValue: any;

constructor(
  public alertsService: AlertsService,
  public templatesService: TemplatesService,
  public sortService: SortService,
  public dialog: MatDialog,
  private changeDetectorRef: ChangeDetectorRef,
  //private validationService: ValidationService,
  private notesService: NotesService
) {
  super(sortService, alertsService);
  console.log("Complete Super Constructor");
/*   this.listsService.getListDetails('State', '0', [{ property: 'DisplayName', direction: 'asc' }]).subscribe((response) => {
    this.statesOptions = response.data;
  }); */
}

ngOnInit() {
 /*   this.notesData = [{
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
}]; */
 

  this.loadNotes({});
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
      return res.Note.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.associatedId.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.associatedIdType.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.module.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.category.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.NoteTitle.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.loadingType.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.CreatedBy.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()) ||
             res.modifiedBy.toLocaleLowerCase().match(this.searchValue.toLocaleLowerCase()); 
    }); 
  }else{
    this.ngOnInit();
  }

}

loadNotes(customHeader) {
  this.notesLoading = true;
  this.notesService.getNotesCollection('0', [], customHeader).subscribe(res => {
    this.notes = res.data;
    this.gridData = this.notes;
    this.pageSize = this.notes.length;
    this.gridHeight = (this.pageSize * this.cellHeight) + this.headerHeight + this.gridBuffer;
    this.notesLoading = false;
    this.changeDetectorRef.detectChanges();
  }, (error) => {
    this.alertsService.showErrorSnackbar(error);
    this.notesLoading = false;
  });
}

ngOnDestroy() {
  //this.sub.unsubscribe();
}


//New Record (Editable Row)

 toggleHistoryRow(rowIndex: number, dataItem: NotesCollections) {
/*   const TmpltDataSrchSK = dataItem.TmpltDataSrchSK;

  if (this.expandedHistoryMap.get(TmpltDataSrchSK)) {
    this.kendoGrid.collapseRow(rowIndex);
    this.expandedHistoryMap.delete(TmpltDataSrchSK);
  } else {
    this.kendoGrid.expandRow(rowIndex);
    this.expandedHistoryMap.set(TmpltDataSrchSK, true);
  } */
} 

/*  retoggleHistoryRows() {
  this.gridData.forEach((data, index) => {
    if (this.expandedHistoryMap.get(data.TmpltDataSrchSK)) {
      this.kendoGrid.expandRow(index);
    } else {
      this.kendoGrid.collapseRow(index);
    }
  });
}  */

getNotesTemplate(formValues: any, record: NotesCollections) {
  return {
    TmpltTypeCode: this.tmpltTypeCode,
    NoteSk: record.NoteSk,
    NoteTitle: formValues.NoteTitle,
    Note: formValues.Note,
    NoteCatgTypeCode: record.NoteCatgTypeCode,
    SendToCallCtrInd: record.SendToCallCtrInd,
    SvcTypeCode: record.SvcTypeCode,
    Tbl: record.Tbl,
    Fld: record.Fld,
    RecPrimId: record.RecPrimId,
    CreatedDate: record.CreatedDate,
    CreatedBy: record.CreatedBy,
    associatedId: record.associatedId,
    associatedIdType: record.associatedIdType,
    module: formValues.module,
    category: record.category,
    loadingType: record.loadingType,
    modifiedDate: record.modifiedDate,
    modifiedBy: record.modifiedBy
  };
}

getUpdateData(formValues: any, record: NotesCollections) {
  const updateData = [];
  //const title = Array.isArray(formValues.NoteTitle) ? formValues.NoteTitle : [formValues.NoteTitle];
  //const mod = Array.isArray(formValues.module) ? formValues.module : [formValues.module];
  //const note = Array.isArray(formValues.Note) ? formValues.Note : [formValues.Note];
  let updateChecked: boolean;


      // create or update config template based on records
  updateData.push(this.getNotesTemplate(formValues, (updateChecked ? null : record)));

  return updateData;
}

getAddTemplateObservable(notesTemplates: Array<Template>, idempotencyKey) {
  return this.templatesService.addNewTemplate(this.tmpltTypeCode, notesTemplates, idempotencyKey);
}

getUpdateTemplateObservable(notesTemplates: Array<Template>, idempotencyKey) {
  return this.templatesService.editTemplate(this.tmpltTypeCode, notesTemplates, idempotencyKey);
}

getTemplateObservables(notesTemplates: Array<Template>, idempotencyKey) {
  const observables = [];
  const addTemplates = notesTemplates.filter(template => !!!template.TmpltDataSrchSK);
  const updateTemplates = notesTemplates.filter(template => !!template.TmpltDataSrchSK);

  observables.push({
    observable: this.getUpdateTemplateObservable(updateTemplates, idempotencyKey),
    type: 'edit'
  });

  if (!!addTemplates.length) {
    observables.push({
      observable : this.getAddTemplateObservable(addTemplates, idempotencyKey),
      type: 'add'
    });
  }
  return observables;
}

onSaveEntry(rowIndex: number, record: NotesCollections) {
  this.formGroup.enable();
  const notesTemplates = this.getUpdateData(this.formGroup.value, record);
  const updateObservables: Array<any> = this.getTemplateObservables(notesTemplates, this.formGroup.get('idempotencyKey').value);
  let actionType: string;
  this.savingEntry = true;

/*   if (this.newRecord) {
    this.getAddTemplateObservable(configTemplates, this.formGroup.get('idempotencyKey').value).subscribe((templates) => {
      this.onSuccess(templates, rowIndex);
    }, (error) => {
      this.alertsService.showErrorSnackbar(error);
      this.updateFormValidity();
      this.savingEntry = false;
    });
  } else {
    from(updateObservables).pipe(concatMap(updateObj => {
      actionType = updateObj.type;
      return updateObj.observable;
    }), map((data: Array<Template>) => {
      return { actionType, data };
    })).subscribe(
      (response) => {
       const templates = this.templatesService.flattenResponse(response.data);
       if (actionType === 'edit') {
          this.gridData[rowIndex] = templates[0];
        } else {
          templates.forEach(template => {
            this.gridData.unshift({});
            this.gridData[0] = template;
          });
        }
      },
      (error) => {
        this.alertsService.showErrorSnackbar(error);
        this.updateFormValidity();
        this.savingEntry = false;
      },
      () => {
        // once all subscriptions are completed, close edit mode on all rows
        this.closeSingleRowEdit(rowIndex, true);
        this.savingEntry = false;
      }
    );
  } */
}

openSingleRowEdit(rowIndex: number, addMode?: boolean) {
   if (addMode) {
    //this.gridData.unshift({});
    //this.retoggleHistoryRows();
  } else {
    //this.kendoGrid.collapseRow(rowIndex);
    //this.expandedHistoryMap.delete(this.gridData[rowIndex].TmpltDataSrchSK);
  } 

  this.formGroup = undefined;
  this.initializeFormGroup(rowIndex);
  this.newRecord = addMode;
  this.gridEditMode = true;
  this.editModeRowIndex = rowIndex;
  this.originalGridData = [...this.gridData]; 
  this.kendoGrid.editRow(rowIndex, this.formGroup);

}

initializeFormGroup(rowIndex: number) {
  const record = this.gridData[rowIndex];
  this.formGroup = null;
  this.formGroup = new FormGroup({
    NoteTitle: new FormControl(record.NoteTitle),
    module: new FormControl([record.module]),
    category: new FormControl([record.category]),
    SendToCallCtrInd: new FormControl([record.SendToCallCtrInd]),
    loadingType: new FormControl([record.loadingType]),
    Note : new FormControl([record.Note])
  });
}

checkForm(rowIndex: number) {
  if (this.formGroup.pristine) {
    this.closeSingleRowEdit(rowIndex, false);
  } /* else {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30rem',
      disableClose: true,
      data: {
        confirmTitle: 'Exit Confirmation',
        confirmText: 'You have unsaved changes that will be lost. Are you sure you want to exit?'
      }
    });

    dialogRef.afterClosed().subscribe(close => {
      if (close) {
        this.closeSingleRowEdit(rowIndex, false);
      }
    });
  } */
}

closeSingleRowEdit(rowIndex: number, updateAction: boolean) {
  this.kendoGrid.closeRow(rowIndex);

  // if action is not update, revert data data back to original grid data before edit
  if (!updateAction) {
    this.gridData = this.originalGridData;
  }

  if ((this.gridData.length === 0) || (Object.keys(this.gridData[0]).length === 0)) {
    this.gridData.shift();
  }

  this.gridEditMode = false;
  this.editModeRowIndex = null;
  this.disableEditButtons = false;
  this.idempotencyKey = null;
  this.gridDataForm.markAsPristine();
  this.gridLoading = false;
}


}



