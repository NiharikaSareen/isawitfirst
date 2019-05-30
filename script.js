const urlAPI="https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data";


// function which runs on window load and 
// fetch JSON data from the url

let allProducts = [];

window.onload = () => {
	//start the request by fetch
	fetch(urlAPI)
		.then(function(resp){
			//promise is fulfilled json object is retuned
			//which is exposed by json method
		return resp.json();
	})
	//json method returns another promise
	//adding all the data in allproducts array 
	.then(function(data){
		allProducts = data.products;
		//calling show products method
		showProducts(allProducts);
	})
	//if any error occurs catch them 
	//and show in console
	.catch(function(error) {
    	console.log('error');
    	console.log(error.message);
  	});
}

//method to create table from the data

function showProducts(allProducts){
	const tableBody = document.getElementById('tableData');
	var html = [];

	html.push("<tbody>");
	//loop through the array of objects
	allProducts.forEach(function(data) { //begin forEach
		for (var i = 0; i < data.variants.length; i++) {
		
		html.push("<tr>");
			html.push(`<td class="product_image"><img src="${data.image.src}" onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsiwbElVe16ZcD3RE1_og4oVRfXQIdnBfKQmSVW-wyLhdjNTX';"/></td>`);
			html.push(`<td class="product_type">
				<p>${data.product_type}</p>
				<p>${data.title}</p>
				<div class="product_size">
				<p>Size: <span class="text-bold font-primary">${data.variants[i].option1}</span></p>
				<p>Colour: <span class="text-bold font-primary">${data.variants[i].option2}</span></p>
				</div>
			</td>`);
			html.push(`<td class="product_size">
				<span class="text-bold font-primary">${data.variants[i].option1}</span>
			</td> `);
			html.push(`<td class="product_colour">
				<span class="text-bold font-primary">${data.variants[i].option2}</span>
			</td> `);
			html.push(`<td class="product_price">`);
				html.push(`<div class="discountedPrice"> £${data.variants[i].price} </div> `);
				if(data.variants[i].compare_at_price !== null){
					html.push(`<div class="actualPrice"> £${data.variants[i].compare_at_price} </div> `);
				}
				else{
					html.push(`<div>  </div> `);
				}
			html.push("</td>");
			if(data.variants[i].inventory_quantity < 10){
			html.push(`<td>0${data.variants[i].inventory_quantity}</td> `);}
			else{
				html.push(`<td>${data.variants[i].inventory_quantity}</td> `);
			}
		html.push("</tr>");
		}
	}); 
	  html.push("</tbody>");
	tableBody.innerHTML = html.join("");
};
    
//method to sort data on table header click

  $('table')
    .on('click', '.sort', function () {
      let index = $(this).index(),
          rows = [],
          thClass = $(this).hasClass('asc') ? 'desc' : 'asc';

      $('table th').removeClass('asc desc');
      $(this).addClass(thClass);

      $('table tbody tr').each(function (index, row) {
        rows.push($(row).detach());
      });
      rows.sort(function (a, b) {
       let aValue = $(a).find('td').eq(index).text(),
            bValue = $(b).find('td').eq(index).text();
        return aValue > bValue
             ? 1
             : aValue < bValue
             ? -1
             : 0;
      });

      if ($(this).hasClass('desc')) {
        rows.reverse();
      }

      $.each(rows, function (index, row) {
        $('table tbody').append(row);
      });
    });











