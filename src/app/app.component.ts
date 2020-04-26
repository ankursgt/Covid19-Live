import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../assets/CanvasJS/canvasjs.min';
import { DataService } from './data.service';
import { ViewEncapsulation } from '@angular/core';
 
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [DataService]
})
 
export class AppComponent {}