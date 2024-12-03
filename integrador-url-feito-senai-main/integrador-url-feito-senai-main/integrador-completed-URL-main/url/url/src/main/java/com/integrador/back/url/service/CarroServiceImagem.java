package com.integrador.back.url.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.integrador.back.url.model.CarroModel;
import com.integrador.back.url.repository.CarroRepository;
@Service
public class CarroServiceImagem {
  

	    @Autowired
	    private CarroRepository repo;

	    public List<CarroModel> listarTodos() {
	        return repo.findAll();
	    }

	    public CarroModel salvar(CarroModel carro) {
	        return repo.save(carro);
	    }

	    public CarroModel buscarPorId(Long id) {
	        return repo.findById(id).orElse(null);
	    }

	    public void deletar(Long id) {
	    	repo.deleteById(id);
	    }
	}

