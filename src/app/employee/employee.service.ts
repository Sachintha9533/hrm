import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = [
    { id: 1, name: 'sachintha', age: 22, gender: 'male' },
    { id: 2, name: 'sachintha', age: 22, gender: 'male' },
    { id: 3, name: 'lakshan', age: 21, gender: 'male' },
    { id: 4, name: 'tharanga', age: 25, gender: 'male' },
  ];

  constructor(private http: HttpClient) {}

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/employees/' + id);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }

  save(payload: any): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:3000/employees', payload);
  }
}
