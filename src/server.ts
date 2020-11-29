import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// import DemoController, * as controllers from './controllers/DemoController';
import URLShortenerController, * as controllers from './controllers/URLShortenerController'
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class MainServer extends Server {

    private readonly SERVER_START_MSG = 'Server started on port: ';
    private readonly DEV_MSG = 'Express Server is running in development mode. ' +
        'No front-end content is being served.';

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        super.addControllers(new URLShortenerController());
        // Point to front-end code
        if (process.env.NODE_ENV !== 'production') {
            const msg = this.DEV_MSG + process.env.EXPRESS_PORT;
            this.app.get('*', (req, res) => res.send(msg));
            // this.app.post('*', (req, res) => res.send(msg));
        }
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
    }
}

export default MainServer;