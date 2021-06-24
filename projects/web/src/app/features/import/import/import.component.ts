import { Component, AfterViewInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ViewChild } from '@angular/core';
import { camelCase } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface CsvElement {
  firstName: string;
  surName: string;
  issueCount: string;
  dateOfBirth: string;
}

const CSV_SOURCE: CsvElement[] = [
  {
    firstName: '',
    surName: '',
    issueCount: '',
    dateOfBirth: ''
  }
];

@Component({
  selector: 'anms-import-component',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements AfterViewInit {
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  @ViewChild(MatSort) sort: MatSort;

  files: File[] = [];
  csvRecords: CsvElement[] = [];
  dataSource = new MatTableDataSource(CSV_SOURCE);
  displayedColumns: string[] = [
    'firstName',
    'surName',
    'issueCount',
    'dateOfBirth'
  ];

  constructor(private ngxCsvParser: NgxCsvParser) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  fileChangeListener(event): void {
    const file = event.addedFiles[0];
    if (file.type !== 'text/csv') return;
    this.files.push(...event.addedFiles);
    this.ngxCsvParser
      .parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.csvRecords = this.camelizeKeys(result);
          this.dataSource = new MatTableDataSource(this.csvRecords);
          this.dataSource.sort = this.sort;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.csvRecords = [];
  }

  private camelizeKeys(obj) {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.camelizeKeys(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: this.camelizeKeys(obj[key])
        }),
        {}
      );
    }
    return obj;
  }
}
