import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-collection-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./collection-list-page.component.scss'],
  templateUrl: './collection-list-page.component.html',
})
export class CollectionListPageComponent implements OnInit {
  collections: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/api/core/collections?size=20').subscribe({
      next: (response) => {
        this.collections = response?._embedded?.collections || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
