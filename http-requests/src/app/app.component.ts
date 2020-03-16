import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';
import { Post } from './shared/models/Post';
import { PostService } from './shared/services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[];
  endpoint = 'https://ng-http-90b6e.firebaseio.com/posts.json';
  isFetching = false;
  error: string = null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchAllPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.save(postData.title, postData.content).subscribe(data => {
      console.log(data);

      /*       this.loadedPosts = data;
      console.log(this.loadedPosts); */
    });
  }

  onFetchPosts() {
    this.fetchAllPosts();
  }

  onClearPosts() {
    this.postService.delete().subscribe(
      response => {
        console.log(response);
        this.loadedPosts = [];
      },
      err => {
        this.isFetching = false;
        this.error = err.message;
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  private fetchAllPosts() {
    this.isFetching = true;
    this.postService.fetch().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      err => {
        this.isFetching = false;
        this.error = err.message;
      }
    );
  }
}
