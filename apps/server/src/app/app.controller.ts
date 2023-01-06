import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/login')
  public createUser(@Res({ passthrough: true }) res: Response) {
    const inAMonth = new Date();
    inAMonth.setDate(inAMonth.getDate() + 30);
    res.cookie('session', 'test', {
      httpOnly: true,
      expires: inAMonth,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).send();
  }

  @Get('/protected')
  public protectedEndpoint(@Req() req: Request, @Res() res: Response) {
    if (!req.cookies.session) {
      res.status(401).send();
    }
    res.status(200).send({ authenticated: true });
  }
}
