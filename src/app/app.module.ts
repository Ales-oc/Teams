/** Módulos */
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "src/app/core/shared/shared.module";
import { PublicModule } from "src/app/public/public.module";
import { NgxPaginationModule } from "ngx-pagination";

/** Componentes */
import { AppComponent } from './app.component';

/** Interceptors */
import { TokenInterceptorService } from "src/app/core/shared/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PublicModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      /** Cargamos nuestro interceptor */
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


