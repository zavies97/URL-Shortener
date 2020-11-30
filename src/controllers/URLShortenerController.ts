import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

import URLShortener from './../URLShortener';

@Controller('url')
class URLShortenerController {

    public static readonly SUCCESS_MSG = 'the request works';

    @Get('geturl')
    private get(res: Response) {

        let allURLs = URLShortener.find((err: any, allURLs: any) => {
            if (err) {
                return res.send("Error occured");
            } else {
                return res.send(allURLs);
            }
        } );
        // return res.status(OK).json({message: URLShortenerController.SUCCESS_MSG});
    }
    

    @Post('newurl')
    private async add(req: Request, res: Response) {
        const newURL = new URLShortener(req.body);

        console.log(newURL);

        let generatedUrl;

        function randomString(requiredLength: any, chars: any) {
            var result = '';
            for (var i = requiredLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        while (1) {
            generatedUrl = 'https://pbid.io/' + randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');// random hash that is unique

            let checkUrl = await URLShortener.findOne({ shortenedUrl: generatedUrl});

            if (checkUrl) {
                continue
            } else {
                break
            }
        };

        const newURLObject = new URLShortener({
            shortenedUrl: JSON.stringify(generatedUrl),
            originalUrl: JSON.stringify(req.body)
        })

        newURLObject.save((err: any) => {
            if (err) {
                return res.send(err);
            } else {
                return res.send(newURL);
            }
        })
    }
    
}

export default URLShortenerController;