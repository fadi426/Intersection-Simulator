import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldComponent } from './world/world.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StompService],
  bootstrap: [AppComponent]
})
export class AppModule { }
