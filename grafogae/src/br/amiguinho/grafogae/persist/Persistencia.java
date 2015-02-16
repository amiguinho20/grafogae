package br.amiguinho.grafogae.persist;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import br.amiguinho.grafogae.entity.Aresta;
import br.amiguinho.grafogae.entity.Vertice;


public class Persistencia implements Serializable{
	
	private List<Vertice> vertices;	
	private List<Aresta> arestas;

	//-- singleton
	private static Persistencia instance = new Persistencia();
	
	//-- singleton
	private Persistencia(){
		 vertices = new ArrayList<>();
		 arestas = new ArrayList<>();
	}
	
	//-- singleton
	public static Persistencia getInstance(){
		return instance;
	}

	
	public Vertice incluir(Vertice vertice)
	{
		boolean incluiu = false;
		while (!incluiu)
		{
			int chave = (int) Math.floor(Math.random() * 100);
			vertice.setId(chave);
			if (!vertices.contains(vertice))
			{
				vertices.add(vertice);
				incluiu = true;
			}
		}
		return vertice;
	}
	
	public void excluir(Vertice vertice)
	{
		List<Aresta> arestaParaExclusao = new ArrayList<>();
		for (Aresta aresta : arestas)
		{
			if (aresta.getOrigem().equals(vertice) || aresta.getDestino().equals(vertice))
			{
				arestaParaExclusao.add(aresta);
			}
		}
		
		for (Aresta aresta : arestaParaExclusao)
		{
			arestas.remove(aresta);
		}
		
		vertices.remove(vertice);
	}
	
	public List<Vertice> listar()
	{
		return vertices;
	}
	
	public Vertice selecionar(int id){
		Vertice vertice = new Vertice(id);
		vertice = selecionar(vertice);
		return vertice;
	}
	
	public Vertice selecionar(Vertice vertice)
	{
		Vertice verticeSelecionado = null;
		if (vertices.contains(vertice))
		{
			int indice = vertices.indexOf(vertice);
			verticeSelecionado = vertices.get(indice);
		}
		return verticeSelecionado;
	}
	
	public void incluirAresta(Aresta aresta)
	{
		arestas.add(aresta);
	}
	
	public void excluirAresta(Aresta aresta)
	{
		arestas.remove(aresta);
	}

	public List<Aresta> listarAresta()
	{
		return arestas;
	}
}
