var cart = {}; 

function init() {
	// вывод товара на главную страницу
	$.getJSON("js/goods.json", goodsOut);
}

function goodsOut(data) {
	// вывод на страницу
	console.log(data);
	var hash = window.location.hash.substring(1);
	if (data[hash].category == "el_guit") {
		$('.mini_nav_category').html('Электрогитары');
		$('.mini_nav_category').attr('href', 'el_guitars.html');
	}
	else if (data[hash].category == "bass") {
		$('.mini_nav_category').html('Бас-гитары');
		$('.mini_nav_category').attr('href', 'basses.html');
	}
	else if (data[hash].category == "acoustic") {
		$('.mini_nav_category').html('Акустические гитары');
		$('.mini_nav_category').attr('href', 'acoustic.html');
	}
	else if (data[hash].category == "el_acoustic") {
		$('.mini_nav_category').html('Полуакустические гитары');
		$('.mini_nav_category').attr('href', 'el_acoustic.html');
	}
	else if (data[hash].category == "accessories") {
		$('.mini_nav_category').html('Аксессуары');
		$('.mini_nav_category').attr('href', 'accessories.html');
	}
	$('.mini_nav_name').html(data[hash].name);
	// console.log(hash);
	var out='';
	out+='<div class="big_prod_img">';
	out+='<img src="'+data[hash].big_prod_img+'" alt="big_prod_img">';
	out+='</div>';
	if (data[hash].category == "el_guit") {
		out+='<h4>Электрогитары</h4>';
	}
	else if (data[hash].category == "bass") {
		out+='<h4>Бас-гитары</h4>';
	}
	else if (data[hash].category == "acoustic") {
		out+='<h4>Акустические гитары</h4>';
	}
	else if (data[hash].category == "el_acoustic") {
		out+='<h4>Полуакустические гитары</h4>';
	}
	else if (data[hash].category == "accessories") {
		out+='<h4>Аксессуары</h4>';
	}
	out+='<p class="big_prod_name">'+data[hash].name+'</p>';
	out+='<p class="big_prod_price">'+data[hash].price+' р.</p>';
	out+='<div class="big_prod_in_stock">';
	if (data[hash].in_stock) {
		out+='<img src="question_green.png">';
		out+='<p>В наличии</p>';
	}
	else {
		out+='<img src="question_red.png">';
		out+='<p class="not_in_stock">Под заказ</p>';
	}
	out+='</div>';
	// out+='<a href="cart.html" class="in-cart" data-id="'+hash+'">В корзине</a>';
	if (cart[hash] == undefined) {
		if (data[hash].in_stock) {
			out+='<button><a href="cart.html" class="big-add-to-cart in-cart hidden" data-id="'+hash+'">В корзине</a></button>';
			out+='<button><a class="big-add-to-cart" data-id="'+hash+'">Купить</a></button>';
		}
		else {
			out+='<button><a class="big-dis-add-to-cart" data-id="'+hash+'">Купить</a></button>';
		}
	}
	else {
		out+='<button><a href="cart.html" class="in-cart big-add-to-cart" data-id="'+hash+'">В корзине</a></button>';
		out+='<button><a class="big-add-to-cart hidden" data-id="'+hash+'">Купить</a></button>';
	}
	out+='<div class="big_prod_descr">';
	out+='<h3>Описание:</h3>';
	out+='<p>'+data[hash].description+'</p>';
	out+='</div>';
	out+='</div>';

	$('.big_prod').html(out);
	$('.big-add-to-cart').on('click', addToCart);
}

function addToCart() {
	//добавляем товар в корзину
	var id = $(this).attr('data-id');
	// console.log(id);
	if (cart[id] == undefined) {
		cart[id] = 1; // усли в корзине нет товара с таким id, то присваиваем 1
	}
	// else {
	// 	cart[id]++; // если такой товар есть, увеличиваем его кол-во на1
	// }
	if ($(this).hasClass('in-cart') == false) {
		$(this).addClass('hidden');
		$('[class="big-add-to-cart in-cart hidden"][data-id="'+id+'"]').removeClass("hidden");
	}
	console.log(cart);
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
