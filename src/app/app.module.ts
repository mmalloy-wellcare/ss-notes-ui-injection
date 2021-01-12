import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { EmptyModule, AlertsService, SortService } from '@nextgen/web-care-portal-core-library';
import { NotesInvoiceComponent } from './components/notes-invoice/notes-invoice.component';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatToolbarModule, MatCheckboxModule, MatButtonModule, 
  MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotesInvoiceComponent,
    NotesCollectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    GridModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AppRoutingModule,
    EmptyModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NotesService, 
    AlertsService,
    SortService
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AppComponent,
                    NotesInvoiceComponent,
                    NotesCollectionComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const applicationWebComponent = createCustomElement(AppComponent, { injector: this.injector });
    const notesInvoiceComponent = createCustomElement(NotesInvoiceComponent, {injector: this.injector});
    const notesCollectionComponent = createCustomElement(NotesCollectionComponent, {injector: this.injector});

    customElements.define('ss-notes-ui', applicationWebComponent);
    customElements.define('ss-notes-ui-notes-invoice', notesInvoiceComponent);
    customElements.define('ss-notes-ui-notes-collection', notesCollectionComponent);
  }
}
