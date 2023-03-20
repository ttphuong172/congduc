package com.example.be.Service;

import com.example.be.model.NguoiNop;

import java.util.List;

public interface NguoiNopService {
    List<NguoiNop>  findAll();
    void save(NguoiNop nguoiNop);
}
