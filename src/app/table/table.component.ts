import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'table-interface',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  tableData: any[] = [];

  addForm: FormGroup;
  editForm: FormGroup = new FormGroup({});
  editRowId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.addForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.authService.getTableData().subscribe({
      next: data => this.tableData = data,
      error: error => console.error('Ошибка при получении данных', error)
    });
  }

  onAdd(): void {
    const { username, password } = this.addForm.value;
    if (username && password) {
      this.authService.addRow(username, password).subscribe({
        next: response => {
          this.tableData.push(response);
          this.addForm.reset();
          console.log('Данные успешно добавлены', response);
        },
        error: error => console.error('Ошибка при добавлении записи', error),
      });
    }
  }

  onDelete(id: number): void {
    this.authService.deleteRow(id).subscribe({
      next: response => {
        this.tableData = this.tableData.filter(row => row.id !== id);
        console.log('Данные успешно удалены', response);
      },
      error: error => console.error('Ошибка при удалении записи', error),
    });
  }

  onEdit(row: any): void {
    this.editForm = new FormGroup({
      username: new FormControl(row.username),
      password: new FormControl(''),
    });
    this.editRowId = row.id;
  }

  onSave(id: number): void {
    if (this.editForm) {
      const { username, password } = this.editForm.value;
      this.authService.updateRow(id, username, password).subscribe({
        next: response => {
          const index = this.tableData.findIndex(row => row.id === id);
          if (index !== -1) {
            this.tableData[index] = response;
          }
          this.editForm = new FormGroup({});
          this.editRowId = null;
          console.log('Данные успешно обновлены', response);
        },
        error: error => console.error('Ошибка при обновлении записи', error),
      });
    }
  }

  onReturn(): void {
    this.router.navigate(['/login']).then(r => {  });
  }
}
