# MyPantry API

## API Reference 
My Pantry API is organized around **REST**. It accepts **form encoded** request bodies, returns **JSON encoded** responses.

It does not use authentication.

## Endpoints
[https://thawing-cove-31539.herokuapp.com/api/](https://thawing-cove-31539.herokuapp.com/api/)       
The API is built primarily around the user, most endpoints starts with ```/users```

***
### ```1./users``` : 
Returns a JSON object of all users  
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password1"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood2",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood2@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password2"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]```

***
### ```2./users/:user_id```
Returns a JSON object with the requested user_id   
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password1"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]```  <br> <br> 
When the user_id doesn't exist, it returns an error  
```{"error":"User doesn't exist"}```
***

### ```3./users/user_id/items```
Returns a JSON object containing all the items belonging to the user with the specified user_id    
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"Crab",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"quantity":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"type":"Produce"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"expiration":"mar-15-2020"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":2```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"kale",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"quantity",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"type":"Canned Goods"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"expiration":"jul-20-2020"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]``` <br><br>

When the user_id doesn't exist, it returns an error  
```{"error":"User doesn't exist"}```
***

### ```4./users/user_id/items/item_id```
Returns a JSON object containing the specified item belonging to the user with the specified user_id  
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"Crab",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"quantity":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"type":"Produce"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"expiration":"mar-15-2020"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
```]``` <br><br>
***

### ```5./items```
Returns every item in the database  
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"Crab",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"quantity":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"type":"Produce"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"expiration":"mar-15-2020"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":2```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"kale",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"quantity",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"type":"Canned Goods"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"expiration":"jul-20-2020"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]``` <br><br>
***

### ```/itemtypes```
Returns every item type in the database

```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"Produce",```   
     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":2```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"item_name":"Frozen",```   
   
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]``` <br><br>