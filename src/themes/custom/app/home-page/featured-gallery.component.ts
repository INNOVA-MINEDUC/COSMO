import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-gallery.component.html',
  styleUrls: ['./featured-gallery.component.scss']
})
export class FeaturedGalleryComponent implements OnInit {
  collections: any[] = [];
  loading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('/api/core/collections?size=8').subscribe({
      next: (res) => {
        this.collections = res?._embedded?.collections || [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getImage(collection: any): string {
    // Try common properties used in DSpace API for logos/thumbnails
    if (collection.logo) {
      return collection.logo;
    }
    if (collection._links && collection._links.logo && collection._links.logo.href) {
      // many DSpace instances expose logo as a link to a bitstream content
      return collection._links.logo.href.replace('/api', '/server');
    }
    // fallback image
    return 'assets/test/images/banner-half.jpg';
  }
}
