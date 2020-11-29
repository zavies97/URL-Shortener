import MainServer from './src/server';

// Start the server or run tests
if (process.argv[2] !== 'test') {
    let server = new MainServer();
    server.start(3000);
}