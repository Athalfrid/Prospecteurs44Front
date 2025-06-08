import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.services';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { GeoService } from '../../../services/geo/geo.services';
import { MatIconModule } from '@angular/material/icon';
import {
  InformationsPersonnellesDTO,
  RegisterDTO,
} from '../../../dto/register.dto';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    CommonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition(':enter', [
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(-10px)' })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  form: FormGroup;
  villes: string[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private geoService: GeoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      pseudo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isParrained: [false],
      emailParrain: ['', [Validators.email]],
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      dateNaissance: ['',Validators.required],
      ville: ['',Validators.required],
      codePostal: ['',Validators.required],
      telephone: ['',Validators.required],
    });

    this.form.get('isParrained')?.valueChanges.subscribe((isChecked) => {
      const emailParrain = this.form.get('emailParrain');
      if (isChecked) {
        emailParrain?.setValidators([Validators.required, Validators.email]);
      } else {
        emailParrain?.clearValidators();
        emailParrain?.setValue('');
      }
      emailParrain?.updateValueAndValidity();
    });

    this.form.get('codePostal')?.valueChanges.subscribe((value) => {
      if (value && value.length === 5) {
        this.geoService.getVilles(value).subscribe({
          next: (data) => {
            this.villes = data.map((v: any) => v.nom);
            if (this.villes.length === 1) {
              this.form.get('ville')?.setValue(this.villes[0]);
            } else {
              this.form.get('ville')?.setValue('');
            }
          },
          error: (err) => {
            console.error('Erreur API :', err);
            this.villes = [];
            this.form.get('ville')?.setValue('');
          },
        });
      } else {
        this.villes = [];
        this.form.get('ville')?.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const infosPersonnelles: InformationsPersonnellesDTO = {
        nom: formValue.nom,
        prenom: formValue.prenom,
        dateNaissance: formValue.dateNaissance,
        ville: formValue.ville,
        codePostal: formValue.codePostal,
        telephone: formValue.telephone,
      };

      const payload: RegisterDTO = {
        pseudo: formValue.pseudo,
        email: formValue.email,
        password: formValue.password,
        isParrained: formValue.isParrained,
        emailParrain: formValue.emailParrain,
        informationsPersonnelles: infosPersonnelles,
      };

      this.authService.register(payload).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion :', error);
          if (error.status === 409) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = 'Erreur serveur, merci de réessayer';
          }
        },
      });
      console.log('Formulaire soumis!', this.form.value);
    }
  }

  onlyNumber(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    if (date) {
      this.form.patchValue({
        dateNaissance: `${date.getDate().toString().padStart(2, '0')}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`,
      });
    }
  }
}
