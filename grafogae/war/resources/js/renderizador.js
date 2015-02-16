/**
 * Amiguinho - Eduardo Correia da Silva
 * renderizador.js
 * v0.1
 */
(function(){
  
Renderer = function(canvas){
	//-- seleciona o canvas pelo id passado por parametro
	var canvas = $(canvas).get(0)
	//-- recupera o contexto 2D do canvas
	var ctx = canvas.getContext("2d");
	//-- recupera o motor grafico
	var gfx = arbor.Graphics(canvas)
	//-- cria a variavel particleSystem
	var particleSystem = null

	var that = {
		init:function(system){
			// O particleSystem chamara essa funcao uma vez log apos
			// o primero frame ser desenhado. Esse eh um bom lugar para 
			// inicializar configuracoes no canvas e passar o tamanho do canvas
			// para o particleSystem.
			
			//-- salva a referencia do particleSystem
			particleSystem = system
			
			//-- Informa para o particleSystem as dimensoes(tamanho) da tela para
			//-- ele poder mapear as coordenadas. Se o canvas for redimensionado, o 
			//-- screenSize deve ser configurado novamente com as novas dimensoes.
			particleSystem.screenSize(canvas.width, canvas.height)
			
			//-- configura uma distancia/borda interna de 80px
			particleSystem.screenPadding(90)
			
			//-- reconfigura as dimensoes
			$(window).resize(that.resize)
			that.resize()
			
			//-- configura alguns eventos para permitir arrastar (drag-drop)
			that.inicializarEventosDeMouse()
			
			//-- touch
			that.inicializarEventosDeToque()
			
//			canvas.addEventListener('touchmove', function(event) 
//			{
//				for (var i = 0; i < event.touches.length; i++) 
//				{
//				    var touch = event.touches[i];
//				    ctx.beginPath();
//				    ctx.arc(touch.pageX, touch.pageY, 20, 0, 2*Math.PI, true);
//				    ctx.fill();
//				    ctx.stroke();
//				}
//			}, false);
			
			
		},
		//-- redimensiona o tamanho do canvas conforme o tamanho da janela
		//-- chamado pelo 'init'
		resize:function(){
			//-- redimenciona o canvas
			canvas.width = $(window).width()
	        canvas.height = $(window).height()
	        
	        //-- redimenciona o particleSystem
	        particleSystem.screenSize(canvas.width, canvas.height)
	        
	        //-- chama a funcao de redesenho
	        that.redraw()
	    },
		redraw:function(){
			// O redraw sera chamado repetidamente durante a execucao enquanto a posicao
			// dos vertices mudarem. As novas posicoes para os vertices podem ser acessadas
			// pelo atributo .p de um dado vertice. Entretanto o p.x & p.y sao as coordenadas
			// que o particleSystem desenhara na tela. O mapa pode ser rastreado ou iterado
			// pelo .eachNode (e .eachEdge), permitindo recuperar as coordenadas.
			
			//-- limpa a area grafica
			gfx.clear() // convenience ƒ: clears the whole canvas rect

			//-- guarda as posicoes dos vertices para desenhar as arestas
			var nodeBoxes = {}

			//-- cor de fundo do canvas
			ctx.fillStyle = "white"
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			
			
			//-- desenha o vertice
			particleSystem.eachNode(function(node, pt){
				// node: {mass:#, p:{x,y}, name:"", data:{}}
				// pt:   {x:#, y:#} coordenadas para a posicao do node na tela
			
				//-- calcula o tamanho do nome (label)
				var label = node.data.label || ""
				var largura = ctx.measureText( "" + label).width + 10
				if (!("" + label).match(/^[ \t]*$/))
				{
					//-- descarta as casas decimais e considera apenas o numero inteiro
				    pt.x = Math.floor(pt.x)
				    pt.y = Math.floor(pt.y)
				}
				else
				{
					label = null
				}

				// define a cor do vertice
				if (node.data.color) 
				{
					ctx.fillStyle = node.data.color
				}
				else
				{
					ctx.fillStyle = "rgba(0,0,0,.2)" 
				}
				if (node.data.color == 'none') 
				{
					ctx.fillStyle = "white"
				}
				
				//-- define a forma e desenha
				if (node.data.shape == 'dot')
				{	//-- circulo
					gfx.oval(pt.x - largura / 2, pt.y - largura / 2, largura, largura, {fill:ctx.fillStyle})
					nodeBoxes[node.name] = [pt.x - largura / 2, pt.y-largura / 2, largura, largura]
				}
				else
				{	//-- retangulo
					gfx.rect(pt.x - largura / 2, pt.y - 10, largura, 20, 4, {fill:ctx.fillStyle})
					nodeBoxes[node.name] = [pt.x -largura / 2, pt.y - 11, largura, 22]
				}

		        //-- desenha o texto
				if (label)
				{
					ctx.font = "12px Helvetica"
		            ctx.textAlign = "center"
		            ctx.fillStyle = "white"
		            if (node.data.color == 'none' || node.data.color == '#ffffff' || node.data.color == '#FFFFFF')
		            {	//-- inverte a cor do texto, pois o fundo esta branco
		            	ctx.fillStyle = '#333333'
		            }
		            ctx.fillText(label || "", pt.x, pt.y+4)
		            ctx.fillText(label || "", pt.x, pt.y+4)
				}

/*				
				// desenha um retangulo centralizado em pt
				var largura = 10
				var cor = null
				if (node.data.alone)
				{
					cor = "orange"
				}
				else
				{
					cor = "black"
				}
				ctx.fillStyle = cor
				ctx.fillRect(pt.x - largura / 2, pt.y - largura / 2, largura, largura)
*/				
			})    			

			//-- desenha a aresta
			particleSystem.eachEdge(function(edge, pt1, pt2){
				// edge: {source:Node, target:Node, length:#, data:{}}
				// pt1:  {x:#, y:#} posicao do vertice de origem em coordenadas da tela
				// pt2:  {x:#, y:#} posicao do vertice de origem em coordenadas da tela
			
				//-- desenha uma linha do pt1 ate o pt2
/*
				ctx.strokeStyle = "rgba(0, 0, 0, .333)" //preto com alfa .333
				ctx.lineWidth = 1
				ctx.beginPath()
				ctx.moveTo(pt1.x, pt1.y) // mover-se de (origem)
				ctx.lineTo(pt2.x, pt2.y) // mover-se ate (destino)
				ctx.stroke()
*/
				var largura = edge.data.weight
				var cor = edge.data.color
				
				if (!isNaN(largura))
				{
					largura = parseFloat(largura) 
				}
				else
				{
					largura = 1
				}
				
				if (!cor || ("" + cor).match(/^[ \t]*$/))
				{
					cor = null
				}
				if (!cor)
				{
					cor = "#cccccc"
				}
				
				
				//-- procura o ponto inicial
				var origem = intersect_line_box(pt1, pt2, nodeBoxes[edge.source.name])
				var destino = intersect_line_box(origem, pt2, nodeBoxes[edge.target.name])

				ctx.save()
				ctx.beginPath()
				ctx.lineWidth = largura
				ctx.strokeStyle = cor
				ctx.fillStyle = null
				ctx.moveTo(origem.x, origem.y)
				ctx.lineTo(destino.x, destino.y)
				ctx.stroke()
				ctx.restore()
				
				//-- desenha uma seta na ponta da aresta
				if (edge.data.directed)
				{ 
					ctx.save()
					var setaTamanho = 6 + largura
					var setaLargura = 2 + largura
					ctx.fillStyle = cor
					ctx.translate(destino.x, destino.y);
					ctx.rotate(Math.atan2(destino.y - origem.y, destino.x - origem.x));
					
					//-- deleta alguma seta sobre a aresta se existir (no caso de estar escondido/hidden)
					ctx.clearRect(-setaTamanho / 2, -largura / 2, setaTamanho / 2, largura);
					
					//-- desenho
					ctx.beginPath();
					ctx.moveTo(-setaTamanho, setaLargura);
					ctx.lineTo(0,0);  //-- ponta da seta
					ctx.lineTo(-setaTamanho, -setaLargura); //--cabeca da seta esquerda
					ctx.lineTo(-setaTamanho * 0.8, 0);
					ctx.closePath();
					ctx.fill();
					ctx.restore();
				}
			})
      },
              
      inicializarEventosDeMouse:function(){
 
    	var dragged = null;
 
    	//-- configura um handler(auxiliar) que inicializara os listeners para
    	//-- os eventos do mouse, como mouseup, dragging etc.
    	var handler = {
    		//-- evento para o click
    		clicked:function(e){
    			var pos = $(canvas).offset();
    			_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
    			dragged = particleSystem.nearest(_mouseP);
    			
    			if (dragged && dragged.node !== null)
    			{
    				//Enquanto o vertice esta sendo arrastado
    				//nao deixa o sistema de fisica mexe-lo.
    				dragged.node.fixed = true
    			}
    			
    			$(canvas).bind('mousemove', handler.dragged)
    			$(window).bind('mouseup', handler.dropped)
    			
    			return false
    		},
    		//-- evento para o arrastar
    		dragged:function(e){
    			var pos = $(canvas).offset();
    		    var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

    		    if (dragged && dragged.node !== null)
    		    {
    		    	var p = particleSystem.fromScreen(s)
    		    	dragged.node.p = p
    		    }
    		    
    		    return false
    		},
    		//-- evento para o soltar
    		dropped:function(e){
    			if (dragged === null || dragged.node === undefined) return
    			if (dragged.node !== null) dragged.node.fixed = false
    			dragged.node.tempMass = 1000
    			dragged = null
    			
    			$(canvas).unbind('mousemove', handler.dragged)
    			$(window).unbind('mouseup', handler.dropped)

    			_mouseP = null

    			return false
    		}
        }
    	
    	//-- comeca o listener
        $(canvas).mousedown(handler.clicked);
    	}, //-- inicializarEventosDeMouse
      
    	inicializarEventosDeToque:function(){
    		
        	var dragged = null;

        	var toqueHandler = {
        		//-- evento para o inicio do toque
        		touchstart:function(e){
        			var pos = $(canvas).offset();
        			_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
        			dragged = particleSystem.nearest(_mouseP);
        			
        			if (dragged && dragged.node !== null)
        			{
        				//Enquanto o vertice esta sendo arrastado
        				//nao deixa o sistema de fisica mexe-lo.
        				dragged.node.fixed = true
        			}
        			
        			$(canvas).bind('touchmove', toqueHandler.touchmove)
        			$(window).bind('touchend', toqueHandler.touchend)
        			
        			return false
        		},
        		//-- evento para o arrastar
        		touchmove:function(e){
        			var pos = $(canvas).offset();
        		    var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

        		    if (dragged && dragged.node !== null)
        		    {
        		    	var p = particleSystem.fromScreen(s)
        		    	dragged.node.p = p
        		    }
        		    
        		    return false
        		},
        		//-- evento para o soltar
        		touchend:function(e){
        			if (dragged === null || dragged.node === undefined) return
        			if (dragged.node !== null) dragged.node.fixed = false
        			dragged.node.tempMass = 1000
        			dragged = null
        			
        			$(canvas).unbind('touchmove', toqueHandler.touchmove)
        			$(window).unbind('touchend', toqueHandler.touchend)

        			_mouseP = null

        			return false
        		}
            }

        	//touchstart
        	//touchmove
        	//touchend
        	
        	//-- comeca o listener
            $(canvas).bind('touchstart', toqueHandler.touchstart);
    		
    	}
      
      
    } // -- fim do 'that'
	
	//-- helpers para procurar onde desenhar as arestas
    var intersect_line_line = function(p1, p2, p3, p4)
    {
		var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
		if (denom === 0) return false // lines are parallel
		var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
		var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;

		if (ua < 0 || ua > 1 || ub < 0 || ub > 1)  return false
		return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
    }
	
    var intersect_line_box = function(p1, p2, boxTuple)
    {
        var p3 = {x:boxTuple[0], y:boxTuple[1]},
        	w = boxTuple[2],
        	h = boxTuple[3]

    	var tl = {x: p3.x, y: p3.y};
    	var tr = {x: p3.x + w, y: p3.y};
    	var bl = {x: p3.x, y: p3.y + h};
    	var br = {x: p3.x + w, y: p3.y + h};

    	return	intersect_line_line(p1, p2, tl, tr) ||
           		intersect_line_line(p1, p2, tr, br) ||
           		intersect_line_line(p1, p2, br, bl) ||
           		intersect_line_line(p1, p2, bl, tl) ||
           		false
    }
	
	
    return that
  }    
})()