import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  rutaGlobal = 'http://localhost:8080/api/v1/customers'

  constructor(private http: HttpClient) { }

  //Create Customer
  createCustomer(customer: Customer){
    return this.http.post<Customer>(this.rutaGlobal, customer, {
      observe: 'response'
    })
  }

  //GetAll Customer
  getAllCustomers() {
    return this.http.get<Customer[]>(this.rutaGlobal);
  }

  //Find Customer
  getCustomer(customerId: number){
    return this.http.get<Customer>(this.rutaGlobal + customerId, {
      observe: 'response'
    })
  }

  //Update Customer
  updateCustomer(customerId: number){
    return this.http.post<Customer>(this.rutaGlobal + customerId, {
      observe: 'response'
    });
  }

  // Delete Customer
  deleteCustomer(customerId: number){
    this.http.post<Boolean>(this.rutaGlobal + customerId, {
      observe: 'response'
    })
  }
}
