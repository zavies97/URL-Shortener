import { ClassMiddleware, Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

import URLShortener from './../URLShortener';
import {  addURL, getOneUrl, getAllUrl } from './../../src/handlers/URLShortenerHandler';

import * as cors from 'cors';

@Controller('url')
@ClassMiddleware(cors())
class URLShortenerController {

    public static readonly SUCCESS_MSG = 'The request works';

    @Get('geturl')
    private async get(req: Request, res: Response) {

        let allURLs = await getAllUrl();

        return res.status(200).json({message: allURLs});
    }
    
    @Post('newurl')
    private async add(req: Request, res: Response) {

        console.log(req.body);

        let generatedUrl;

        function randomString(requiredLength: any, chars: any) {
            let result = '';
            for (let i = requiredLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        while (1) {
            generatedUrl = 'https://pbid.io/' + randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

            let checkUrl = await getOneUrl({shortenedUrl: generatedUrl});

            if (checkUrl) {
                continue;
            } else {
                break;
            }
        };

        const newURLObject = new URLShortener({
            shortenedUrl: JSON.stringify(generatedUrl),
            originalUrl: req.body.originalUrl
        })

        await addURL(newURLObject)

        return res.status(200).json({message: 'Added'});
    }
    
}

export default URLShortenerController;