import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewjobComponent } from './newjob/newjob.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { AllRoundPageComponent } from './all-round-page/all-round-page.component';
import { AppComponent } from './app.component';

// const routes: Routes = [
//   { path: 'home/:demoId', component: NewjobComponent },
//   { path: 'startingpage' , component: StartingPageComponent },
//   { path: 'allroundpage' , component: AllRoundPageComponent }
// ];

// const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent,
//     children: [
//       { path: 'startingpage', component: StartingPageComponent }
//     ]
//   }
// ];
console.log('hello');
const routes: Routes = [
  {
    path: '',
    redirectTo: 'startingPage',
    pathMatch: 'full',
  },
  {
    path: 'startingPage',
    component: StartingPageComponent
  },
  {
    path: 'journeyCycle/:demoId',
    component: NewjobComponent
  },
  {
    path: 'allRoundData',
    component:AllRoundPageComponent
  }
];

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   redirectTo: 'startingpage',
//   //   pathMatch: 'full',
//   // },
//   {
//     path: '', component: StartingPageComponent,
//   }
// ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    console.log('routing module loaded 11111');
  }
}
