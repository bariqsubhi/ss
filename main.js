let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btnMood = 'create';
let tempVal;

//get total
function get_total(){
    if(price.value !=''){
        let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
        //note: the program will recieve inputs variables as strings.. so we put '+' mark to convert strings to numbers
        total.innerHTML = result;
        total.style.background = 'rgb(40,113,113';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#421e01';
    }
}

 //create product
 let dataProduct;
 if(localStorage.product != null){
    dataProduct =JSON.parse(localStorage.product);
 }else{
    dataProduct =[];
 }

 submit.onclick = function(){
      let newProduct = {
         title:title.value.toLowerCase(),
         price:price.value,
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         count:count.value,
         category:category.value.toLowerCase(),
      };

      //clean data (validation)
      //it is mean that the data unexcepted if there is no data in inputs cells... and limit the number of products created

      if(title.value != '' 
      && price.value !='' 
      && category.value != ""){
         //check mood ...
         //if mood is 'create'
         if(btnMood === 'create'){
            //...........count..........
            //check if there is more than 1 product
            if(newProduct.count > 0 && newProduct.count <= 100){
               for(let num=0; num < newProduct.count;num++){
                  dataProduct.push(newProduct);
               }
               clearData();
            }else{
               //if count value is 0 or less
               alert("Please, Enter Valid Count Number \n Between (1-100)");
            }

      }else{
         //if btnMood is 'update'
            dataProduct[tempVal]=newProduct;
            btnMood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            price.value='';
            clearData();
         }
               //save local storage
               //هنا اسويها حتى لما اسوي ريلود للصفحة ما افقد البيانات السابقة
            localStorage.setItem('product', JSON.stringify(dataProduct));
            showData();
            
      }else{
         alert("Please, Ensure That All Cells is Not Empty");
      }
      
   }



 //clear inputs
 function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
 }

 //read
function showData(){
   get_total();
   let table =''
   for(let i=0; i<dataProduct.length; i++){
      table += `
      <tr>
         <td>${i+1}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
   }
   document.getElementById('tbody').innerHTML = table;
   //show 'delete all' button
   let btnDeleteAll = document.getElementById('deleteAll');
   if(dataProduct.length > 0){
      btnDeleteAll.innerHTML = ` <button onclick="deleteAll()">Delete All (${dataProduct.length})</button> ` ;
   }else{
      btnDeleteAll.innerHTML = '';
   }
}
showData();


 //delete
function deleteData(productIndex){
   dataProduct.splice(productIndex,1);
   localStorage.product =JSON.stringify(dataProduct);
   showData();
}

//Delete All Data
function deleteAll(){
   dataProduct=[];
   //or: 'dataProduct.splice(0)' ...this will delete all elements in array started with index '0' 
   localStorage.setItem('product', JSON.stringify(dataProduct));
   showData();
}

 //update
function updateData(productIndex){
   title.value = dataProduct[productIndex].title;
   price.value = dataProduct[productIndex].price;
   taxes.value = dataProduct[productIndex].taxes;
   ads.value = dataProduct[productIndex].ads;
   discount.value = dataProduct[productIndex].discount;
   get_total();
   count.style.display = 'none';
   category.value = dataProduct[productIndex].category;
   submit.innerHTML = "Update";
   btnMood ='update';
   tempVal = productIndex;
   scroll({
      top:0,
      behavior:"smooth",
   })
}
 //search
let searchMood;     // mood of search
function getSearchMood(btnId){
   let search = document.getElementById('search');
   if(btnId == 'searchTitle'){
      searchMood = 'title';
   }else{
      searchMood = 'category';
   }
   search.placeholder = 'Search by ' + searchMood;
   search.focus();
   search.value = '';
   showData();
}
   //......now we do search operation ......
function searchData(searchWord){
   let searchTable = '';

   function putSearchTable(index){
      searchTable += `
            <tr>
               <td>${index+1}</td>
               <td>${dataProduct[index].title}</td>
               <td>${dataProduct[index].price}</td>
               <td>${dataProduct[index].taxes}</td>
               <td>${dataProduct[index].ads}</td>
               <td>${dataProduct[index].discount}</td>
               <td>${dataProduct[index].total}</td>
               <td>${dataProduct[index].category}</td>
               <td><button onclick="updateData(${index})" id="update">update</button></td>
               <td><button onclick="deleteData(${index})" id="delete">delete</button></td>
            </tr>
            `;
   }

   for(let index = 0; index < dataProduct.length; index++){
      if(searchMood == 'title'){ 
         //it's mean that the search mood is by title
            if(dataProduct[index].title.includes(searchWord.toLowerCase())){ putSearchTable(index); }
         }else{   //it's mean that the search mood is by category
            if(dataProduct[index].category.includes(searchWord.toLowerCase())){ putSearchTable(index); }
      }
   }
   

   document.getElementById('tbody').innerHTML = searchTable;
}




 
