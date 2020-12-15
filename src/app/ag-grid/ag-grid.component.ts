import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {group} from '@angular/animations';

// import 'ag-grid-enterprise';   --> duhet import enterprise

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})


export class AgGridComponent {


  public columnDefs;
  public rowData;

  public rowSelection;
  private gridApi;
  private gridColumnApi;
  public searchValue;

  private defaultColDef;

  style = {
    marginTop: '20px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: 'Email',
        headerCheckboxSelection: true,
        field: 'email',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        editable: true,
        resizable: true,
        pinned: 'left',
      },
      {
        headerName: 'Id',
        field: 'id',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      {
        headerName: 'Surname',
        field: 'surname',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      {
        headerName: 'Username',
        field: 'username',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      {
        headerName: 'Group',
        field: 'group',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Group1', 'Group2', 'Group3', 'Group4']
        }
      }
    ];

    this.rowData = [
      {
        email: 'r@r.com',
        id: 123123,
        surname: 'leka',
        username: 'rigers',
        group: 'Group1'
      },
      {
        email: 'e@e.com',
        id: 123123,
        surname: 'llojku',
        username: 'ervini',
        group: 'Group1'
      },
      {
        email: 'test@test.com',
        id: 456576,
        surname: 'test_surname',
        username: 'test_username',
        group: 'Group2'
      },
      {
        email: 'prova@prova.com',
        id: 4565768,
        surname: 'prova_surname',
        username: 'prova_username',
        group: 'Group1'
      },
      {
        email: 'prova@prova.com',
        id: 456576,
        surname: 'prova_surname',
        username: 'prova_username',
        group: 'Group1'
      }, {
        email: 'prova@prova.com',
        id: 45656576,
        surname: 'prova_surname',
        username: 'prova_username',
        group: 'Group1'
      }, {
        email: 'prova@prova.com',
        id: 345454,
        surname: 'prova_surname',
        username: 'prova_username',
        group: 'Group1'
      }
    ];

    this.defaultColDef = {
      resizable: true,
      width: 100,
    };
    this.rowSelection = 'multiple';
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  fillLarge() {
    this.setWidthAndHeight('100%', '100%');
  }

  fillMedium() {
    this.setWidthAndHeight('60%', '60%');
  }

  fillExact() {
    this.setWidthAndHeight('400px', '400px');
  }

  setWidthAndHeight(width, height) {
    this.style = {
      marginTop: '20px',
      width: width,
      height: height,
      boxSizing: width
    };
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  CellValueChanged(params) {
    const colId = params.column.getId();
    if (colId === 'group') {
      const selectedGroup = params.data.group;
      params.node.setDataValue('group', null);
      return params;
    }
  }

  cellEditorParams(params) {
    const selectedGroup = params.data.group;
    if (selectedGroup === 'Group1') {
      return 'Group1';
    } else {
      return 'Group2';
    }
  }


  // cellEditorSelector(params) {
  //   if (params.data.type === 'group') {
  //     return {
  //       component: 'agRichSelect',
  //       params: {values: ['Group1', 'Group2']}
  //     };
  //   }
  //   return null;
  // }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    // this.http
    //   .get(
    //     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
    //   )
    //   .subscribe(data => {
    //     this.rowData = data;
    //   });
  }
}
