import { Component } from '@angular/core';
import { SettingsService } from "../../../services/settings.service";
import { MappingModel } from "../../../models/mapping";
import { MappingService } from "../../../services/mapping.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { RowActionModel } from 'src/app/models/row-action';
import { RowResponseModel } from 'src/app/models/row-action response';
import { SecurityService } from 'src/app/services/security.service';
import { MappingModule } from '../mapping.module';
import { MappingFormDialogComponent } from '../mapping-form-dialog/mapping-form-dialog.component';
import { MappingDeteleDialogComponent } from '../mapping-detele-dialog/mapping-detele-dialog.component';
import { environment } from 'src/environments/environment';
import { PlaygroundModule } from '../../playground/playground.module';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.css']
})
export class MappingListComponent {

  columns = ['# id', 'processor', 'mapping data'];
  rowActions = [
    new RowActionModel({
      clazz: 'info-btn',
      event: 'edit',
      icon: 'edit'
    }),
    new RowActionModel({
      clazz: 'danger-btn',
      event: 'delete',
      icon: 'delete'
    })
  ];
  data;
  error: string = '';
  notification = null;

  private host: string;

  constructor(
    private security: SecurityService,
    private settings: SettingsService,
    private service: MappingService,
    private config: ConfigService,
    private router: Router,
    private dialog: MatDialog)
  {
    this.host = this.config.readConfig().host;
    this.security.redirectIfSectionUnavailable(MappingModule.section);
    this.settings.setSection(MappingModule.section);
    this.search();
  }

  search() {
    this.error = '';
    this.service.list().subscribe({
      next: (v) => this.toTableData(v),
      error: (e) => this.error = 'Error: Cannot retrieve mapping list. Try again with refresh button.'
    });
  }

  private addTemporalNotification(msg) {
    this.notification = { type: 'success', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }
  
  private addTemporalErrorNotification(msg) {
    this.notification = { type: 'error', data: msg };
    setTimeout(() => this.notification = null, 10000);
  }
  
  private toTableData(sourceData: any[]) {
    this.data = [];
    sourceData.forEach(s => this.addRowInTable(s));
  }

  private addRowInTable(newData: MappingModel) {
    var d: MappingModel = new MappingModel(JSON.parse(JSON.stringify(newData)));
    if (d.id && (d.id != PlaygroundModule.mappingId && d.id != MappingModule.mappingId)) {
      this.data.push([d.id, d.mappingProcessor, 
        '<a target="_blank" href="' + this.host + '/api/' + d.id + '/data' + '">Get data value</a>']);
    }
    else if (newData.id && (newData.id != PlaygroundModule.mappingId && newData.id != MappingModule.mappingId)) {
      this.data.push([newData.id, newData.mappingProcessor, 
        '<a target="_blank" href="' + this.host + '/api/' + newData.id + '/data' + '">Get data value</a>']);
      // This add event 'onChanges' over the array
      this.data = [].concat(this.data);
    }
  }

  private removeRowInTable(rowId) {
    this.data = this.data.filter(row => row[0] != rowId);
  }

  rowActionSelected(action: RowResponseModel): void {
    if (action.event == 'edit') {
      this.router.navigate(['/mappings/details/' + action.row[0]]);
    }
    else if (action.event == 'delete') {
      this.deleteDialog(action.row[0]);
    }
  }
  
  create() {
    const dialogRef = this.dialog.open(MappingFormDialogComponent, { maxHeight: window.innerHeight + 'px' });
    dialogRef.afterClosed().subscribe((result: MappingModel) => {
      if (result) {
        this.addRowInTable(result);
        this.addTemporalNotification('Mapping "' + result.id + '" added correctly.');
      }
    });
  }

  private deleteDialog(mappingId) {
    const dialogRef = this.dialog.open(MappingDeteleDialogComponent, {
      data: {
        mappingId: mappingId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status == 'ok') {
        this.removeRowInTable(result.data);
        this.addTemporalNotification('Mapping "' + result.data + '" deleted correctly.');
      }
      else if (result && result.status == 'error') {
        this.addTemporalErrorNotification('Mapping "' + result.data + '" deleted correctly.');
      }
    });
  }

}
