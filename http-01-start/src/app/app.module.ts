import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestInterceptorService } from './services/test-interceptor-service';
import { SecondInterceptorService } from './services/secondinterceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SecondInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TestInterceptorService, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
