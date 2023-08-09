package com.JavaDemo.app;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {
    private static List<Todo> todoList = new ArrayList<>();

    static {
        todoList.add(new Todo(101, "Shakil", "Learn Aws", LocalDate.now().plusYears(1), false));
        todoList.add(new Todo(102, "Durga", "Learn UI", LocalDate.now().plusYears(2), false));
        todoList.add(new Todo(103, "Shatish", "Learn React", LocalDate.now().plusYears(3), true));
        todoList.add(new Todo(104, "Ajaj", "Leans Data Entry", LocalDate.now().plusYears(4), false));

    }

    public List<Todo> findByUsername(String username) {
        return todoList;
    }

    public void addTodo(int id, String username, String description, boolean done){
        todoList.add(new Todo(id, username, description, LocalDate.now().plusYears(1), done));
    }

    public Todo findById(int id){
        for(Todo todo : todoList){
            if(todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

    public void deleteById(int id){
        Todo todo = findById(id);
        todoList.remove(todo);
    }

    public void update(int id, String username, String description, boolean done) {
        Todo todo = findById(id);
        todoList.remove(todo);
        todoList.add(new Todo(id, username, description, LocalDate.now().plusYears(1), done));
    }
}
