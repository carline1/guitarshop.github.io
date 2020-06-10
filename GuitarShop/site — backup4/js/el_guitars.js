var cart = {}; // корзина 
var prod_main = {};
var prod = {};
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
	// fixKeys(data);
	console.log(prod);
	var out='';
	for (var i = 0; i < Object.keys(prod).length; i++){
		if (i == 0 || i % 3 == 0){
			// console.log(prod[Object.keys(prod)[i]]);
			out+='<div class="prod_line">';
			for (var j = i; j < i + 3; j++){
				if (j + 1 <= Object.keys(prod).length) {
					out+='<div class="prod">'
					out+='<a href="prod.html#'+prod[Object.keys(prod)[j]].item_of_goods+'"><div class="prod_img">';
					out+='<img src="'+prod[Object.keys(prod)[j]].image+'" alt="product">';
					out+='</div></a>';
					// console.log(prod[Object.keys(prod)[j]].name);
					out+='<h3>'+prod[Object.keys(prod)[j]].name+'</h3>';
					out+='<p>'+prod[Object.keys(prod)[j]].price+' р.</p>';
					out+='<div class="prod_in_stock">';
					if (prod[Object.keys(prod)[j]].in_stock) {
						out+='<img src="question_green.png">';
						out+='<p>В наличии</p>';
					}
					else {
						out+='<img src="question_red.png">';
						out+='<p class="not_in_stock">Под заказ</p>';
					}
					out+='</div>';
					out+='<a href="cart.html" class="add-to-cart in-cart" data-id="'+prod[Object.keys(prod)[j]].item_of_goods+'">В корзине</a>';
					if (cart[prod[Object.keys(prod)[j]].item_of_goods] == undefined) {
						if (prod[Object.keys(prod)[j]].in_stock) {
							out+='<a class="add-to-cart" data-id="'+prod[Object.keys(prod)[j]].item_of_goods+'">Купить</a>';
						}
						else {
							out+='<a class="dis-add-to-cart" data-id="'+prod[Object.keys(prod)[j]].item_of_goods+'">Купить</a>';
						}
					}
					else {
						out+='<a class="add-to-cart hidden" data-id="'+prod[Object.keys(prod)[j]].item_of_goods+'">Купить</a>';
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
	for( var key in prod){
		if( prod.hasOwnProperty( key ) ){
			arr.push( prod[key] );
		}
	}
	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	
	if ($(this).val() == "ascending") {
		$(".ascending").addClass("active");
		$(".descending").removeClass("active");
		prod = Object.assign({}, arr);
		init();
	}
	else if ($(this).val() == "descending") {
		$(".descending").addClass("active");
		$(".ascending").removeClass("active");
		arr.reverse();
		prod = Object.assign({}, arr);
		init();
	}
}


// function fixKeys(data) {
// 	console.log(Object.keys(prod), prod);
// 	for (var i in prod) {
// 		for (var j in data) {
// 			// console.log(data[j]);
// 			bool = true;
// 			for (var key in prod[i]) {
// 				if (prod[i][key] != data[j][key]) {
// 					bool = false;
// 					break;
// 				}
// 			}
// 			if (bool) {
// 				// prod[j] = prod[i];
// 				// delete prod[i];
// 				delete Object.assign(prod, {[j]: prod[i] })[i];
// 				break;
// 			}

// 		}
// 		console.log('--------------------------');
// 	}
// 	console.log(Object.keys(prod), prod);
// }


// function sortProd() {
// 	var arr = [];
// 	for( var key in prod){
// 		if( prod.hasOwnProperty( key ) ){
// 			arr.push( prod[key] );
// 		}
// 	}
// 	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	
// 	if ($(".ascending").hasClass("active")) {
// 		prod = Object.assign({}, arr);
// 		$(".descending").removeClass("active");
// 		init();
// 	}
// 	else if ($(".descending").hasClass("active")) {
// 		$(".ascending").removeClass("active")
// 		arr.reverse();
// 		prod = Object.assign({}, arr);
// 		init();
// 	}
// }

function sortProdBrands() {

	if ($(this).hasClass("active")) {
		var del_val = $(this).val();
		brands = jQuery.grep(brands, function(value) {
		 	return value != del_val;
		});
		// console.log(brands, brands.length);
		if (brands.length == 0) {
			if ($('#in_stock').hasClass("active")) {
				showInStock();
			}
			else {
				defoltSort();
			}
		}
		else {
			// prod = prod_main;
			var arr = [];
			// console.log(prod, brands);
			for( var key in prod){
				for (var i = 0; i < brands.length; i++ ) {
					if ((prod[key].brand == brands[i]) ){
						arr.push( prod[key] );
					}
				}
			}
			arr.sort((a, b) => a.price > b.price ? 1 : -1);
			if ($(".ascending").hasClass("active")) {
				prod = Object.assign({}, arr);
			}
			else if ($(".descending").hasClass("active")) {
				arr.reverse();
				prod = Object.assign({}, arr);
			}
			init();
		}
		$(this).removeClass("active");
	}
	else {
		brands.push($(this).val());
		prod = prod_main;
		var arr = [];
		$(this).addClass("active");
		for( var key in prod){
			for (var i = 0; i < brands.length; i++ ) {
				if((prod[key].brand == brands[i]) ){
					if (($('#in_stock').hasClass("active") == true && prod[key].in_stock == true) || $('#in_stock').hasClass("active") == false){
						arr.push( prod[key] );
					}
				}
			}
		}
		arr.sort((a, b) => a.price > b.price ? 1 : -1);
		if ($(".ascending").hasClass("active")) {
			prod = Object.assign({}, arr);
		}
		else if ($(".descending").hasClass("active")) {
			arr.reverse();
			prod = Object.assign({}, arr);
		}
		init();
	}
	
	// console.log(prod);
	// init();

}

function showInStock() {
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
		if (brands.length == 0) {
			defoltSort();
		}
		else {
			var arr = [];
			prod = prod_main;
			// var del_val = $(this).val();
			// brands = jQuery.grep(brands, function(value) {
			//  	return value != del_val;
			// });
			for( var key in prod){
				for (var i = 0; i < brands.length; i++ ) {
					if((prod[key].brand == brands[i]) ){
						if (($('#in_stock').hasClass("active") == true && prod[key].in_stock == true) || $('#in_stock').hasClass("active") == false){
							arr.push( prod[key] );
						}
					}
				}
			}

			if ($(".ascending").hasClass("active")) {
				prod = Object.assign({}, arr);
			}
			else if ($(".descending").hasClass("active")) {
				arr.reverse();
				prod = Object.assign({}, arr);
			}
			init();
		}
	}
	else {
		prod = prod_main;
		var arr = [];
		$(this).addClass("active")
		for( var key in prod){
			if( prod[key].in_stock == true ){
				if (brands.length == 0) {
					arr.push( prod[key] );
				}
				else {
					for (var i = 0; i < brands.length; i++) {
						if (prod[key].brand == brands[i]) {
							arr.push( prod[key] );
						}
					}
				}
			}
		}
		arr.sort((a, b) => a.price > b.price ? 1 : -1);
		if ($(".ascending").hasClass("active")) {
			prod = Object.assign({}, arr);
			// console.log(prod);
		}
		else if ($(".descending").hasClass("active")) {
			arr.reverse();
			prod = Object.assign({}, arr);
			// console.log(arr);
			// console.log(prod);
		}
		init();
	}
	
	// console.log(prod);
	// init();
}

// function defoltSort() {
// 	var arr = [];
// 	// console.log(prod);
// 	for( var key in prod){
// 		// console.log(key);
// 		if( prod.hasOwnProperty( key ) ){
// 			arr.push( prod[key] );
// 		}
// 	}
// 	arr.sort((a, b) => a.price > b.price ? 1 : -1);
// 	// console.log(arr);
// 	prod = Object.assign({}, arr);
// 	// console.log(prod);
// }

function defoltSort() {
	var arr = [];
	prod = prod_main;
	// console.log(prod_main);
	// console.log(prod);
	// console.log(prod);
	for( var key in prod){
		// console.log(key);
		if( prod.hasOwnProperty( key ) ){
			arr.push( prod[key] );
		}
	}
	arr.sort((a, b) => a.price > b.price ? 1 : -1);
	// console.log(arr);
	if ($(".ascending").hasClass("active")) {
		prod = Object.assign({}, arr);
		// console.log(prod);
		init();
	}
	else if ($(".descending").hasClass("active")) {
		arr.reverse();
		prod = Object.assign({}, arr);
		// console.log(prod);
		init();
	}
	// console.log(prod);
}

function showBrands() {
	if ($(this).val() == "show") {
		$(".ab_part").addClass("hidden");
		$(".ab_full").removeClass("hidden");
	}
	else if ($(this).val() == "hide") {
		$(".ab_full").addClass("hidden");
		$(".ab_part").removeClass("hidden");
	}
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
				prod_main[key] = data[key];
			}
		}
		prod = prod_main;
		defoltSort();
	});
	loadCart();
	// console.log(prod);

	
	$('.quick_menu_sort').on('change', sortProd);
	$('.brand_sort').on('change', sortProdBrands);
	$('#in_stock').on('change', showInStock);
	$('.brands_show_all').on('click', showBrands);
	// init();
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