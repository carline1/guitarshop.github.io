var cart = {}; // корзина 
var el_guit_main = {};
var el_guit = {};
var brands = [];
var data = null;
// var json_data = null;

function init() {
	// вывод товара на главную страницу
	$.getJSON("js/goods.json", goodsOut);
}

function goodsOut(data) {
	// вывод на страницу
	// json_data = data;
	
	// console.log(json_data);
	// console.log(data);
	console.log(el_guit);
	var out='';
	for (var i = 0; i < Object.keys(el_guit).length; i++){
		if (i == 0 || i % 3 == 0){
			// console.log(el_guit[Object.keys(el_guit)[i]]);
			out+='<div class="prod_line">';
			for (var j = i; j < i + 3; j++){
				if (j + 1 <= Object.keys(el_guit).length) {
					out+='<div class="prod">'
					out+='<a href="prod.html#'+Object.keys(el_guit)[j]+'"><div class="prod_img">';
					out+='<img src="'+el_guit[Object.keys(el_guit)[j]].image+'" alt="product">';
					out+='</div></a>';
					// console.log(el_guit[Object.keys(el_guit)[j]].name);
					out+='<h3>'+el_guit[Object.keys(el_guit)[j]].name+'</h3>';
					out+='<p>'+el_guit[Object.keys(el_guit)[j]].price+' р.</p>';
					out+='<div class="prod_in_stock">';
					out+='<img src="question.png">';
					out+='<p>В наличии</p>';
					out+='</div>';
					out+='<a href="cart.html" class="add-to-cart in-cart" data-id="'+Object.keys(el_guit)[j]+'">В корзине</a>';
					if (cart[Object.keys(el_guit)[j]] == undefined) {
						out+='<a class="add-to-cart" data-id="'+Object.keys(el_guit)[j]+'">Купить</a>';
					}
					else {
						out+='<a class="add-to-cart hidden" data-id="'+Object.keys(el_guit)[j]+'">Купить</a>';
					}
					out+='</div>';
				}
				else {
					out+='<div class="prod"></div>'
				}
			}
			out+='</div>';
		}
	}
	$('.products').html(out);
	$('.add-to-cart').on('click', addToCart);
	$('.quick_menu_sort').on('change', sortProd);
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
	}
	console.log(cart);
	saveCart();
}

function sortProd() {
	var arr = [];
	for( var key in el_guit){
		if( el_guit.hasOwnProperty( key ) ){
			arr.push( el_guit[key] );
		}
	}
	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	
	if ($(this).val() == "ascending") {
		$(".ascending").addClass("active");
		$(".descending").removeClass("active");
		el_guit = Object.assign({}, arr);
		init();
	}
	else if ($(this).val() == "descending") {
		$(".descending").addClass("active");
		$(".ascending").removeClass("active");
		arr.reverse();
		el_guit = Object.assign({}, arr);
		init();
	}
}

// function sortProd() {
// 	var arr = [];
// 	for( var key in el_guit){
// 		if( el_guit.hasOwnProperty( key ) ){
// 			arr.push( el_guit[key] );
// 		}
// 	}
// 	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	
// 	if ($(".ascending").hasClass("active")) {
// 		el_guit = Object.assign({}, arr);
// 		$(".descending").removeClass("active");
// 		init();
// 	}
// 	else if ($(".descending").hasClass("active")) {
// 		$(".ascending").removeClass("active")
// 		arr.reverse();
// 		el_guit = Object.assign({}, arr);
// 		init();
// 	}
// }

function sortProdBrands() {

	if ($(this).hasClass("active")) {
		var del_val = $(this).val();
		brands = jQuery.grep(brands, function(value) {
		 	return value != del_val;
		});
		if (brands.length == 0) {
			if ($('#in_stock').hasClass("active")) {
				showInStock();
			}
			else {
				defoltSort();
			}
		}
		$(this).removeClass("active");
	}
	else {
		brands.push($(this).val());
		el_guit = el_guit_main;
		var arr = [];
		$(this).addClass("active");
		for( var key in el_guit){
			for (var i = 0; i < brands.length; i++ ) {
				if((el_guit[key].brand == brands[i]) ){
					if (($('#in_stock').hasClass("active") == true && el_guit[key].in_stock == true) || $('#in_stock').hasClass("active") == false){
						arr.push( el_guit[key] );
					}
				}
			}
		}
		el_guit = Object.assign({}, arr);
	}
	
	console.log(el_guit);
	init();

}

function showInStock() {
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
		if (brands.length == 0) {
			defoltSort();
		}
		else {
			var arr = [];
			el_guit = el_guit_main;
			for( var key in el_guit){
				for (var i = 0; i < brands.length; i++ ) {
					if((el_guit[key].brand == brands[i]) ){
						if (($('#in_stock').hasClass("active") == true && el_guit[key].in_stock == true) || $('#in_stock').hasClass("active") == false){
							arr.push( el_guit[key] );
						}
					}
				}
			}

			if ($(".ascending").hasClass("active")) {
				el_guit = Object.assign({}, arr);
			}
			else if ($(".descending").hasClass("active")) {
				arr.reverse();
				el_guit = Object.assign({}, arr);
			}
			init();
		}
	}
	else {
		el_guit = el_guit_main;
		var arr = [];
		$(this).addClass("active")
		for( var key in el_guit){
			if( el_guit[key].in_stock == true ){
				if (brands.length == 0) {
					arr.push( el_guit[key] );
				}
				else {
					for (var i = 0; i < brands.length; i++) {
						if (el_guit[key].brand == brands[i]) {
							arr.push( el_guit[key] );
						}
					}
				}
			}
		}
		arr.sort((a, b) => a.price > b.price ? 1 : -1);
		if ($(".ascending").hasClass("active")) {
			el_guit = Object.assign({}, arr);
			// console.log(el_guit);
		}
		else if ($(".descending").hasClass("active")) {
			arr.reverse();
			el_guit = Object.assign({}, arr);
			// console.log(arr);
			// console.log(el_guit);
		}
	}
	
	console.log(el_guit);
	init();
}

// function defoltSort() {
// 	var arr = [];
// 	// console.log(el_guit);
// 	for( var key in el_guit){
// 		// console.log(key);
// 		if( el_guit.hasOwnProperty( key ) ){
// 			arr.push( el_guit[key] );
// 		}
// 	}
// 	arr.sort((a, b) => a.price > b.price ? 1 : -1);
// 	// console.log(arr);
// 	el_guit = Object.assign({}, arr);
// 	// console.log(el_guit);
// }

function defoltSort() {
	var arr = [];
	el_guit = el_guit_main;
	// console.log(el_guit_main);
	// console.log(el_guit);
	// console.log(el_guit);
	for( var key in el_guit){
		console.log(key);
		if( el_guit.hasOwnProperty( key ) ){
			arr.push( el_guit[key] );
		}
	}
	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	// console.log(arr);
	if ($(".ascending").hasClass("active")) {
		el_guit = Object.assign({}, arr);
		// console.log(el_guit);
		init();
	}
	else if ($(".descending").hasClass("active")) {
		arr.reverse();
		el_guit = Object.assign({}, arr);
		// console.log(el_guit);
		init();
	}
	// console.log(el_guit);
}

function saveCart() {
	// сохраняем корзину в localStorage
	localStorage.setItem('cart', JSON.stringify(cart)); // конвертация корзины в str
}

function loadCart() {
	// проверяю, есть ли в localStorage запись cart
	if (localStorage.getItem('cart')) {
		// если есть - расшифровываю и записываю в переменную cart
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

$(document).ready(function() {
	$.getJSON("js/goods.json", function(data) {
		for (var key in data){
			if (data[key].category == "el_guit") {
				el_guit_main[key] = data[key];
			}
		}
		el_guit = el_guit_main;
		defoltSort();
	});
	loadCart();
	console.log(el_guit);
	$('.brand_sort').on('change', sortProdBrands);
	$('#in_stock').on('change', showInStock);
	init();
});

// $(document).ready(function(){
// 	loadGoods();
// });

// function loadGoods() {
// 	// загружаю товары на страницу
// 	$.getJSON("js/el_guitars.json", function(data){
// 		alert("success");
// 		console.log(data);
// 		var out = '';
// 		for (var key in data){
// 			out+='<div class="prod_line">';
// 			out+='<div class="prod">';
// 			out+='<div class="prod_img">';
// 			out+='<img src="'+data[key].image+'" alt="product">';
// 			out+='</div>';
// 			out+='</div>';
// 			out+='</div>';
// 		}
// 		$('.products').html(out);
// 	})
// }