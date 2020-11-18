import { NgModule, APP_INITIALIZER, Injector  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationService, EmptyComponent } from '@nextgen/web-care-portal-core-library';
import { NotesInvoiceComponent } from './components/notes-invoice/notes-invoice.component';
import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';

const routes: Routes = [{
  path: 'ss-notes-ui/notes-invoice',
  component: NotesInvoiceComponent
},
{
  path: 'ss-notes-ui/notes-collection',
  component: NotesCollectionComponent
},
{
  path: '**',
  component: EmptyComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: ConfigurationService.configurationServiceFactory,
    deps: [Injector],
    multi: true
  }]
})
export class AppRoutingModule { }
