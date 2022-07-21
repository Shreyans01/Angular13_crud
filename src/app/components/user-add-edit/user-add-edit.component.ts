import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'user-add-edit.component.html' })
export class UserAddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode: boolean = true;
  loading = false;
  submitted = false;
  fileToUpload: any;
  uploadfile: any = [];
  @ViewChild('attachments') attachment: any;
  params: {
    id: any;
    title: any;
    firstName: any;
    lastName: any;
    picture: any;
    gender: any;
    email: any;
    dateOfBirth: any;
    phone: any;
    location: {
      street: any;
      city: any;
      state: any;
      country: any;
      timezone: any;
    };
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.id = params['userId'];
      }
    );
    if (this.id) {
      this.isAddMode = false;
    }
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      picture: [''],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      dob: [''],
      phone: [''],
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      timezone: [''],
    });

    if (!this.isAddMode) {
      this.userService.get(this.id).subscribe((x) => {
        var selectedUser = x.data.filter((user: any) => {
          return user.id == this.id;
        });
        this.form.patchValue(selectedUser[0]);
      });
    }
  }

  onSubmit() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.params = {
      id: this.form.value.id,
      title: this.form.value.title,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      picture: this.form.value.picture,
      gender: this.form.value.gender,
      email: this.form.value.email,
      dateOfBirth: this.form.value.dob,
      phone: this.form.value.phone,
      location: {
        street: this.form.value.street,
        city: this.form.value.city,
        state: this.form.value.state,
        country: this.form.value.country,
        timezone: this.form.value.timezone,
      },
    };
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  saveDate(ev: any) {
    // this.form.controls['dob'].setValue(ev.target.value)
  }

  private createUser() {
    this.userService
      .create(this.params)
      .subscribe(() => {
        this.userService.success('User added', { keepAfterRouteChange: true });
        this.router.navigate(['/user-list']);
      })
      .add(() => (this.loading = false));
  }

  private updateUser() {
    this.userService
      .update(this.params)
      .subscribe(() => {
        this.userService.success('User updated', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['/user-list']);
      })
      .add(() => (this.loading = false));
  }

  cancel() {
    this.router.navigate(['user-list']);
  }

  onFileChange(event: any) {
    let files = event.target.files;
    this.fileToUpload = files.item(0);
    this.form.controls['picture'].setValue(this.fileToUpload.name);
  }
}
