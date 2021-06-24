import { browser, by, element } from 'protractor';

export class ImportPage {
  navigateTo() {
    return browser.get('/import');
  }

  getParagraphText() {
    return element(by.css('h1')).getText();
  }
}
