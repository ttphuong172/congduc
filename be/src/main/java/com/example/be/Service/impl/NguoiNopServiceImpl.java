package com.example.be.Service.impl;

import com.example.be.Service.NguoiNopService;
import com.example.be.model.NguoiNop;
import com.example.be.repository.NguoiNopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NguoiNopServiceImpl implements NguoiNopService {
    @Autowired
    private NguoiNopRepository nguoiNopRepository;
    @Override
    public List<NguoiNop> findAll() {
        return nguoiNopRepository.findAll();
    }

    @Override
    public void save(NguoiNop nguoiNop) {
        nguoiNopRepository.save(nguoiNop);
    }
}
