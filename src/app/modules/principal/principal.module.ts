import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { principalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    principalRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    CalendarModule,
    DropdownModule,
    TabMenuModule,
    TabViewModule,
  ],
  providers: [DatePipe],
})
export class principalModule {}
