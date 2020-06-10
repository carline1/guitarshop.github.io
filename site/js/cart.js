var cart = {};
var total = 0;
var json_data = null;

function init() {
	// вывод товара на главную страницу
	$.getJSON("js/goods.json", cartGoodsOut);
}

function cartGoodsOut(data) {
	json_data = data;
	if (Object.keys(cart).length > 0) {
		// console.log(Object.keys(cart).length);
		$('.empty_cart').addClass("hidden");
	}
	else {
		$(".cart").addClass("hidden");
	}

	var out='';
	console.log(cart);
	for (var i in cart) {
		console.log(data[i]);
		// console.log(i);
		out+='<div class="cart_prod" data-id="'+i+'">';
		out+='<img src="'+data[i].image +'" alt="cart-prod">';
		out+='<a  class="cart_prod_name" href="prod.html#'+i+'"><p>'+data[i].name+'</p></a>';
		out+='<div class="prod_price">';
		out+='<p class="cart_prod_price" data-id="'+i+'">'+data[i].price+' р.</p>';
		out+='<p class="cart_prod_descr">Цена за 1 шт.</p>';
		out+='</div>';
		out+='<div class="cart_prod_quentity">';
		out+='<button class="dec_prod" data-id="'+i+'">–</button>';
		out+='<input type="text" min="1" class="prod_quent" data-id="'+i+'" value="'+cart[i]+'">';
		out+='<button class="inc_prod" data-id="'+i+'">+</button>';
		out+='</div>';
		out+='<p class="cart_prod_cost" data-id="'+i+'">'+data[i].price*cart[i]+' р.</p>';
		out+='<div class="cart_del">';
		out+='<button class="del_prod" data-id="'+i+'">';
		out+='<img src="cart/bascket4.png" alt="bascket">';
		out+='</button>';
		out+='</div>';
		out+='</div>';
		total += data[i].price*cart[i];
	}
	out+='<div class="cont_total">';
	out+='<p class="total">Итого к оплате: <b>'+total+' р.</b></p>';
	out+='<button>Оформить заказ</button>';
	out+='</div>';
	$('.cart').html(out);
	$('.dec_prod').on('click', decProd)	;
	$('.inc_prod').on('click', incProd);
	$('.del_prod').on('click', delProd);

	$(".prod_quent").keypress(function( b ){
	    var C = /[0-9\x25\x24\x23]/;
	    var a = b.which;
	    var c = String.fromCharCode(a);
	    return !!(a==0||a==8||a==9||a==13||c.match(C));
	});
	$('.prod_quent').on('change', inputQuantProd);
}

function decProd() {
	//добавляем товар в корзину
	var id = $(this).attr("data-id");
	// console.log(id);

	if (cart[id] > 1) {
		// total -= Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3));
		total -= json_data[id].price;
		$('.total').html('Итого к оплате: <b>'+total+' р.</b>');
	}

	if (cart[id] > 1) {
		cart[id]--; 
	}
	
	$('[class="prod_quent"][data-id="'+id+'"]').val(cart[id]);
	// console.log(String(json_data[id].price*cart[id])+' р.');
	$('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(json_data[id].price*cart[id])+' р.');
	// console.log($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3));
	// дальше жесть... я выделяю подстроку из тега с ценой, 
	// перевожу его в число, потом обратно в str, а потом добавляю р. (но зато это работает)
	// $('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3))*cart[id])+' р.');
	
	
	console.log(cart);
	saveCart();
}

function incProd() {
	//добавляем товар в корзину
	var id = $(this).attr("data-id");
	// console.log(id);
	cart[id]++; 

	$('[class="prod_quent"][data-id="'+id+'"]').val(cart[id]);
	$('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(json_data[id].price*cart[id])+' р.');
	// $('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3))*cart[id])+' р.');
	
	// total += Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3));
	total += json_data[id].price;
	$('.total').html('Итого к оплате: <b>'+total+' р.</b>');
	console.log(cart);
	saveCart();
}

function delProd() {
	//добавляем товар в корзину
	var id = $(this).attr("data-id");
	total -= json_data[id].price * cart[id];
	// console.log(id);
	delete cart[id]; 
	
	console.log($('[div="cart_prod"][data-id="'+id+'"]'));
	$('[class="cart_prod"][data-id="'+id+'"]').addClass("hidden");

	if (Object.keys(cart).length == 0) {
		$(".cart").addClass("hidden");
		$('.empty_cart').removeClass("hidden");
	}

	// total -= Number($('[class="cart_prod_cost"][data-id="'+id+'"]').text().slice(0, -3));
	// console.log(total, json_data[id].cost, json_data, id);
	$('.total').html('Итого к оплате: <b>'+total+' р.</b>');

	saveCart();
}

function inputQuantProd() {
	var id = $(this).attr("data-id");
	
	if ($('[class="prod_quent"][data-id="'+id+'"]').val() == 0) {
		$('[class="prod_quent"][data-id="'+id+'"]').val(1);
	}

	// total += Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3))*($('[class="prod_quent"][data-id="'+id+'"]').val() - cart[id]);
	total += json_data[id].price * ($('[class="prod_quent"][data-id="'+id+'"]').val() - cart[id]);

	$('.total').html('Итого к оплате: <b>'+total+' р.</b>');

	cart[id] = $('[class="prod_quent"][data-id="'+id+'"]').val();
	// $('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(Number($('[class="cart_prod_price"][data-id="'+id+'"]').text().slice(0, -3))*cart[id])+' р.');
	$('[class="cart_prod_cost"][data-id="'+id+'"]').html(String(json_data[id].price * cart[id]) + ' р.');

	saveCart();
}

function loadCart() {
	// проверяю, есть ли в localStorage запись cart
	if (localStorage.getItem('cart')) {
		// если есть - расшифровываю и записываю в переменную cart
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

function saveCart() {
	// сохраняем корзину в localStorage
	localStorage.setItem('cart', JSON.stringify(cart)); // конвертация корзины в str
}

$(document).ready(function() {
	loadCart();
	init();
});