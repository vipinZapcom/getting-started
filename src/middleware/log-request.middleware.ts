import {
  Interceptor,
  InvocationContext,
  Next,
  Provider,
  ValueOrPromise,
} from '@loopback/core';

export class LoggingInterceptor implements Provider<Interceptor> {
  value(): ValueOrPromise<Interceptor> {
    throw new Error('Method not implemented.');
  }

  async myInterceptor(context: InvocationContext, next: Next): Promise<any> {
    console.log('Before request is handled', context.args[0]);
    const result = await next();
    console.log('After request is handled');
    return result;
  }
}
//mongodb+srv://vipindixit:aadya_0916@cluster0.pqtzicg.mongodb.net/?retryWrites=true&w=majority
