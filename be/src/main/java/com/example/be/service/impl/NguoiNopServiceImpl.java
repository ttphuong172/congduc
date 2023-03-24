package com.example.be.service.impl;

import com.example.be.service.NguoiNopService;
import com.example.be.model.NguoiNop;
import com.example.be.repository.NguoiNopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class NguoiNopServiceImpl implements NguoiNopService {
    @Autowired
    private NguoiNopRepository nguoiNopRepository;
    @Override
    public List<NguoiNop> findAll() {
        return nguoiNopRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @Override
    public NguoiNop save(NguoiNop nguoiNop)
    {
        nguoiNopRepository.save(nguoiNop);
        return nguoiNop;
    }

    @Override
    public NguoiNop findById(int id) {
        return nguoiNopRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(NguoiNop nguoiNop) {
        nguoiNopRepository.delete(nguoiNop);
    }
}
