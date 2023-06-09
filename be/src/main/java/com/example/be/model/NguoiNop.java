package com.example.be.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NguoiNop {
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private String ten;
    private String diaChi;
    private int soTien;
    private LocalDate ngay;
}
