import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Material Components
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, NgStyle } from '@angular/common';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  photo: string;
}

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-actualites',
  imports: [
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    NgStyle,
    CommonModule,
  ],
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ActualitesComponent implements OnInit {
  newsData: NewsItem[] = [];
  currentNews: NewsItem[] = [];
  selectedNewsId: number | null = null;
  expandedImage: number | null = null;
  loading: boolean = true;

  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    document.title = 'Actualités - Prospecteurs44';
    this.fetchNews();
  }

  fetchNews(): void {
    this.http.get<NewsItem[]>('/resources/data/news.json').subscribe({
      next: (data) => {
        setTimeout(() => {
          this.newsData = data;
          this.updateCurrentNews();
          this.loading = false;
        }, 500);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.loading = false;
      },
    });
  }

  handleClick(id: number): void {
    this.selectedNewsId = this.selectedNewsId === id ? null : id;
  }
  closeDetail(): void {
    this.selectedNewsId = null;
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
    this.updateCurrentNews();
  }

  updateCurrentNews(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.currentNews = this.newsData.slice(start, end);
  }

  gettotalPages(): number {
    return Math.ceil(this.newsData.length / this.itemsPerPage);
  }

  getNewsById(id:number) {
    return this.currentNews.find(news => news.id === id);
  }
}
