import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngIf, etc.

// Imports Angular Material nécessaires pour le template
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // MatTableModule est essentiel
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

// DTOs et Services
import { TopicDTO } from '../../../dto/forum/TopicDTO';
import { ForumService } from '../../../services/forum/forum.service';

// Composants de dialogue
import {
  CreateTopicComponent,
  CreateTopicDialogData,
} from './create-topic/create-topic.component';
import {
  TopicMessagesDialogComponent,
  TopicMessagesDialogData,
} from './topic-messages/topic-messages.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
  ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit, AfterViewInit {
  // Définir les colonnes à afficher
  displayedColumns: string[] = [
    'title',
    'content',
    'date_dernier_message',
    'actions',
  ];
  // Utiliser directement MatTableDataSource pour bénéficier de ses fonctionnalités
  dataSource = new MatTableDataSource<TopicDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private forumService: ForumService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTopics(): void {
    this.forumService.getTopics().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);
      },
      error: (err) =>
        console.error('Erreur lors du chargement des topics !', err),
    });
  }

  openCreateTopicDialog(): void {
    const dialogRef = this.dialog.open<
      CreateTopicComponent,
      CreateTopicDialogData
    >(CreateTopicComponent, {
      panelClass: 'create-topic',
      width: '70vw',
      data: { title: '', content: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.forumService.createTopic(result).subscribe({
          next: (topic) => {
            this.addTopicToList(topic);
          },
          error: (err) =>
            console.error(
              'Erreur lors de la création du topic via le dialogue',
              err
            ),
        });
      }
    });
  }

  addTopicToList(topic: TopicDTO): void {
    const currentData = this.dataSource.data;
    // Crée une nouvelle référence de tableau pour que le changement soit détecté
    this.dataSource.data = [...currentData, topic];
  }

  openConversation(topic: TopicDTO): void {
    this.dialog.open<TopicMessagesDialogComponent, TopicMessagesDialogData>(
      TopicMessagesDialogComponent,
      {
        width: '70vw',
        height: '80vh',
        data: {
          topic: topic,
          topicId: topic.id!,
          topicTitle: topic.title!,
          messages: topic.messages,
        },
      }
    );
  }

  getLastMessageContent(topic: TopicDTO): string {
    return topic.messages && topic.messages.length > 0
      ? topic.messages[topic.messages.length - 1].createdAt
      : '';
  }
}
