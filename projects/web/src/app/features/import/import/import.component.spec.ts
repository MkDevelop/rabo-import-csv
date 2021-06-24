import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { ImportModule } from '../import.module';
import { ImportComponent, CsvElement } from './import.component';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NoopAnimationsModule,
          ImportModule,
          TranslateModule.forRoot()
        ],
        declarations: [ImportComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should hide table when there is no data', () => {
    // const table = fixture.nativeElement.querySelector('import-table');
    expect(component.files).toHaveSize(0);
    expect(component.csvRecords).toHaveSize(0);
    expect(
      fixture.debugElement.query(By.css('.import-table-container'))
        .nativeElement.style.visibility
    ).toBe('hidden');
  });

  it('should show table when there is data', () => {
    const mockData: CsvElement[] = [
      {
        firstName: 'Hans',
        surName: 'Kazan',
        issueCount: '1',
        dateOfBirth: '01-01-1970'
      },
      {
        firstName: 'Jack',
        surName: 'Ma',
        issueCount: '2',
        dateOfBirth: '01-01-1971'
      }
    ];
    component.csvRecords = mockData;
    fixture.detectChanges();
    expect(component.csvRecords).not.toHaveSize(0);
    expect(
      fixture.debugElement.query(By.css('.import-table-container'))
        .nativeElement.style.visibility
    ).toBe('visible');
  });
});
