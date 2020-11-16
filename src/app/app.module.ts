import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { NotesInvoiceComponent } from './components/notes-invoice/notes-invoice.component';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GridModule } from '@progress/kendo-angular-grid';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';

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
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [NotesService, AlertsService],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AppComponent, NotesInvoiceComponent, NotesCollectionComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const applicationWebComponent = createCustomElement(AppComponent, { injector: this.injector });
    const notesInvoiceComponent = createCustomElement(NotesInvoiceComponent, {injector: this.injector});
    const notesCollectionComponent = createCustomElement(NotesCollectionComponent, {injector: this.injector});

    customElements.define('ss-notes-ui', applicationWebComponent);
    customElements.define('ss-notes-ui-notes-invoice-cmpnt', notesInvoiceComponent);
    customElements.define('ss-notes-ui-notes-collection-cmpnt', notesCollectionComponent);
  }
}
