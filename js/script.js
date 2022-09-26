var nameOfProduct = document.getElementById("name");
var customer = document.getElementById("customer");
var issue = document.getElementById("issue");
var dateIn = document.getElementById("datein");
var dateOut = document.getElementById("dateout");
var remark = document.getElementById("remark");
var updateIndex;
if(localStorage.getItem("containerList")==null){
   var productContainer=[];
}
else{
    productContainer=JSON.parse(localStorage.getItem("containerList"));
    displayAllProducts();
}


function addFile(){
    var product = {
        name:nameOfProduct.value,
        customer:customer.value,
        issue:issue.value,
        datein:dateIn.value,
        dateout:dateOut.value,
        remark:remark.value,
    }

    if(!validateProduct(product)){
        return;
    }
    productContainer.push(product);
    clearForm();
    localStorage.setItem("productList",JSON.stringify(productContainer));
    console.log(productContainer);
    displayProduct(product,productContainer.length-1);

}
function validateProduct(product){
    alert("validation");
    let nameRegex=/^[A-Z][a-z]{8,}$/;
    let priceRegex=/^([1-9][0-9]{2})|1000$/;
    let categoryRegex=/^[A-Za-z]{5,20}$/;
    
    alert(priceRegex.test(product.customer));
    if(!nameRegex.test(product.name)){
        alert("in Name");
        document.getElementById( "invalidName").innerHTML="invalid name ";
        return false;
    }
    if(!priceRegex.test(product.customer)){
        alert("in customer")
        document.getElementById( "invalidPrice").innerHTML="invalid price ";
        return false;
    }
    if(!categoryRegex.test(product.issue)){
        alert("in issue")
        document.getElementById( "invalidCate").innerHTML="invalid category Name";
        return false;
    }
    document.getElementById( "invalid").innerHTML="";
return true;
}
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";
}

function displayProduct(product,index){
    document.getElementById("tableBody").innerHTML+=`
    <tr class="my-4"> 
    <td>
      `+index+`
    </td>
    <td>`+product.name+`</td>
    <td>`+product.customer+`</td>
    <td>`+product.issue+`</td>
    <td>`+product.datein+`</td>
    <td>`+product.dateout+`</td>
    <td>`+product.remark+`</td>
    <td><button class=" btn btn-outline-warning" onclick="updateButton(`+index+`)">Update</button></td>
    <td><button class=" btn btn-outline-danger" onclick="deleteProduct(`+index+`)">Delete</button></td>
</tr>`
}
// updateProduct(0);
function updateButton(index){
    // alert("hello");
    // console.log("Hello");
    nameOfProduct.value= productContainer[index].name;    
    customer.value= productContainer[index].customer;
    issue.value= productContainer[index].issue;
    dateIn.value= productContainer[index].datein;
    dateOut.value= productContainer[index].dateout;
    remark.value= productContainer[index].remark;
    document.getElementById("cancelButton").style="display: inline-block !important;";
    document.getElementById("addButton").disabled=true;

    
    document.getElementById("updateButton").style="display: inline-block !important; ";
    updateIndex=index;
    // console.log("Hello2");
}

function cancelUpdate (){
    document.getElementById("cancelButton").style="display: none;";

    document.getElementById("updateButton").style="display: none;";
    document.getElementById("addButton").disabled=false;

    updateIndex=null;
    clearForm();

}
 function updateProduct(){
    // alert("Hello fOM UPDATE");
    productContainer[updateIndex].name=nameOfProduct.value;
    productContainer[updateIndex].customer=customer.value;
    productContainer[updateIndex].issue=issue.value;
    productContainer[updateIndex].datein=dateIn.value;
    productContainer[updateIndex].dateout=dateOut.value;
    productContainer[updateIndex].remark=remark.value ;
    localStorage.setItem("containerList",JSON.stringify(productContainer));   
    clearForm();
    cancelUpdate();
    displayAllList();
 }
function displayAllList(){

    var cartoona='';
    document.getElementById("tableBody").innerHTML='';
    for(var i=0;i<productContainer.length;i++){
        displayProduct(productContainer[i], i);
    }
}


function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productContainer));   
    displayAllList();
}

function searchProducts(temp){
    var cartoona='';
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(temp.toLowerCase() )){
            var product=productContainer[i];
            cartoona+=`
    <tr class="my-4"> 
    <td>
      `+i+`
    </td>
    <td>`+product.name+`</td>
    <td>`+product.customer+`</td>
    <td>`+product.issue+`</td>
    <td>`+product.datein+`</td>
    <td>`+product.dateout+`</td>
    <td>`+product.remark+`</td>
    <td><button class=" btn btn-outline-warning" onclick="updateButton(`+i+`)">Update</button></td>
    <td><button class=" btn btn-outline-danger" onclick="deleteProduct(`+i+`)">delete</button></td>
</tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=cartoona;

    
}