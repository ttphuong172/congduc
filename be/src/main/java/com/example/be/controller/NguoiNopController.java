package com.example.be.controller;

import com.example.be.service.NguoiNopService;
import com.example.be.model.NguoiNop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/nguoinop")
@CrossOrigin
public class NguoiNopController {
    @Autowired
    private NguoiNopService nguoiNopService;
    @PostMapping("")
    public ResponseEntity<NguoiNop> save(@RequestBody NguoiNop nguoiNop){
        nguoiNop.setNgay(LocalDate.now());
        nguoiNopService.save(nguoiNop);
        return new ResponseEntity<>(nguoiNop,HttpStatus.OK);
    }
    @GetMapping("")
    public ResponseEntity<List<NguoiNop>> findAll(){
       return new ResponseEntity<>(nguoiNopService.findAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<NguoiNop> findById(@PathVariable int id){
        return new ResponseEntity<>(nguoiNopService.findById(id),HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<String> update(@PathVariable int id,@RequestBody NguoiNop nguoiNop){
        NguoiNop nguoiNopCurrent = nguoiNopService.findById(id);
        nguoiNopCurrent.setTen(nguoiNop.getTen());
        nguoiNopCurrent.setDiaChi(nguoiNop.getDiaChi());
        nguoiNopCurrent.setSoTien(nguoiNop.getSoTien());
        nguoiNopService.save(nguoiNopCurrent);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity <String> delete(@PathVariable int id){
        NguoiNop nguoiNop = nguoiNopService.findById(id);
        nguoiNopService.delete(nguoiNop);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
