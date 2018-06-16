import { DoctorChatbotPage } from './app.po';

describe('doctor-chatbot App', () => {
  let page: DoctorChatbotPage;

  beforeEach(() => {
    page = new DoctorChatbotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
