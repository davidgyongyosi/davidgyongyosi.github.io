import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorksComponent } from './components/works/works.component';
import { TechComponent } from './components/tech/tech.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    WorksComponent,
    TechComponent,
    NavbarComponent,
    LoaderComponent,
    HeroComponent,
    FeedbacksComponent,
    ExperienceComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
