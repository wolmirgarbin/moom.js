# moom.js
A maneira mais simples de trabalhar eventos e formulários em javascript.


Você conhece JQuery?
Você gosta de JQuery?
Você quer utilizar ou aprender outros frameworks pra aumentar sua produtividade?


Apresentamos a você o moom.js


A maneira mais simples de tratar eventos e escrever javascript de maneira leve, rápida e descomplicada. 
E o melhor, funciona com JQUERY.


# Como iniciar 

Mais fácil impossível!!!

Faça a importação do jQuery em sua página e a importação do Moom e pronto, nada de nodejs, nada de typescript e nada de outros frameworks atrasando o seu desenvolvimento.

<!-- importe o css -->
<link rel="stylesheet" type="text/css" href="moom.css">

<!-- importe o js -->
<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="moom.js"></script>

# Como funciona

Tudo no moom é baseado em controller e view. Basta colocar em seu html em que vai utilizar o moom como controlador o moom-controller e o moom-view, como mostrado abaixo.

<div moom-controller="moomCtrl01">
	<div moom-view="teste">
		<div>
			Unica view
		</div>
	</div>
</div>

e iniciar o moom como controlador:

new Moom('moomCtrl01');

# Tratando evendos 

É mais fácil que chorar em alemão!!!

Basta colocar dentro de qualquer controlador do moom em qualquer tag do HTML o atributo moom-event e dizer qual evento ele deve chamar.

<div moom-controller="moomCtrl02">
	<div moom-view="teste">
		<button moom-event="alerta">Alerta</button>
	</div>
</div>

O código js fica assim:

new Moon('moomCtrl02', {
	events: {
		alerta : function() {
			alert('Isso funciona mesmo!');
		}
	}
});

Automaticamente o evento é associado ao click mas você pode dizer em qual evento chamar sem alterar o código, que beleza!!!

Como?
No botão acrescente o evento e aponte para o evento que deve chamar:

<button moom-event="mouseup->alerta">Alerta</button>

Simples assim, logo adicionaremos uma versão mais incrivel ainda do moom.js o menor javascript para sua vida!
