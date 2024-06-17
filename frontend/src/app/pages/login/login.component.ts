import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { SecurityService } from 'src/app/services/security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  theUser: User;

  constructor(private service: SecurityService, private router: Router) {
    this.theUser = { id: null, name: null, email: '', password: '' }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    this.service.login(this.theUser).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.service.saveSession(data);
          this.router.navigate(['dashboard']);
        },
        error: (error: any) => {
          Swal.fire("Autentication Invalid", "Incorrect user or password", "error");
        }
      }
    );
  }

}
