'use strict';

import { expect } from 'chai';
import request from 'supertest';
import app from './server';

describe('Redundant returning API', () => {
  describe('#GET /', () => {
    it('Should return the same that we send.', (done) => {
      request(app).get('/?text=hello%20world')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.equal('hello world');

          done();
        });
    });

    it('Should return a 400 bad request.', (done) => {
      // We send a wrong param
      request(app).get('/?wrongParam=hello%20world')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Missing prop \'text\' on body payload and query')

          done();
        });
    });
  });

  describe('#POST /', () => {
    it('Should return the same that we send.', (done) => {
      request(app).post('/')
        .send({ text: 'hello world' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.equal('hello world');

          done();
        });
    });

    it('Should return a 400 bad request.', (done) => {
      request(app).get('/')
        // We don't send any payload
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.be.equal('Missing prop \'text\' on body payload and query')

          done();
        });
    });
  });
});