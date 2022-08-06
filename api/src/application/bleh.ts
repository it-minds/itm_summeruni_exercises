import { Injectable, Scope, NestInterceptor, Inject, ExecutionContext, CallHandler, Controller, Get } from "@nestjs/common";
import { Observable } from "rxjs";

interface ITestService {
  data: string;
}

@Injectable({
  scope: Scope.REQUEST
})
export class TestService implements ITestService {
  public data = ""
}


@Injectable()
export class TestInterceptor implements NestInterceptor  {
  constructor(
    @Inject("ITestService")
    private readonly testService: ITestService
  ) {}

  
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    this.testService.data = context.getType();

    return next.handle().pipe();
  }
}

@Controller("test")
export class TestController {
  constructor(
    @Inject("ITestService")
    private readonly testService: ITestService
  ) {}

  @Get()
  async getData(): Promise<string> {
    return this.testService.data;
  }

}