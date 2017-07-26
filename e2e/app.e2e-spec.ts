import { AngularSpotifyPage } from './app.po';

describe('angular-spotify App', () => {
  let page: AngularSpotifyPage;

  beforeEach(() => {
    page = new AngularSpotifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
