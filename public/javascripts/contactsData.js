var ContactService = {
    create: function(obj){
        makeAjaxCall('/contacts', 'POST', obj, function(xhr){
            var res = JSON.parse(xhr.responseText);
            createContact(res);
        })
    },
    update: function (id, obj) {
        makeAjaxCall('/contacts/' + id,'PUT',obj, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            updateContactRes(res);
        });
    },
    getAll: function(){
        makeAjaxCall('/contacts', 'GET', null, function(xhr){
            var res = JSON.parse(xhr.responseText);
            getContact(res);
        })
    },
    get: function(id){
        makeAjaxCall('/contacts/' + id ,'GET',null, function (xhr) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            getContact(res);
        });
    },

    delete: function(id){
        var confirms = confirm ("Are you sure to delete?");
        if (confirms) {
            makeAjaxCall('/contacts/' + id, 'DELETE', null, function (xhr) {
                var res = JSON.parse(xhr.responseText);
                deleteContact(res);
            });
        }
    }

};

//Generic function for AJAX calls
function makeAjaxCall(url, httpVerb, obj, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(httpVerb, url);
    if(typeof Object != null && (httpVerb === 'POST' || httpVerb === 'PUT')) xhr.setRequestHeader('content-type','application/json');
    xhr.addEventListener('readystatechange',function () {
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    });
    if(typeof Object != null && (httpVerb === 'POST' || httpVerb === 'PUT')) xhr.send(JSON.stringify(obj));
    else xhr.send();
}

//Generic function to create and append elements
function createElement(elementType, parent, className, innerHTML, custom) {
    var element = document.createElement(elementType);
    if (parent) parent.appendChild(element);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;

    if (typeof custom !== 'undefined') {
        for (var prop in custom) {
            element.setAttribute(prop, custom[prop]);
        }
    }
    return element;
}

//Get contacts
function getContact(res){
   // console.log(res);
    var contactsDiv = document.querySelector('.contacts-container');
    var userUl = document.querySelector('.userName');
    userUl.innerHTML = '';
    var emailUl = document.querySelector('.email');
    emailUl.innerHTML = '';
    var iconUl = document.querySelector('.icon');
    iconUl.innerHTML = '';
    if(res) {
        createElement('li', userUl, '', 'Name', null);
        createElement('li', emailUl, '', 'Email', null);
        createElement('li', iconUl, '', 'Action', null);

        for (var i in res) {
            var icon = '<img src="images/edit.png" title="Edit" onClick="updateContact(\''+ res[i].name +'\',\''+ res[i].email+'\')"/>' +
                '<img src="images/delete.gif" title="Delete" onClick="ContactService.delete(\''+ res[i].email +'\')" />';
            // console.log(res[i].name); //"aa", bb", "cc"
            createElement('li', userUl, '', res[i].name, null);
            createElement('li', emailUl, '', res[i].email, null);
            createElement('li', iconUl, '', icon, null);
        }
    }
    else{
        createElement('li', userUl, '', 'Sorry! No records to display!', null);
    }
    contactsDiv.style.display  = 'block';
}

//Create contacts
function createContact(res){
    //console.log(res);
    if(res) document.querySelector('.message').innerHTML='User created successfully!';
    var contactsDiv = document.querySelector('.contacts-container');
    if(contactsDiv.style.display  == 'block'){
        ContactService.getAll();
    }
}

//Delete contacts
function deleteContact(res){
    if(res) document.querySelector('.message').innerHTML='User deleted successfully!';
    document.querySelector('input[name="userName"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    ContactService.getAll();
}

//Update contacts
function updateContact(name, email){
   // console.log('name',name);
    document.querySelector('input[name="userName"]').value = name;
    document.querySelector('input[name="email"]').value = email;

    //Update contact
    var getAllButton = document.querySelector('.buttonUpdate');
    getAllButton.addEventListener('click', function(){
        //var contactsDiv = document.querySelector('.contacts-container');
        ContactService.update(document.querySelector('input[name="email"]').value,{
            name: document.querySelector('input[name="userName"]').value,
            email: document.querySelector('input[name="email"]').value
        });
    });
}

//Update contacts result
function updateContactRes(res){
    if(res) document.querySelector('.message').innerHTML='User updated successfully!';
    document.querySelector('input[name="userName"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    ContactService.getAll();
}

//Actions to be performed
document.addEventListener('DOMContentLoaded', function(){
    //Add contact
    var addButton = document.querySelector('.buttonAdd');
    addButton.addEventListener('click', function(){
        ContactService.create({
            name: document.querySelector('input[name="userName"]').value,
            email: document.querySelector('input[name="email"]').value
        });
    });

    //Get all contacts
    var getAllButton = document.querySelector('.buttonGetAll');
    getAllButton.addEventListener('click', function(){
        var contactsDiv = document.querySelector('.contacts-container');
        //if(contactsDiv.style.display == 'block') return false;
        ContactService.getAll();
    });

    //Get one contact
    var getAllButton = document.querySelector('.buttonGet');
    getAllButton.addEventListener('click', function(){
        var contactsDiv = document.querySelector('.contacts-container');
        document.querySelector('input[name="userName"]').disabled = true;
        ContactService.get(
           document.querySelector('input[name="email"]').value
        );
    });

});