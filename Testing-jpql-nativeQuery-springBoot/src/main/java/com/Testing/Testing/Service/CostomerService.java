package com.Testing.Testing.Service;

import com.Testing.Testing.Repository.CostomerRepository;
import com.Testing.Testing.Roles.Costomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CostomerService")
public class CostomerService {

    @Autowired
    CostomerRepository costomerRepository;

    public String Savedata(Costomer costomer){
        costomerRepository.save(costomer);

        return "Data saved successfully";
    }

    public List<Costomer> isPresent(String name){
        return costomerRepository.getbyCityName(name);
    }

    public String isPresentByCityAndName(String city, String name){
        return costomerRepository.getbyCityAndName(city, name);
    }

    public List<Costomer> getdata(){
        return costomerRepository.getAll();
    }

    public List<Costomer> getdataall(){
        return costomerRepository.getAllCostomer();
    }
    public void delete(int id){
        costomerRepository.deleteById((long) id);
    }
}
