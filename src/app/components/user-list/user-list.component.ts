import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  title = '';
  p: number = 1;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.retrieveUserData();
  }

  retrieveUserData(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          if(data) {
            this.users = data.data;
          }
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUserData();
  }

  deleteUser(userId:string){
    this.userService.delete(userId)
    .pipe(first())
    .subscribe((res) => {
      if(res) {
        this.retrieveUserData();
      }
        this.userService.success('User Deleted', { keepAfterRouteChange: true });
    })
  }

  navigateTo(id?:any){
    if(id) {
      this.router.navigate(['/user-add-edit'],{ queryParams: {userId: id}});
    }
    else {
      this.router.navigate(['user-add-edit']);      
    }
  }
}
