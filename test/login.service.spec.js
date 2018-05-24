const expect = require('chai').expect;
const nock = require('nock');
const _AppConfig = require('../config');
const _LoginService = require('../login/login.service');


describe('User Detail -> ', () => {
  beforeEach(() => {
    nock(_AppConfig.UserModelConfig.baseURL)
    .post(_AppConfig.UserModelConfig.Routes.fetchUser)
    .reply(200, {user: "I am the user"});
  });

  it('Fetch User', () => {
    return _LoginService.fetchUserDetails(_AppConfig.UserModelConfig.baseURL, _AppConfig.UserModelConfig.Routes.fetchUser)
    .then(res => {
      expect(typeof res).to.equal('object');
      expect(res.user).to.equal('I am the user')
    })
  })
}); 