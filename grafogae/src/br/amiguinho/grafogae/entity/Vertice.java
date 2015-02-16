package br.amiguinho.grafogae.entity;

import java.io.Serializable;


public class Vertice implements Serializable{
	
	private int id;
	private String nome;
	private String cor;
	private String forma;
	
	public Vertice(){}
	
	public Vertice(int id) {
		super();
		this.id = id;
	}
 
	public Vertice(int id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vertice other = (Vertice) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
	@Override
	public String toString() {
		return "Vertice [id=" + id + ", nome=" + nome + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public String getForma() {
		return forma;
	}

	public void setForma(String forma) {
		this.forma = forma;
	}

}
