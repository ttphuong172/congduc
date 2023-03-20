package com.example.be.controller;

import com.example.be.Service.NguoiNopService;
import com.example.be.model.NguoiNop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/nguoinop")
@CrossOrigin
public class NguoiNopController {
    @Autowired
    private NguoiNopService nguoiNopService;
    @PostMapping("")
    public ResponseEntity<String> save(@RequestBody NguoiNop nguoiNop){
        nguoiNopService.save(nguoiNop);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<NguoiNop>> findAll(){
       return new ResponseEntity<>(nguoiNopService.findAll(), HttpStatus.OK);
    }
}
