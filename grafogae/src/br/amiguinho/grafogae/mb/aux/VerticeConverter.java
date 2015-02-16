package br.amiguinho.grafogae.mb.aux;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

import br.amiguinho.grafogae.entity.Vertice;
import br.amiguinho.grafogae.persist.Persistencia;

@FacesConverter(value = "verticeConverter")
public class VerticeConverter implements Converter{


	Persistencia persistencia = Persistencia.getInstance();
	
	@Override
	public Object getAsObject(FacesContext context, UIComponent component, String value) {
		Vertice vertice = null;
		if (value != null && !value.trim().isEmpty()) 
		{
			int id = Integer.parseInt(value);
			vertice = persistencia.selecionar(id);
		}
		return vertice;
	}

	@Override
	public String getAsString(FacesContext context, UIComponent component, Object value) {
		String id = "";
		if (value instanceof Vertice) 
		{
			Vertice vertice = (Vertice) value;
			id = String.valueOf(vertice.getId());
		}
		return id;
	}

}
