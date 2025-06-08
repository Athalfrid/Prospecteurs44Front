import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface CreateTopicDialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-create-topic',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.css',
})
export class CreateTopicComponent {
  data: CreateTopicDialogData = { title: '', content: '' };

  constructor(
    public dialogRef: MatDialogRef<CreateTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingData: any
  ) {}

  onNoClick(){
    this.dialogRef.close();
  }

  onCreateClick(){
    if(this.data.title && this.data.content){
      this.dialogRef.close(this.data);
    }
  }
}
