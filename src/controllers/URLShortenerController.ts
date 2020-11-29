import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

@Controller('url')
class URLShortenerController {

    public static readonly SUCCESS_MSG = 'the request works';

    @Get('geturl')
    private get(req: Request, res: Response) {
        return res.status(OK).json({message: URLShortenerController.SUCCESS_MSG});
    }

    // @Post('newurl')
    // private add(req: Request, res: Response) {
    //     return res.status(OK).json({message: URLShortenerController.SUCCESS_MSG});
    // }
    
}

export default URLShortenerController;