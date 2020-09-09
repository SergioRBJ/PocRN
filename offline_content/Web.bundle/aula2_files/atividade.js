function exerMultiplaEscolha(recuperaIdQuestao) {	
	var idQuestaoAux = $(recuperaIdQuestao).closest('[data-id]');
	var idQuestao = idQuestaoAux.data('id');
	var flagCorrecao = 0;
	var idInputRadio = $("#exercicio_"+idQuestao+" input[name='radio-stacked']:checked").attr("id");
	
	var valorEscolhido = $("#exercicio_"+idQuestao+" input[name='radio-stacked']:checked").val();	
		if(valorEscolhido) {
			if(valorEscolhido=="true"){
				flagCorrecao = 1;
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+'').addClass('atividade-feedback_positivo');
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+' .texto-feedback_padrao_s').addClass('d-block');	
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+'').show();				
			} else {
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+'').addClass('atividade-feedback_negativo');
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+' .texto-feedback_padrao_n').addClass('d-block');
				$('#exercicio_'+idQuestao+' .feedback_exercicio_'+idQuestao+'').show();							
			}			
			$('#exercicio_'+idQuestao+' .btn-primary').prop('disabled', true);
			bloquearAlternativas(idQuestao, idInputRadio, flagCorrecao);
		} else {			
			alertMarcacaoObrigatoria(idQuestao);
		}	
		
}

function bloquearAlternativas(idQuestao, idInputRadio, flagCorrecao){
	var alternativaCerta= "";
	var posicaoAternativaCerta=0;
	
	for(var x =1; x <= $("#exercicio_"+idQuestao).find("input").length; x++){
	
		alternativaCerta = $("#exercicio_"+idQuestao+" #exercicio_"+idQuestao+"_radioStacked"+x+"").val();		
		
		if(alternativaCerta=="true"){
			posicaoAternativaCerta = x;
		}else if (alternativaCerta=="false"){	
			$('#exercicio_'+idQuestao+' #exercicio_'+idQuestao+'_radioStacked'+x+'').prop('disabled', true);			
		} 
	}
	
	if (flagCorrecao == 1) {
		//$('.custom-control-input:checked~.custom-control-indicator').css({"background-color" : "#009900"});		
		$('.exercicio_'+idQuestao+'').addClass("checkInput");	
	}else{		
		console.log('passou aqui')		
		$('.custom-control-input:checked~.custom-control-label::before').css("background-color", "#f00");	
		
		$('.exercicio_'+idQuestao+'').addClass("checkInput");		
	}
	
}

function alertMarcacaoObrigatoria(idQuestao){	
	$('#exercicio_'+idQuestao+' .mx-auto').popover('show');	
	contaTempo(idQuestao);
}

function alertMarcacao(idQuestao){	
	$('#exercicio_'+idQuestao+' .mx-auto').popover('show');
	//$('#exercicio_'+idQuestao+' #resultado').popover({content: 'teste', show:'0'});
	contaTempo(idQuestao);
}

function contaTempo(idQuestao){
	setTimeout(
	  function() 
		{
			$('#exercicio_'+idQuestao+' .mx-auto').popover('hide');	
	  }, 850);
}		
/*
(function (){
	$('button').on('click', function () {
	    var target = $(this).closest('[data-id]');
	    alert(target.data('id'));
	});
})();*/

function alertMarcacaoEsconder(idQuestao){	
	$('#exercicio_'+idQuestao+' .mx-auto').popover('hide');
	//$('#exercicio_'+idQuestao+' #resultado').popover({content: 'teste', show:'0'});
	//contaTempo(idQuestao);
}


//ATIVIDADE VERDADEIRO OU FALSO
function exerVF(recuperaIdQuestao) {
	var idQuestaoAux = $(recuperaIdQuestao).closest('[data-id]');
	var idQuestao = idQuestaoAux.data('id');

	//var vf = document.getElementsByClassName('#exercicio_'+idQuestao+' .atv-vf-alternativa');	
	var vf = $('#exercicio_'+idQuestao+' div[class=atv-vf-alternativa]'); 
	//console.log(vf.length)

	for (var i = 1; i < vf.length+1; i++) {
		
		var radios = $('#exercicio_'+idQuestao+' input[name=atv-vf-op-'+i+']'); 
		//var radios = document.getElementsByName("atv-vf-op-"+i);
		//console.log(radios);

		var valorEscolhido = $('#exercicio_'+idQuestao+' .atv-vf-alternativa input[name=atv-vf-op-'+i+']:checked').val(); 

		var itensMarcados = validaRadio();



		if(itensMarcados == vf.length){	
			
			
			$('#exercicio_'+idQuestao+ ' #btnSubmit').popover('hide');	
			if(valorEscolhido == "true"){

				
				$('#exercicio_'+idQuestao+ ' .certo_'+i).addClass("corverde");
				// console.log("entrou aqui certo");
				$('#exercicio_'+idQuestao+ ' #feedback-vf').show();
				$('#exercicio_'+idQuestao+ ' .mx-auto').prop('disabled', true);
				
				alertMarcacaoEsconder(idQuestao);
				

			}else{
				
				$('#exercicio_'+idQuestao+ ' .falso_'+i).addClass("corErrada");
				$('#exercicio_'+idQuestao+ ' #feedback-vf').show();
				// console.log("entrou aqui errado");
				}

		}else{
			$('#exercicio_'+idQuestao+ ' .mx-auto').popover('show');
			alertMarcacao(idQuestao);
		}	
	}

	 function validaRadio(){
	 	
	 	var contador = 0;
	 	
	 	var vf2 = $('#exercicio_'+idQuestao+' div[class=atv-vf-alternativa]'); 
	 	//var vf2 = document.getElementsByClassName("atv-vf-alternativa");	
        
        for(var i = 1; i < vf2.length+1; i++) {
          	
          	var radios2 = $('#exercicio_'+idQuestao+' input[name=atv-vf-op-'+i+']');
          	
          	//var radios2 = document.getElementsByName("atv-vf-op"+i);
          	
          	var rbmarcado = $('#exercicio_'+idQuestao+' .atv-vf-alternativa input[name=atv-vf-op-'+i+']:checked').val(); 
          	//var rbmarcado  = $('.atv-vf-alternativa input[name=atv-vf-op-'+i+']:checked').val();
        	
        	if(rbmarcado != undefined){
        	
        		contador = contador + 1
        	}          	
        }
        
        return contador;
	}
}



//ATIVIDADE COMPLETE AS LACUNAS
function exerCompleteLacunas(recuperaIdQuestao) {
	var idQuestaoAux = $(recuperaIdQuestao).closest('[data-id]');
	var idQuestao = idQuestaoAux.data('id');
	
	var classeTxt = $('#exercicio_'+idQuestao+ ' .txtLacunas');
	//console.log(classeTxt);
	var contaTxtPreenchido = $('#exercicio_'+idQuestao+ ' .txtLacunas').length;

	var validacaoPreenchidos = ValidaLacunas();
	
	if(validacaoPreenchidos == contaTxtPreenchido){

		for(y = 0 ; y < classeTxt.length; y++){
		
			var idTxt = $('#exercicio_'+idQuestao+' #txtLacunas-'+y+'');

			var valorTxt = $('#exercicio_'+idQuestao+' #txtLacunas-'+y+'').val();
			//console.log(valorTxt.length);				
			
			$('#exercicio_'+idQuestao+ ' #feedback-completeLacunas').show();
			//document.getElementById("btnLacunas").disabled = true;
			$('#exercicio_'+idQuestao+ ' .mx-auto').prop('disabled', true);
			$('#exercicio_'+idQuestao+ ' .txtLacunas').prop('disabled', true);

		}
	}else{

		$('#exercicio_'+idQuestao+ ' .mx-auto').popover('show');
		alertMarcacao(idQuestao);

	}

	function ValidaLacunas(){
		var contadorlacuna = 0;
		
		//var classeValidaTxt = $('#exercicio_'+idQuestao+ ' .txtLacunas');
		var classeValidaTxt = $('#exercicio_'+idQuestao+ ' .txtLacunas').length;
		
		
		for(var a = 0; a < classeValidaTxt; a++){

			var idValidaTxt = $('#exercicio_'+idQuestao+'  #txtLacunas-'+a+'');
			


			var valorValidaTxt = $('#exercicio_'+idQuestao+' #txtLacunas-'+a+'').val();
			console.log(valorValidaTxt)

			if(valorValidaTxt != ""){

				contadorlacuna = contadorlacuna + 1
				//console.log("passou aqui");
			}
		}
		
		return contadorlacuna;
	}
}

//ATIVIDADE DISCURSIVA
function exerDiscursiva(recuperaIdQuestao) {
	
	var idQuestaoAux = $(recuperaIdQuestao).closest('[data-id]');
	var idQuestao = idQuestaoAux.data('id');

	//var radios2 = $('#exercicio_'+idQuestao+' input[name=atv-vf-op-'+i+']');
	var txtArea = $('#exercicio_'+idQuestao+' #txtAreaDiscursiva').val();
	console.log(txtArea); 
	var payload = "{ questao: "+idQuestao+", resposta: "+ txtArea +" }";
	window.ReactNativeWebView.postMessage(payload);
	if(txtArea != ""){

		$('#exercicio_'+idQuestao+ ' #feedback-Discursiva').show();
		//document.getElementById("btnDiscursiva").disabled = true;
		$('#exercicio_'+idQuestao+ ' .mx-auto').prop('disabled', true);
		$('#exercicio_'+idQuestao+ ' #txtAreaDiscursiva').prop('disabled', true);
		
	}else{

		$('#exercicio_'+idQuestao+ ' .mx-auto').popover('show');
		console.log("passou aqui")
		//$('#btnDiscursiva').popover('show');
		alertMarcacao(idQuestao);

	}
}

//ATIVIDADE CORRELACIONE

function exerCorrelacione(recuperaIdQuestao) {
		var idQuestaoAux = $(recuperaIdQuestao).closest('[data-id]');
		var idQuestao = idQuestaoAux.data('id');

		//var classeCrln = document.getElementsByClassName("atv-correlacione");
		var classeCrln = $('#exercicio_'+idQuestao+' .atv-correlacione'); 
		//var classeCrln = $('#exercicio_'+idQuestao+' div[class=atv-correlacione]'); 

		for (var a = 0; a < classeCrln.length; a++) {

			//var radiosCrln = document.getElementsByName("options-"+a);
			var radiosCrln = $('#exercicio_'+idQuestao+' input[name=options-'+a+']');

			var radiosCrlnEscolhido = $('#exercicio_'+idQuestao+' .atv-correlacione input[name=options-'+a+']:checked');


			//var radiosCrlnEscolhido = $('.atv-correlacione input[name=options-'+a+']:checked').val();  
			var radiosCrlnValorEscolhido = $('#exercicio_'+idQuestao+' .atv-correlacione input[name=options-'+a+']:checked').val();
			//console.log(radiosCrlnValorEscolhido + radiosCrlnEscolhido);

			var itensMarcadosCrln = validaRadioCrln();



			if(itensMarcadosCrln == radiosCrln.length){

				if(radiosCrlnValorEscolhido == "true"){
					$('#exercicio_'+idQuestao+ ' #feedback-padrao-04').show();
					//document.getElementById("btnCorrelacione").disabled = true;
					$('#exercicio_'+idQuestao+ ' .mx-auto').prop('disabled', true);

					$('#exercicio_'+idQuestao+ ' .vdd_'+a).addClass("corverde");
				
				}else{

						$('#exercicio_'+idQuestao+' .atv-correlacione input[name=options-'+a+']:checked').closest("label").css({"background-color": "#8B0000"});

						$('#exercicio_'+idQuestao+ ' #feedback-padrao-04').show();
						//document.getElementById("btnCorrelacione").disabled = true;
						$('#exercicio_'+idQuestao+ ' .mx-auto').prop('disabled', true);
						//$('#exercicio_'+idQuestao+ ' .fs_'+a).addClass("corErrada");
				}

			}else{
				
				//$('#btnCorrelacione').popover('show');
				$('#exercicio_'+idQuestao+ ' .mx-auto').popover('show');
				alertMarcacao(idQuestao);
			}

		}

		function validaRadioCrln(){
	 		
	 		var contadorValidaRbCrln = 0;
	 		
	 		//var classeCrlnValida = document.getElementsByClassName("atv-correlacione");
	 		var classeCrlnValida = $('#exercicio_'+idQuestao+' .atv-correlacione');	
        	
        	for(var z = 0; z < classeCrlnValida.length; z++) {
          		
          		//var radios2 = document.getElementsByName("options-"+z);
          		var radios2 = $('#exercicio_'+idQuestao+' input[name=options-'+z+']');
          		
          		//var rbmarcado  = $('.atv-correlacione input[name=options-'+z+']:checked').val();
          		var rbmarcado = $('#exercicio_'+idQuestao+' .atv-correlacione input[name=options-'+z+']:checked').val();
        		
        		if(rbmarcado != undefined){
        			contadorValidaRbCrln = contadorValidaRbCrln + 1
        		}          	
        	}
        	return contadorValidaRbCrln;
		}

}



//$(".fdsf").ad()