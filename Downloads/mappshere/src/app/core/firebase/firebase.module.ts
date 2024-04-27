import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "../../../Environements/environement";

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  exports: [
    AngularFireAuthModule,
    AngularFireModule
  ]
})
export class FirebaseModule {}