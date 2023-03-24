package com.example.be.service;

import com.example.be.model.NguoiNop;

import java.util.List;

public interface NguoiNopService {
    List<NguoiNop>  findAll();
    NguoiNop save(NguoiNop nguoiNop);
    NguoiNop findById(int id);
    void delete(NguoiNop nguoiNop);
}
