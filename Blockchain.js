//blockchain class computation Adding a block that references a previous block

class Blockchain{
	
	constructor(){
		this.chain = [];
		this.genesisBlock = {
		previous: "0",
		hash : "dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf00"
		};
		this.d = new Date();
		this.currentBlock = {};

		this.currentBlock = this.genesisBlock;

		this.i = 1;
		}
	
	createBlock(data){

		var newBlock = {
			data: data,

			timestamp: this.d.getDate() + "/"+ (this.d.getMonth()+1) + " @ " + this.d.getHours() + ":"  + this.d.getMinutes() + ":" + this.d.getSeconds(),

			hash : this.proofOfWork(data),

			index: this.chain.length+1,

			previousHash : this.currentBlock.hash
		}
	this.chain.push(newBlock);
	this.currentBlock = newBlock;
	return [newBlock.hash, newBlock.previousHash,newBlock.data,newBlock.timestamp];
	}

	hashMe(to_hash){

		var shaObj = new jsSHA("SHA-256", "TEXT");
		shaObj.update(to_hash);
		var hash = shaObj.getHash("HEX");
		return hash;
	}
//ppending the zeros to the hash

	proofOfWork(dta_proof){

		var nonce = 0;
		while(true)
		{
			var string_proof = nonce.toString()+dta_proof;
			var difficulty = this.hashMe(string_proof);
			if(difficulty.slice(-2) === "00"){
				
				return difficulty;
			}
			else{
				nonce++;
			}
		}
	}

	getTabNumber(){

		this.i++
		return this.i;
	}
	
};

//Initializing the DOM to hold the block data

var add_data = document.getElementById("add_data");
var add_user = document.getElementById("add_user");
var main_container = document.getElementById("main_container");

//Function to add a user 

function addUser(){
	var button_markup = document.createElement("button");
	var tab_div = document.createElement("div");
	var append_tabs = document.getElementById("content_append");
	var user_add_box = document.getElementById("user_add_box");
	var li = document.createElement("li");
	var aElement = document.createElement("a");
	var number = display.getTabNumber();
	var createAText = document.createTextNode("User"+number.toString());
	button_markup.setAttribute('onclick',"synchChain()");
	button_markup.className = "connect";
	button_markup.setAttribute('id', "connect"+number.toString());
	aElement.setAttribute('href', '#'+number.toString());
	aElement.appendChild(createAText);
	aElement.setAttribute('data-toggle', "tab");
	tab_div.className = "tab-pane";
	tab_div.setAttribute('id', number.toString());
	var user_box = document.getElementById("user_box");
	li.appendChild(aElement);
	li.appendChild(button_markup);
	user_add_box.appendChild(li);
	//Markup to append whenever a new user is added
	const markup = `
	 	<div class="card card-signup" style="width: 100%;">
		<div class="input-group">
		<input type="text" class="form-control" placeholder="data">
		</div>
		<div class="hash" style="display: inline-flex;"><p>Hash : </p><p>dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf00</p></div>
		<div></div>
		<div class="hash" style="display: inline-flex;"><p>PreviousHash : </p><p>0</p></div>
		</div>
		<div class="card card-signup" style="width: 100%;">
						
		<div class="input-group">
			
		<input type="text" id="input_data${number}" class="form-control" placeholder="Add data">
		</div>
		<div class="footer text-center">
		<button id = "${number}"class="btn btn-danger" onclick="isClicked()" style="background: linear-gradient(45deg,#d4145a,#fbb03b); padding: 20px; padding-left: 20px; padding-right: 20px; border-radius: 15px;">Add data</button>
		</div>
		</div>
		`;
	tab_div.innerHTML = markup;
	append_tabs.appendChild(tab_div);
}
//Function for addind a block

function addData(eId,parent,parent_but_one,obj_){
	var input_data = document.getElementById("input_data"+eId);
	if(input_data.value.length>0)
	{
		var p_arrow = document.createElement("p");
		var col_div = document.createElement("div");
		var content_div = document.createElement("div");
		var hash_div = document.createElement("div");
		p_plain_text = document.createElement("p"); 
		p_time_text = document.createElement("p"); 
		var p_data = document.createElement("p"); 
		var p_previous_hash = document.createElement("p"); 
		content_div.style.cssText = "width: 100%";
		col_div.className = "card card-signup";
		
		content_div.className = "content-add";
		hash_div.className = "hash";

		//creating a block through the Blockchain class using the object that was passed as argument

		let hashes = obj_.createBlock(input_data.value);

		//Appending the returned hash and previous hash values to the p elements

		p_data.innerHTML = "Hash: " + hashes[0];
		p_previous_hash.innerHTML = "PreviousH: " + hashes[1];
		p_plain_text.innerHTML = "Data: " + hashes[2];
		p_time_text.innerHTML = "Time: " + hashes[3];

		//Adding the downward arrow

		p_arrow.innerHTML = "&darr;"
		p_arrow.className = "arrow_down";

		//Appending all the elements to the main DIV
		hash_div.appendChild(p_arrow);
		hash_div.appendChild(p_plain_text);
		hash_div.appendChild(p_data);
		hash_div.appendChild(p_previous_hash);
		hash_div.appendChild(p_time_text);
		col_div.appendChild(content_div);
		content_div.appendChild(hash_div);
		//Inserting the data before the card that contains the button 

		parent.insertBefore(col_div,parent_but_one);
	}
}
//Getting the id of the button that is clicked and assigning it an object
function isClicked(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    let parent_but_one = e.parentNode.parentNode;
    let parent = e.parentNode.parentNode.parentNode;

    if(isInArray(e.id))
    {
    	var obj_ = buttons_obj[e.id];
    	
    	
    }
    else{

    	buttons.push(e.id);
    	var obj_ = new Blockchain();
    	buttons_obj[e.id] = obj_;
    }
	//Calling the addData function passing it the button id the parents and also the object
	addData(e.id,parent,parent_but_one,obj_);
}
//Checking if the button has been clicked before
function isInArray(check_value){
	
	for(var ii = 0 ; ii < buttons.length; ii++){
		if(buttons[ii] === check_value){
			return true;
			break;
		}
	}
}
//button for synching blockchains
function synchChain(e){
	e = e || window.event;
    e = e.target || e.srcElement;
    var id_of_button = (e.id).slice(-1);
    if(buttons.length !=0 && isInArray(id_of_button.toString())){
    	 var current_obj = buttons_obj[id_of_button];

	    var largestt = largest();

	    if(largestt[0].currentBlock.hash !== current_obj.currentBlock.hash){
	    	if(largestt[1] != current_obj.currentBlock.index){
	    	buttons_obj[id_of_button] = largestt[0];
	    	}
	    }

	    alert("Now this block previous hash should reference the last hash of the longest block");
    }

    else{
    	alert("You must add data");
	 }
}

//get the block with the largest index
function largest(){
	let array_index = [];
	for(var j=1;j<=buttons.length;j++){	
		array_index.push(buttons_obj[j.toString()].currentBlock.index);
	}
	var highest = Math.max.apply(null, array_index);

	for(var k=1;k<=buttons.length;k++){	
		if(buttons_obj[k.toString()].currentBlock.index === highest){
			var obj_largest = buttons_obj[k.toString()];
			break;
		}
	}
	return [obj_largest,highest];
}
//Adding a new user
add_user.addEventListener("click",addUser);
//add_data.addEventListener("click",addData);
//array that contains all the buttons Ids
let buttons = [];
//Mapping between buttons and objects
let buttons_obj = {};
//Initializing the blockchain class to be able to assign new unique Ids to new created users
let display = new Blockchain();