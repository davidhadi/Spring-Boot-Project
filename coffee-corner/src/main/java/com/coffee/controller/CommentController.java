package com.coffee.controller;

import com.coffee.model.Comment;
import com.coffee.payload.CommentRequest;
import com.coffee.repository.CommentRepository;
import com.coffee.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Comment postComment(@RequestBody CommentRequest commentRequest, @AuthenticationPrincipal UserDetailsImpl user) {
        Comment comment = new Comment();
        comment.setText(commentRequest.getText());
        comment.setUsername(user.getFname());
        comment.setTimestamp(LocalDateTime.now());
        return commentRepository.save(comment);
    }

}
