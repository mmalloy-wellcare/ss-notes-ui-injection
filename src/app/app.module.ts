import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { NotesInvoiceComponent } from './components/notes-invoice/notes-invoice.component';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertsService } from '@nextgen/web-care-portal-core-library';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    NotesInvoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [NotesService, AlertsService],
  bootstrap: [],
  entryComponents: [AppComponent, NotesInvoiceComponent]
})


export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const applicationWebComponent = createCustomElement(AppComponent, { injector: this.injector });
    const notesInvoiceComponent = createCustomElement(NotesInvoiceComponent, {injector: this.injector});

    customElements.define('ss-notes-ui', applicationWebComponent);
    customElements.define('ss-notes-ui-notes-invoice-cmpnt', notesInvoiceComponent);
}
}
