package com.JavaDemo.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

@Controller
@SessionAttributes("name")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @RequestMapping(value = "gettodos")
    public String  getAllList (ModelMap model){
        List<Todo> todos = todoService.findByUsername("Shakil");
        model.addAttribute("todos", todos);
        return "TodoList";
    }

    @RequestMapping(value = "addtodo", method = RequestMethod.GET)
    public String  addTodo (ModelMap model){
        return "AddTodo";
    }

    @RequestMapping(value = "addtodo", method = RequestMethod.POST)
    public String  addTodoList (ModelMap model,
                                @RequestParam int id, @RequestParam String username, @RequestParam String description, @RequestParam boolean done)
    {
        todoService.addTodo(id, username, description, done);
        return "redirect:gettodos";
    }

    @RequestMapping(value = "deletetodo")
    public String deleteTodo(@RequestParam int id){
        todoService.deleteById(id);
        return "redirect:gettodos";
    }

    @RequestMapping(value = "update_todo", method = RequestMethod.GET)
    public String updateTodo(@RequestParam int id, ModelMap model){
        Todo todo = todoService.findById(id);
        model.addAttribute("todo", todo);
        return "updatetodo";
    }
    @RequestMapping(value = "update_todo", method = RequestMethod.POST)
    public String updateNewTodo(@RequestParam int id, @RequestParam String username, @RequestParam String description, @RequestParam boolean done){
        todoService.update(id, username, description, done);
        return "redirect:gettodos";
    }

}
