import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/shared/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[
  ],
  providers: [HttpService]
})
export class SharedModule { }
