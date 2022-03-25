import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwtDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return JSON.parse(request.cookies.jwt.split('.')[1]);
  },
);
