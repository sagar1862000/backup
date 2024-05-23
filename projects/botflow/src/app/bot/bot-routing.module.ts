import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotComponent } from './bot.component';


const routes: Routes = [

  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: BotComponent },

  {
    path: '', component: BotComponent,
    children: [
      { path: 'bot/:id', loadChildren: () => import('./createbot/createbot.module').then(m => m.CreatebotModule) },
      { path: 'intent/:id', loadChildren: () => import('./createintent/createintent.module').then(m => m.CreateintentModule) },
      { path: 'action/:id', loadChildren: () => import('./createaction/createaction.module').then(m => m.CreateactionModule) },
       { path: 'slot/:id', loadChildren: () => import('./createslot/createslot.module').then(m => m.CreateslotModule) }, 
      { path: 'flow/:id', loadChildren: () => import('./createflow/createflow.module').then(m => m.CreateflowModule) }, 
      { path: 'show', loadChildren: () => import('./showbot/showbot.module').then(m => m.ShowbotModule) },
    ]
  }
];;


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotRoutingModule { }
