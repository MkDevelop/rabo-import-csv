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
const ABC: CsvElement[] = [
  {
    firstName: '',
    surName: '',
    issueCount: '',
    dateOfBirth: ''
  },
  {
    firstName: '',
    surName: '',
    issueCount: '',
    dateOfBirth: ''
  },
  {
    firstName: '',
    surName: '',
    issueCount: '',
    dateOfBirth: ''
  }
];
@Component({
  selector: 'import-component',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements AfterViewInit {
  constructor(private ngxCsvParser: NgxCsvParser) {}

  files: File[] = [];
  csvRecords: CsvElement[] = [];
  dataSource = new MatTableDataSource(ABC);
  displayedColumns: string[] = [
    'firstName',
    'surName',
    'issueCount',
    'dateOfBirth'
  ];

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  fileChangeListener(event): void {
    const file = event.addedFiles[0];
    this.files.push(...event.addedFiles);
    if (file.type !== 'text/csv') return;
    this.ngxCsvParser
      .parse(file, { header: true, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          console.log('Result', this.camelizeKeys(result));
          this.csvRecords = this.camelizeKeys(result);
          this.dataSource = new MatTableDataSource(this.csvRecords);
          console.log(this.sort);
          this.dataSource.sort = this.sort;
          console.log(this.csvRecords);
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
}
