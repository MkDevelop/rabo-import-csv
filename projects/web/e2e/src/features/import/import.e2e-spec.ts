import { ImportPage } from './import.po';
import { getCurrentRouteUrl } from '../../utils/utils';

describe('Import Page', () => {
  let page: ImportPage;

  beforeEach(() => (page = new ImportPage()));

  it('should display main heading', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Import csv file');
  });
});
