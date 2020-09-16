const request = require('supertest');
const fs = require('fs');
jest.spyOn(fs, 'writeFile');
const app = require('../app');
const path = require('path');

beforeEach(() => {
    fs.writeFile.mockClear();
});

describe("It's formData form", () => {
    let file = path.resolve(__dirname, '100x300.png');
    test("It's form", done => {
        request(app)
            .post('/form')
            .attach('cv', file)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.result).toBe(true);
                expect(fs.writeFile.mock.calls.length).toBe(1);
                done();
            });
    });
    test("It's form 2", done => {
        request(app)
            .post('/form')
            .attach('cv', file)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.result).toBe(true);
                expect(fs.writeFile.mock.calls.length).toBe(1);
                done();
            });
    });
});