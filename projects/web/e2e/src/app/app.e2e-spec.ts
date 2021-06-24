import { AppPage } from './app.po';

import { getCurrentRouteUrl } from '../utils/utils';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => (page = new AppPage()));

  it('should redirect to "import" route', () => {
    page.navigateTo();
    expect(getCurrentRouteUrl()).toEqual('import');
  });
});
