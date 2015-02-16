package br.amiguinho.grafogae.mb;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.event.AjaxBehaviorEvent;

import br.amiguinho.grafogae.entity.Aresta;
import br.amiguinho.grafogae.entity.Vertice;
import br.amiguinho.grafogae.persist.Persistencia;

@ManagedBean
@ApplicationScoped
public class GrafoMB implements Serializable{
	
	private Persistencia persistencia = Persistencia.getInstance();
	
	private Vertice vertice;
	private List<Vertice> vertices;
	private List<Vertice> verticesDestino;
	
	private Aresta aresta;
	private List<Aresta> arestas;

	@PostConstruct
	public void init()
	{
		setVertice(new Vertice());
		setVertices(persistencia.listar());
		setAresta(new Aresta());
		setArestas(persistencia.listarAresta());
	}
	
	public void listarVerticesDestino(AjaxBehaviorEvent event) {
		verticesDestino = new ArrayList<>();
		verticesDestino.addAll(vertices);
		verticesDestino.remove(aresta.getOrigem());
		
		//-- verifica se existe uma aresta previa.
		//-- evitar criar uma aresta ja existente
		for (Aresta arestaAux : getArestas())
		{
			if (arestaAux.getOrigem().equals(aresta.getOrigem()))
			{
				verticesDestino.remove(arestaAux.getDestino());
			}
			if (arestaAux.getDestino().equals(aresta.getOrigem()))
			{
				verticesDestino.remove(arestaAux.getOrigem());
			} 
		}  
	}
	
	public void incluirVertice(){
		
		if (vertice.getCor().trim().isEmpty()){
			vertice.setCor("ffffff");
		}
		
		//-- incluir novo vertice
		Vertice verticeIncluido = persistencia.incluir(vertice);    
		    
		//--limpa e atualiza                     
		init();
		
		System.out.println("incluido: " + verticeIncluido + " .. qtd[" + getVertices().size() + "]" );
		  
	}
	

	public void incluirAresta()
	{
		if (aresta.getOrigem() != null && aresta.getDestino() != null)
		{
			if (aresta.getCor().trim().isEmpty())
			{
				aresta.setCor("cccccc");
			}
			
			persistencia.incluirAresta(aresta);
			System.out.println("Aresta: " + aresta + " incluida com sucesso.");
			init();
		}
	}

	public void excluirVertice()
	{
		System.out.println("excluir vertice...");
		//Vertice vertice = comboVerticeMB.getVertice();
		if (vertice != null)
		{
			//Vertice vertice = new Vertice(idVertice);
			persistencia.excluir(vertice);

			System.out.println("vertice excluido: " + vertice);
			
			//-- limpa e atualiza
			init();
			
		}
	}
	
	public void excluirAresta()
	{
		System.out.println("excluir aresta: " + aresta);
		if (aresta != null)
		{
			persistencia.excluirAresta(aresta);
			
			init();
		}
	}
		 

	public Vertice getVertice() {
		return vertice;
	}

	public void setVertice(Vertice vertice) {
		this.vertice = vertice;
	}


	public List<Vertice> getVertices() {
		return vertices;
	}


	public void setVertices(List<Vertice> vertices) {
		this.vertices = vertices;
	}


	public Aresta getAresta() {
		return aresta;
	}


	public void setAresta(Aresta aresta) {
		this.aresta = aresta;
	}


	public List<Vertice> getVerticesDestino() {
		return verticesDestino;
	}


	public void setVerticesDestino(List<Vertice> verticesDestino) {
		this.verticesDestino = verticesDestino;
	}

	public List<Aresta> getArestas() {
		return arestas;
	}

	public void setArestas(List<Aresta> arestas) {
		this.arestas = arestas;
	}

}
