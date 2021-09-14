import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogCommentCreate } from 'src/app/models/blogComment/blog-comment-create.model';
import { BlogCommentViewModel } from 'src/app/models/blogComment/blog-comment-view-model';
import { BlogComment } from 'src/app/models/blogComment/blog-comment.model';
import { BlogCommentService } from 'src/app/services/blog-comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  @Input() comment: BlogCommentViewModel = {} as BlogCommentViewModel;
  @Output() commentSaved: any = new EventEmitter<BlogComment>();

  @ViewChild('commentForm') commentForm: NgForm = {} as NgForm;

  constructor(
    private blogCommentService: BlogCommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  resetComment() {
    this.commentForm.reset();
  }

  onSubmit() {
    let blogCommentCreate: BlogCommentCreate = {
      blogCommentId: this.comment.blogCommentId,
      parentBlogCommentId: this.comment.parentBlogCommentId,
      blogId: this.comment.blogId,
      content: this.comment.content
    };

    this.blogCommentService.create(blogCommentCreate).subscribe(blogComment => {
      this.toastr.info('Comment saved.');
      this.resetComment();
      this.commentSaved.emit(blogComment);
     
    })
  }
}
