import { NgModule } from '@angular/core';

import {
    MdcButtonModule,
    MdcCardModule,
    MdcElevationModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSnackbarModule,
    MdcTabModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcMenuModule,
    MdcSelectModule,
} from '@angular-mdc/web';

import {
  MatMenuModule,
  MatToolbarModule,
  MatDividerModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatCardModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule
} from '@angular/material';

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        MdcButtonModule,
        MdcCardModule,
        MdcElevationModule,
        MdcFormFieldModule,
        MdcIconModule,
        MdcLinearProgressModule,
        MdcListModule,
        MdcRadioModule,
        MdcRippleModule,
        MdcSnackbarModule,
        MdcTabModule,
        MdcTextFieldModule,
        MdcThemeModule,
        MdcToolbarModule,

        MatMenuModule,
        MatDividerModule,
        MatSelectModule,
        MatToolbarModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,

        FlexLayoutModule
    ],
    exports: [
        MdcButtonModule,
        MdcCardModule,
        MdcElevationModule,
        MdcFormFieldModule,
        MdcIconModule,
        MdcLinearProgressModule,
        MdcListModule,
        MdcRadioModule,
        MdcRippleModule,
        MdcSnackbarModule,
        MdcTabModule,
        MdcTextFieldModule,
        MdcThemeModule,
        MdcToolbarModule,
        MdcMenuModule,

        MatMenuModule,
        MatDividerModule,
        MatToolbarModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,

        FlexLayoutModule
    ]
})
export class MaterialDesignModule
{
}
