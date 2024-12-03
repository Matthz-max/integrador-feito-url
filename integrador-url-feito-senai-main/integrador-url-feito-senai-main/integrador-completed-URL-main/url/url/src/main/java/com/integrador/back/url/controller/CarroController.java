package com.integrador.back.url.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.integrador.back.url.dto.CarroDTO;
import com.integrador.back.url.model.CarroModel;
import com.integrador.back.url.repository.CarroRepository;
import com.integrador.back.url.service.CarroServiceImagem;


@CrossOrigin(origins = "*")  
@RestController
@RequestMapping("carro2")
public class CarroController {
 
		@Autowired
	    private CarroServiceImagem CarroServiceImagem;
		
		@Autowired
		CarroRepository repo;

	    @GetMapping("/listar")
	    public List<CarroModel> listar() {
	        return CarroServiceImagem.listarTodos();
	    }

	    @PostMapping("/criar")
	    public ResponseEntity<CarroModel> criar(@RequestBody CarroModel carroImagem) {
	        System.out.println("URL da imagem recebida: " + carroImagem.getImagem());
	        return new ResponseEntity<>(CarroServiceImagem.salvar(carroImagem), HttpStatus.CREATED);
	    }


	    @GetMapping("/listar/{id}")
	    public ResponseEntity<CarroModel> buscarPorId(@PathVariable Long id) {
	    	CarroModel CarroImagem = CarroServiceImagem.buscarPorId(id);
	        return CarroImagem != null ? ResponseEntity.ok(CarroImagem) : ResponseEntity.notFound().build();
	    }
	    @PutMapping("/atualizar/{id}")
	    public ResponseEntity<?> atualizarCarro(@PathVariable Long id, @RequestBody CarroDTO dto) {
	        CarroModel carro = repo.findById(id)
	                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carro não encontrado"));

	        // Atualizar as propriedades com os dados do DTO
	        carro.updatedDTO(dto);

	        // Salvar o carro atualizado no banco de dados
	        repo.save(carro);

	        return ResponseEntity.ok(carro);  // Retornar o carro atualizado
	    }
  
	    @DeleteMapping("/deletar/{id}")
	    public ResponseEntity<Void> deletar(@PathVariable Long id) {
	    	CarroServiceImagem.deletar(id);
	        return ResponseEntity.noContent().build();
	    }
	}
	