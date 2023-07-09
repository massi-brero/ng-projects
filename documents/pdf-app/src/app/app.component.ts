import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
<<<<<<< HEAD:documents/pdf-app/src/app/app.component.ts
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf-app';
=======
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
>>>>>>> a685056ff964a0af467ec0a1df9335acd0348252:auth/foodlist-auth/src/app/app.component.ts
}
