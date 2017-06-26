function PRODUTO(cod, desc, valor, parcelas, juros, seq){
  this.cod = cod;
  this.desc = desc;
  this.valor = valor;
  this.parcelas = parcelas;
  this.juros = juros;
  this.seq = seq;
}

function lista_produtos(){
  this.itens = new Array();

  this.add = function(cod, desc, valor, parcelas, juros){
    this.itens.push(new PRODUTO(cod, desc, valor, parcelas, juros, 0));
  };

  this.get = function(cod){
    for (var i = 0; i < this.itens.length; i++) {
      if(this.itens[i].cod == cod)
        return this.itens[i];
    }
    return null;
  }
}

function lista_itens(){
  this.itens = new Array();

  this.add = function(produto){
    this.itens.push(produto);
  };

  this.get = function(cod){
    for (var i = 0; i < this.itens.length; i++) {
      if(this.itens[i].cod == cod)
        return this.itens[i];
    }
    return null;
  }

  this.proxSequencia = function(){
    if(this.itens.length == 0)
      return 1;
    return this.itens[this.itens.length -1].seq + 1;
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

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

var carrinho = new lista_itens();
var lista_produto = new lista_produtos();
lista_produto.add(1, 'Refrigerador Brastemp Inverse BRE50NK 422 Litros Inox', 2699.30, 6, 11.103);
lista_produto.add(2, 'Smartphone Apple iPhone 7 128GB', 3199.00, 10, 14.585);
lista_produto.add(3, 'Smart TV Samsung Série 4 UN32J4300AG 32 polegadas LED Plana', 1139.90, 10, 17.65);

function atualizaLista(){
  var html = "";
  var total = 0;
  for (var i = 0; i < carrinho.itens.length; i++) {
    html += '<li id="item-' + carrinho.itens[i].cod +'-' + carrinho.itens[i].seq +
            '"><div class="media"><div class="media-left col-xs-3 col-sm-2 col-md-2"><a href="#" class="thumbnail">' +
            '<img class="media-object img-responsive" src="images/' + carrinho.itens[i].cod +'-1.jpg"></a></div><div class="media-body">' +
            '<button type="button" class="close remover-item"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="media-heading">' + carrinho.itens[i].desc + '</h4><p>' + carrinho.itens[i].parcelas + 'x R$ ' +
            ((carrinho.itens[i].valor + carrinho.itens[i].valor * (carrinho.itens[i].juros / 100))  / carrinho.itens[i].parcelas).format(2, 3, ".", ",") + '</p><p>ou R$ ' + carrinho.itens[i].valor +
            ' à vista</p></div></div></li>';
    total += carrinho.itens[i].valor;
  }
  $(".navbar-nav").html(html);
  $("#footer-carrinho p:nth-child(2)").html("10x R$ " + (total / 10).format(2, 3, ".", ","));
  $("#footer-carrinho p:nth-child(3)").html("ou R$ " + total.format(2, 3, ".", ","));
}

$(document).ready(function(){
  $("#btn-carrinho").click(function(){
    atualizaLista();
  });

  $(".button-carrinho").click(function(){
    var item = $(this).parents("li").attr("id").replace("produto-", "");
    item = lista_produto.get(item);
    if(item != null)
      carrinho.add(new PRODUTO(item.cod, item.desc, item.valor, item.parcelas, item.juros, carrinho.proxSequencia()));
    atualizaLista();
  });

  $('#list-images-refrig li').click(function() {
    var j = $(this).find(".media-object").attr('src');
    $('.refrig-img').attr('src', j);
  });

  $('#list-images-iphone li').click(function() {
    var j = $(this).find(".media-object").attr('src');
    $('.iphone-img').attr('src', j);
  });

  $('#list-images-tv li').click(function() {
    var j = $(this).find(".media-object").attr('src');
    $('.tv-img').attr('src', j);
  });
});
