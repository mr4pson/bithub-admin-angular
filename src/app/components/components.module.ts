import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CCheckBoxComponent } from './check-box/check-box.component';
import { CHeaderComponent } from './header/header.component';
import { CSidebarComponent } from './sidebar/sidebar/sidebar.component';
import { CMonitorComponent } from './monitor/monitor.component';
import { CPaginationComponent } from './pagination/pagination.component';
import { CImagePickerComponent } from './images/image-picker/image-picker.component';
import { CImageViewerComponent } from './images/image-viewer/image-viewer.component';
import { CRadioByEntityComponent } from './radio/radio-by-entity/radio-by-entity.component';
import { CRadioByIdComponent } from './radio/radio-by-id/radio-by-id.component';
import { CExtraEditorComponent } from './extra-editor/extraeditor.component';
import { CMenubtnProfileComponent } from './menubtn/profile/menubtn-profile.component';
import { CClockComponent } from './clock/clock.component';
import { CSelectSimpleComponent } from './selects/select-simple/select-simple.component';
import { CFilePickerComponent } from './files/file-picker/file-picker.component';
import { CFileLinkComponent } from './files/file-link/file-link.component';
import { CSelectMultipleComponent } from './selects/select-multiple/select-multiple.component';
import { CTextEditor } from './text-editor/text-editor.component';
import { CTimestampPickerComponent } from './dates/date-pickers/timestamp-picker/timestamp-picker.component';
import { CDatePickerComponent } from './dates/date-pickers/date-picker/date-picker.component';
import { CTimePickerComponent } from './dates/time-picker/time-picker.component';
import { CPipesModule } from '../pipes/pipes.module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CColorInputComponent } from './colors/color-input/color-input.component';
import { CColorPickerComponent } from './colors/color-picker/color-picker.component';
import { CPanelSelectComponent } from './panels/panel-select/panel-select.component';
import { CSidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { CFileListComponent } from './files/file-list/file-list.component';
import { CDirectivesModule } from '../directives/directives.module';
import { CFileListItemComponent } from './files/file-list/file-list-item/file-list-item.component';
import { CYearPickerComponent } from './dates/year-picker/year-picker.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CStatsUsersMonthlyComponent } from './stats/users.monthly/stats.users.monthly.component';
import { CStatsCatsComponent } from './stats/cats/stats.cats.component';
import { CStatsInordersComponent } from './stats/inorders/stats.inorders.component';
import { CStatsTotalsComponent } from './stats/totals/stats.totals.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,        
        EditorModule,
        ColorSketchModule,
        CPipesModule,
        CDirectivesModule,
    ],
    declarations: [     
        CSidebarComponent,  
        CSidebarMenuComponent,
        CHeaderComponent,
        CCheckBoxComponent,            
        CTimePickerComponent,
        CTimestampPickerComponent,
        CDatePickerComponent,
        CYearPickerComponent,
        CMonitorComponent,
        CPaginationComponent,
        CFilePickerComponent,
        CFileLinkComponent,
        CFileListComponent,
        CFileListItemComponent,
        CImagePickerComponent,
        CImageViewerComponent,
        CRadioByEntityComponent,
        CRadioByIdComponent,
        CExtraEditorComponent,
        CTextEditor,
        CMenubtnProfileComponent,
        CClockComponent,
        CSelectSimpleComponent,       
        CSelectMultipleComponent,  
        CColorInputComponent,
        CColorPickerComponent,
        CPanelSelectComponent,    
        CStatsUsersMonthlyComponent,    
        CStatsCatsComponent,
        CStatsInordersComponent,
        CStatsTotalsComponent,
    ],
    exports: [   
        CSidebarComponent,
        CHeaderComponent,      
        CCheckBoxComponent,     
        CTimePickerComponent,   
        CTimestampPickerComponent,
        CDatePickerComponent,
        CYearPickerComponent,
        CMonitorComponent,  
        CPaginationComponent,    
        CFilePickerComponent,
        CFileLinkComponent,
        CFileListComponent,
        CFileListItemComponent,
        CImagePickerComponent, 
        CImageViewerComponent,
        CRadioByEntityComponent,
        CRadioByIdComponent,
        CExtraEditorComponent,
        CTextEditor,
        CMenubtnProfileComponent,
        CClockComponent,
        CSelectSimpleComponent,               
        CSelectMultipleComponent,  
        CColorInputComponent,
        CColorPickerComponent,
        CPanelSelectComponent,     
        CStatsUsersMonthlyComponent,  
        CStatsCatsComponent,
        CStatsInordersComponent,
        CStatsTotalsComponent,
    ],    
})
export class CComponentsModule {}
