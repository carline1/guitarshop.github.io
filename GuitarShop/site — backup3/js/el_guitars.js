var cart = {}; // корзина 
var el_guit = {};

function init() {
	// вывод товара на главную страницу
	$.getJSON("js/goods.json", goodsOut);
}

function goodsOut(data) {
	// вывод на страницу
	console.log(data);
	for (var key in data){
		if (data[key].category == "el_guit") {
			el_guit[key] = data[key];
		}
	}
	console.log(el_guit);
	var out='';
	for (var i = 0; i < Object.keys(el_guit).length; i++){
		if (i == 0 || i % 3 == 0){
			// console.log(el_guit[Object.keys(el_guit)[i]]);
			out+='<div class="prod_line">';
			for (var j = i; j < i + 3; j++){
				if (j + 1 <= Object.keys(el_guit).length) {
					out+='<div class="prod">'
					out+='<div class="prod_img">';
					out+='<img src="'+el_guit[Object.keys(el_guit)[j]].image+'" alt="product">';
					out+='</div>';
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
		$('.products').html(out);
		$('.add-to-cart').on('click', addToCart);
	}
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
		$(this).addClass('hidden')
	}
	console.log(cart);
	saveCart();
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
	loadCart();
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