import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { SourcesService } from '../_services/sources.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public file: any;
  arrayBuffer: any;
  private fileContent: any;
  public errorMessage = '';

  constructor(private sourcesService: SourcesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  addfile(event: any) {
    this.file= event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];  
      this.fileContent = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      console.log(this.fileContent);
    }    
  } 

  sendFile() {
    if (this.fileContent && this.fileContent.length > 0 
      && this.fileContent[0].category && this.fileContent[0].description 
      && this.fileContent[0].source_link && this.fileContent[0].unity
      && this.fileContent[0].value && this.fileContent[0].form_name
      && this.fileContent[0].masse && this.fileContent[0].temps) {
      this.sourcesService.importFile(this.fileContent).subscribe((data) => {
        console.log(data);
      }, (err) => {
        console.log(err)
      })
    } else {
      this.errorMessage = 'Wrong file';
    }
  }

  exportSources() {
    this.sourcesService.allIndices().subscribe((data: any) => {
      if (data.status === true) {
        console.log(data);
        const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(data.indices);
     
        /* generate workbook and add the worksheet */
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, ws, "Sources");
        XLSX.utils.sheet_add_aoa(ws, [["_id", "category", "value", "form_name", "masse", "temps", "unity", "source_link", "description"]], { origin: "A1" });
        /* save to file */  
        XLSX.writeFile(workbook, 'Export_sources.xlsx');
      }
    }, (err) => {
      console.log(err)
    })
  }

  openModal(modal: any) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

}
