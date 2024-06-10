import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

module.exports = {
    setupFiles: ['./jest.setup.js'],
};