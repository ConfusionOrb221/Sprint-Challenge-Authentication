const request = require('supertest');

const server = require('./api/server');

const db = require('./database/dbConfig');

beforeEach(async () => {
    await db('users').truncate();
  });
  

describe('Server.js', () => {
    describe('Authenticating', () => {
        it('should return 401 cause were not authorized yet', async () => {
            const expectedStatusCode = 401;

            const response = await request(server).get('/api/jokes');
    
            expect(response.status).toEqual(expectedStatusCode);
        });

        it('should sign in and return 200', async () =>{
            const expectedStatusCode = 200;

            const register = await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'});
            expect(register.status).toEqual(201);

            const response = await request(server).post('/api/auth/login').send({username: 'Nathan1', password: 'password'}).set('Accept', 'application/json');
            expect(response.status).toEqual(expectedStatusCode);

            const response2 = await request(server).get('/api/jokes').set('Authorization', response.body.token);

            expect(response2.status).toEqual(expectedStatusCode);
        });
    });

    describe('Registration', () =>{
        it('Should Register a user with a username and password', async () =>{
            const expectedStatusCode = 201;

            const response = await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'});

            expect(response.status).toEqual(expectedStatusCode)
        })

        it('should return 400 if paramaters not passed', async () => {
            const expectedStatusCode = 400;

            const response = await request(server).post('/api/auth/register')

            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return 400 if paramater is empty string', async () => {
            const expectedStatusCode = 400;

            const response = await request(server).post('/api/auth/register').send({username: '', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        });
    })

    describe('login', () =>{
        it('Should return 200 if provided with valid user and data', async () =>{
            const expectedStatusCode = 200;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login').send({username: 'Nathan1', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        });

        it('Should return 400 if paramaters not passed', async () =>{
            const expectedStatusCode = 400;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login')

            expect(response.status).toEqual(expectedStatusCode);
        })
        it('Should return 400 if paramaters are empty string', async () =>{
            const expectedStatusCode = 400;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login').send({username: '', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        })
    })
});