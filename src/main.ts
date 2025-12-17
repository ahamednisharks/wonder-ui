import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



// // main.ts (standalone bootstrap)
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     provideRouter(routes)
//   ]
// });
