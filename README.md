# moom.js
A maneira mais simples de trabalhar eventos e formulários em javascript.



<html>
<head>
	<link rel="stylesheet" type="text/css" href="moom.css">
</head>
<body>


<div moom-controller="moomController">
	<div moom-view="list">
		<div>
			<table>
				<tbody>
					<tr moom-for="item in list">
						<td moom-text="nome"></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div>
			<input name="nome">
			<input name="sobrenome" moom-event="keyup->mostraMensagem">
			<input name="idade">
			<input name="anos">
			<select name="sexo">
				<option>Masculino</option>
				<option>Feminino</option>
			</select>
		</div>

		<button moom-event="save" moom-updateTo="sobrenome">Save</button>
		<button moom-event="addData">Adicionar data!</button>
		<button moom-event="mostra">Mostra Ok!</button>

		<button moom-toView="form">To Form</button>
	</div>

	<div moom-view="form">
		<div>
			Form
		</div>

		<button moom-event="salvar" moom-toView="list">Salvar</button>
		<button moom-toView="list">To List</button>
	</div>
</div>



<br>




<div moom-controller="moomCtrl01">
	<div moom-view="pane01">
		<div>
			Pane 01
		</div>

		<button moom-toView="pane02">To Pane 02</button>
	</div>

	<div moom-view="pane02">
		<div>
			Pane 02
		</div>
		<button moom-toView="pane01">To Pane 01</button>
	</div>
</div>



<br>




<div moom-controller="moomCtrl02">
	<div moom-view="teste">
		<div>
			Unica view
		</div>

		<button moom-event="teste">Teset</button>
	</div>
</div>



<br>




<div moom-controller="sample">
	<div moom-view="index">
		<p moom-event="mousedown->alterarCor">Qualquer texto aqui!</p>
		<button moom-event="evento">Evento</button>
	</div>
</div>





<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="moom.js"></script>
<script type="text/javascript">
	var moom = new Moon('moomController', {
		data : {
			list: [
				{nome: 'Wolmir'},
				{nome: 'Cesar'},
				{nome: 'Garbin'},
				{nome: 'Teste'},
				{nome: 'masdlkjasldjalsdjk'}
			],
			pessoas : [
				{nome: "Wolmir"}
			]
		},
		events : {
			save : function($ele, data) {
				$.ajax({
					type: "GET",
					url: "remove-file",
					data: data,
					dataType: "json",
					traditional:true,
					cache:true,
					contentType:"application/x-www-form-urlencoded; charset=UTF-8",
					timeout:45000
				}).done(function(json) {
					alert( json );
				}).fail(function(){
					alert( "fail" );
				});
			},
			addData : function() {
				moom.set( {nome: 'Wolmir Garbin', anos: 12, idade: 23} );
			},
			mostra : function() {
				moom.set( {nome: 'Wolmir', sobrenome: 'Garbin'} );
			},
			qualquer : function($ele) {
				alert('Qualquer coisa ');
				$ele.text('Teste st est stse tset');
			},
			mostraMensagem : function($ele, data) {
				alert($ele.val() +' ou '+ data.sobrenome );
			}
		}
	});


	new Moon('moomCtrl01');


	new Moon('moomCtrl02', {
		events: {
			teste : function() {
				alert('Teste');
			}
		}
	});


	new Moon('sample', {
		events: {
			evento: function($ele, data) {
				alert('Teste');
			},
			alterarCor : function($ele) {
				$ele.css({color: '#CCC'});
			}
		}
	});

</script>
</body>
</html>