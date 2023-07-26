import { Component, OnDestroy, OnInit } from '@angular/core';
import * as postModel from './model/post.model';
import { PostsService } from './services/posts.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: postModel.Post[] = [];
  isFetching = false;
  errorMessage: string | null  = null;
  errorSub?: Subscription;


  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(error => {
      this.errorMessage = error;
    });
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onDismissError() {
    this.errorMessage = null;
    
  }

  fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      {
        next: posts => {
          this.loadedPosts = posts;
          this.isFetching = false;
        },
        error: error => {
          console.log(error)
          this.isFetching = false;
        }
      });
  }


  onClearPosts() {
    this.postService.deletePosts();
  }
}
