"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const Saco = require("../src/Server");
const path = require("path");
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const angularCliDemoPath = path.join(__dirname, '../../examples/angular-cli');
const vueCliDemoPath = path.join(__dirname, '../../examples/webpack-vue-cli');
const TESTS_PORT = 3028;
describe('testing basic CRUD operations', () => {
    it('should launch angular-cli example', (done) => {
        let options = { folder: angularCliDemoPath, port: TESTS_PORT, workers: 3 };
        let server = new Saco.Server(options);
        server.start().then(() => {
            chai.request('localhost:' + options.port).get('/').then(res => {
                res.should.have.status(200);
                server.stop().then(() => {
                    done();
                });
            });
        });
    });
    it('should launch webpack-vue-cli example', (done) => {
        let options = { folder: vueCliDemoPath, port: TESTS_PORT };
        let server = new Saco.Server(options);
        server.start().then(() => {
            chai.request('localhost:' + options.port).get('/').then(res => {
                res.should.have.status(200);
                server.stop().then(() => {
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=ExamplesHttpConnectionTest.js.map