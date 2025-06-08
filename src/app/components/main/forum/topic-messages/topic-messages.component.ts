import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopicMessagesDTO } from '../../../../dto/forum/TopicMessagesDTO';
import { ForumService } from '../../../../services/forum/forum.service';
import { TopicDTO } from '../../../../dto/forum/TopicDTO';
import { TopicMessagesCreateDTO } from '../../../../dto/forum/TopicMessagesCreateDTO';

export interface TopicMessagesDialogData {
  topic: TopicDTO;
  topicId?: number;
  topicTitle?: string;
  messages?: TopicMessagesDTO[];
}

@Component({
  selector: 'app-topic-messages-dialog',
  templateUrl: './topic-messages.component.html',
  styleUrls: ['./topic-messages.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
})
export class TopicMessagesDialogComponent implements OnInit {
  messages: TopicMessagesDTO[] = [];
  newMessageContent: string = '';
  isLoadingMessages: boolean = false;
  topic: TopicDTO;
  topicId!: number;
  topicTitle!: string;

  constructor(
    public dialogRef: MatDialogRef<TopicMessagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TopicMessagesDialogData,
    private forumService: ForumService
  ) {
    this.topic = this.data.topic;
    this.topicId = this.data.topicId!;
    this.topicTitle = this.data.topicTitle || '';
    this.messages = this.data.messages || [];
  }

  ngOnInit(): void {

    if (this.topic && this.topic.id) {
      this.loadMessages(this.topic.id);
    }
  }

  loadMessages(topicId: number): void {
    this.isLoadingMessages = true;
    this.forumService.getMessagesByTopic(topicId).subscribe({
      next: (msgs) => {
        this.messages = msgs.sort(
          (a: TopicMessagesDTO, b: TopicMessagesDTO) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }
        );
        this.isLoadingMessages = false;
      },
      error: (err) => {
        console.error('Erreur chargement messages', err);
        this.isLoadingMessages = false;
      },
    });
  }

  postMessage(): void {
    if (!this.newMessageContent.trim() || !this.topic.id) return;

    const messagePayload: TopicMessagesCreateDTO = {
      content: this.newMessageContent,
    };

    this.forumService
      .postMessage(this.topic.id, messagePayload) // Suppose une méthode comme celle-ci
      .subscribe({
        next: (newMessage) => {
          this.messages.unshift(newMessage);
          this.newMessageContent = '';
        },
        error: (err) => {
          console.error("Erreur lors de l'envoi du message", err);
        },
      });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
