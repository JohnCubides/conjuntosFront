import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitstableComponent } from './bitstable/bitstable.component';
import { BitspaginatorComponent } from './bitspaginator/bitspaginator.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BitsiconComponent } from './utils/bitsicon/bitsicon.component';
import { BitsbuttonComponent } from './utils/bitsbutton/bitsbutton.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToggleSwichComponent } from './toggle-swich/toggle-swich.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalNotificationComponent } from './modal-notification/modal-notification.component';
import { SearchNumberComponent } from './utils/search-number/search-number.component';
import { FilterComponent } from './filter/filter.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StatefilterComponent } from './statefilter/statefilter.component';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    BitstableComponent,
    BitspaginatorComponent,
    BitsiconComponent,
    BitsbuttonComponent,
    ModalComponent,
    BitsbuttonComponent,
    BitsiconComponent,
    ToggleSwichComponent,
    ModalNotificationComponent,
    SearchNumberComponent,
    FilterComponent,
    AutocompleteComponent,
    BreadcrumbComponent,
    StatefilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    BitstableComponent,
    BitspaginatorComponent,
    BitsiconComponent,
    BitsbuttonComponent,
    ModalComponent,
    BitsbuttonComponent,
    BitsiconComponent,
    ToggleSwichComponent,
    ModalNotificationComponent,
    SearchNumberComponent,
    FilterComponent,
    AutocompleteComponent,
    BreadcrumbComponent,
    StatefilterComponent,
    TranslateModule,
  ]
})
export class SharedsModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
  }}
