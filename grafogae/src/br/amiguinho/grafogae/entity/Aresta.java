package br.amiguinho.grafogae.entity;

import java.io.Serializable;


public class Aresta implements Serializable{
	
	private Vertice origem = new Vertice();
	private Vertice destino = new Vertice();
	private String cor;
	private Boolean direcao;
	private Integer largura;
	
	public Aresta(){};
	
	public Aresta(Vertice origem, Vertice destino) {
		super();
		this.origem = origem;
		this.destino = destino;
	}
	
	public Vertice getOrigem() {
		return origem;
	}
	public void setOrigem(Vertice origem) {
		System.out.println("setOrigem:" + origem);
		this.origem = origem;
	}
	public Vertice getDestino() {
		return destino;
	}
	public void setDestino(Vertice destino) {
		System.out.println("setDestino:" + destino);
		this.destino = destino;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public Boolean getDirecao() {
		return direcao;
	}

	public void setDirecao(Boolean direcao) {
		this.direcao = direcao;
	}

	public Integer getLargura() {
		return largura;
	}

	public void setLargura(Integer largura) {
		this.largura = largura;
	}

	@Override
	public String toString() {
		return "Aresta [origem=" + origem + ", destino=" + destino + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((destino == null) ? 0 : destino.hashCode());
		result = prime * result + ((origem == null) ? 0 : origem.hashCode());
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
		Aresta other = (Aresta) obj;
		if (destino == null) {
			if (other.destino != null)
				return false;
		} else if (!destino.equals(other.destino))
			return false;
		if (origem == null) {
			if (other.origem != null)
				return false;
		} else if (!origem.equals(other.origem))
			return false;
		return true;
	}
	
	
	
}
