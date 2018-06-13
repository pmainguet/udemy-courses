const request = require('supertest');
const expect = require('expect')
const app = require('./server.js').app;

describe('Server tests', () => {
    it('should return hello world', (done) => {
        request(app)
            .get('/')
            .expect((res) => {
                expect(res.text).toBeA('string');
            })
            .expect('Content-Type', /html/)
            .expect(200)
            .end(done);
    })
});