function PRODUTO(cod, desc, valor, seq){
  this.cod = cod;
  this.desc = desc;
  this.valor = valor;
  this.seq = seq;
}

function lista_produto(){
  this.itens = new Array();

  this.add = function(cod, desc, valor){
    itens.push(new PRODUTO(cod, desc, valor, this.size() + 1));
  };

  this.existe = function(cod){
    for (var i = 0; i < this.itens.length; i++) {
      if(this.itens[i].cod == cod)
        return this.itens[i];
    }
    return null;
  }

  this.size = function(){
    var size = 0;
    for (var i = 0; i < this.itens.length; i++) {
      size += this.itens[i].qtd;
    }
    return size;
  }

  this.remove = function(cod, seq){
    for (var i = 0; i < this.itens.length; i++) {
      if(this.itens[i].cod == cod && this.itens[i].seq == seq){
        this.itens.splice(i, 1);
        return true;
      }
    }
    return false;
  };
}

var lista_produto = new lista_produto();
$(document).ready(function(){
  $("#btn-carrinho").click(function(){
    var html = "";
    for (var i = 0; i < lista_produto.itens.length; i++) {
      html += '<li><div class="media"><div class="media-left col-xs-3 col-sm-2 col-md-2"><a href="#" class="thumbnail">' +
              '<img class="media-object img-responsive" src="images/iphone-1.jpg"></a></div><div class="media-body">' +
              '<button type="button" class="close remover-item"><span aria-hidden="true">&times;</span></button>' +
              '<h4 class="media-heading">' + lista_produto.itens[i].desc + '</h4><p>10x R$ ' +
              parseFloat(lista_produto.itens[i].valor).toFixed(2) + '</p><p>ou R$ ' + lista_produto.itens[i].valor +
              ' à vista</p></div></div></li>';
    }
    $("#").html();
  });
});
