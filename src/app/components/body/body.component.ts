import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  customerForm!: FormGroup;
  customers: Customer[] = [];
  displayedColumns: string[] = ['customerId', 'firstName', 'lastName', 'email', 'phone', 'address', 'dateOfBirth', 'status', 'dni', 'monthlyIncome', 'actualJob', 'purpose', 'budget', 'kindOfProperty', 'location', 'characteristics'];
  customer: Customer = new Customer();

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    // this.initForm();
    this.customerForm = this.formBuilder.group({
      // Define tus campos del formulario aquí...
    });

    this.getCustomers();
  }

  initForm(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      dateOfBirth: [''],
      status: ['', Validators.required],
      dni: ['', Validators.required],
      monthlyIncome: ['', [Validators.required, Validators.min(0)]],
      actualJob: [''],
      purpose: [''],
      budget: ['', [Validators.required, Validators.min(0)]],
      kindOfProperty: ['', Validators.required],
      location: ['', Validators.required],
      characteristics: [''],
    });
  }
  

  getCustomers() {
    this.customerService.getAllCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data; // Assign the received data directly to the customers array
        console.log(data)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  editCustomer(customer: Customer): void {
    this.initForm(); // Initialize the form to clear any previous data
    this.customerForm.patchValue(customer); // Set the form values with the selected customer's data
  }
  

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customer = this.customerForm.value as Customer;
      console.log(this.customer); // Aquí puedes enviar los datos del formulario al backend, por ejemplo
    }
  }
}