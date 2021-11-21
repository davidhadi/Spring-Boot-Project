package com.example.adnetwork.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonDAO personDao;

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(long id) {
        try {
            Person person = new Person();
            person.setId(id);
            personDao.delete(person);
        } catch (Exception ex) {
            return ex.getMessage();
        }
        return "Person successfully deleted!";
    }

    @PostMapping
    @ResponseBody
    public String create(String name, String email, String mobile, String city, String pass) {
        try {
            Person person = new Person();
            person.setName(name);
            person.setEmail(email);
            person.setMobile(mobile);
            person.setCity(city);
            person.setPass(pass);
            personDao.savePerson(person);
        } catch (Exception ex) {
            return ex.getMessage();
        }
        return "Person successfully saved!";
    }
    @GetMapping
    @ResponseBody
    public List<Person> getAllPersons() {
        try {
            return personDao.getAllPersons();
        } catch (Exception ex) {
            return null;
        }
    }
}