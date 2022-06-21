// Angular Imports
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import {MarketplaceListComponent} from "./marketplace-list/marketplace-list.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";
import {MatDialogModule} from '@angular/material/dialog';
import { MarketplaceFormDialogComponent } from './marketplace-form-dialog/marketplace-form-dialog.component';

// This Module's Components
const routes: Routes = [
  { path: '', component: MarketplaceListComponent },
];

@NgModule({
  imports: [
    MatDialogModule,
    MatCardModule,
    LayoutsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatLineModule
  ],
    declarations: [
      MarketplaceListComponent,
      MarketplaceFormDialogComponent,
    ],
    exports: [
        RouterModule,
    ]
})
export class MarketplaceModule {}