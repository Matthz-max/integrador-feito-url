package com.integrador.back.url.model;
 
import com.integrador.back.url.dto.CarroDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
  
@Entity
@Table(name = "venda2")
public class CarroModel{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String imagem;
	private String modelo;
	private String ano;
	private String preco;
	private String cor;
	private String placa;

	public CarroModel() {
	}

 
	public CarroModel(Long id, String imagem, String modelo, String ano, String preco, String cor, String placa) {
		 
		this.id = id;
		this.imagem = imagem;
		this.modelo = modelo;
		this.ano = ano;
		this.preco = preco;
		this.cor = cor;
		this.placa = placa;
	}


	public void updatedDTO(CarroDTO dto) {
		 
		this.imagem = dto.imagem();
		this.modelo = dto.modelo();
		this.ano = dto.ano();
		this.preco = dto.preco();
		this.cor = dto.cor();
		this.placa = dto.placa();

	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getImagem() {
		return imagem;
	}


	public void setImagemUrl(String imagem) {
		this.imagem = imagem;
	}


	public String getModelo() {
		return modelo;
	}


	public void setModelo(String modelo) {
		this.modelo = modelo;
	}


	public String getAno() {
		return ano;
	}


	public void setAno(String ano) {
		this.ano = ano;
	}


	public String getPreco() {
		return preco;
	}


	public void setPreco(String preco) {
		this.preco = preco;
	}


	public String getCor() {
		return cor;
	}


	public void setCor(String cor) {
		this.cor = cor;
	}


	public String getPlaca() {
		return placa;
	}


	public void setPlaca(String placa) {
		this.placa = placa;
	}
 
}