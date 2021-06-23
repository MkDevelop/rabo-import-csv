import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { ImportRoutingModule } from './import.routing.module';
import { ImportComponent } from './import/import.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [ImportComponent],
  imports: [
    CommonModule,
    SharedModule,
    ImportRoutingModule,
    NgxDropzoneModule,
    MatSortModule,
    MatTableModule,
    NgxCsvParserModule
  ]
})
export class ImportModule {}
