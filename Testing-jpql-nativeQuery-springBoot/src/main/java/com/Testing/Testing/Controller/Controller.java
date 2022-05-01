package com.Testing.Testing.Controller;

import com.Testing.Testing.Roles.Costomer;
import com.Testing.Testing.Service.CostomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/auth")
public class Controller {

    @Autowired
    CostomerService costomerService;

    @PostMapping("/save")   //worked
    public String saveData(@RequestBody Costomer costomer){
        return costomerService.Savedata(costomer);
    }

    @GetMapping("checkbyname/{name}")   //worked
    public List<Costomer> checkByName(@PathVariable("name") String name){
        return costomerService.isPresent(name);
    }

    @GetMapping("checkbycityandname/{city}/{name}")  //worked
    public String checkByCityAndName(@PathVariable("city") String city, @PathVariable("name") String name){
        return costomerService.isPresentByCityAndName(city, name);
    }

    @GetMapping("/getall")  //worked
    public List<Costomer> getalldata(){
        return costomerService.getdata();
    }

    @GetMapping("getUser") //worked
    public List<Costomer> getalluser(){
        return costomerService.getdataall();
    }

    @GetMapping("deleteUser/{id}")   //not worked
    public void deleteByID(@PathVariable("id") int id){
        costomerService.delete(id);
    }
}
