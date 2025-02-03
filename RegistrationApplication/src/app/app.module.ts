import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/modules/shared.module';
import { AuthModule } from 'src/features/auth/modules/auth/auth.module';
import { HeaderComponent } from '../features/auth/components/header/header.component';
import { FooterComponent } from '../features/auth/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule, 
    ReactiveFormsModule
  ],
  providers: [],
  exports:[BrowserModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
