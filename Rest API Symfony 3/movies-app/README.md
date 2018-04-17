Create a REST API with Symfony 3
Source: https://www.udemy.com/creating-rest-api-in-symfony/learn/v4/t/lecture/9345162?start=0

=> REST API AND RPC

* RPC Web API = Remote Procedure Call
  * Is all about ACTIONS described by verbs: addMovie
* REST: REpresentational State Transfer (ne signifie rien)
  * Is about Resources (server data = resources or collection of resources)
  * resources can be modified
  * action on resources (verb) are modeled after HTTP methods
  * HYPERMEDIA as Engine of App State (Hate OAS): additional resources and possible actions on resources can be discovered by hypermedia (links)
  * REST is STATELESS:
    * no client session on server kept between request
    * all info are contained within the request
    * statelessness helps with better scalability, makes caching and load balancing easier.
  * REST is cachable:
    * server response defines if a resource can be cached
    * don't cache any other responses than GET
    * GET, PUT, DELETE = idempotent requests = for every call, same outcome
    * POST, PUT, PATCH, DELETE are unsage (modify resources), GET, HEAD are safe
  * uniform interface: separation between client and server
  * URIs identify resources
  * layered service: can have any number of intermediate servers
  * returned an HTTP status code (200 -> 500)
* Request Headers:
  * Accept:
    * Format of RESPONSE body needed => Accept: application/json
    * Version of API => Accept version = 1.2
  * Authorization:
    * Via Password => Authorization: Basic username:password (base 64 encoded string)
    * via Token => Authorization: Bearer API_TOKEN
  * Content-Type: specify the format of the REQUEST body
    ...
* Response Headers:
  * Cache-control: cache policy for client
    * max-age = 3600 (cache for one hour)
    * no-cache, no-store (should not be cached)
  * Content-type: response format
  * Age header: age of first request (used by caching systeme)
    ...

=> GOOD PRACTICES

* Identify resources by plural nouns Movie => /movies, /movies/3
* OK to have nested resources: /movies/3/roles/6 (in this case roles is a method called on movie/3 => RPC)
* OK to have many URI for same resources like /movies/3/roles/6 and /roles/6
* Verbs
  * POST /movies => create new movie + status code 201
  * GET /movies => get list of all movies + status code 200
  * GET /movies/3 => get movie with id 3
  * PATCH /movies/3 => update movie with id 3
  * DELETE /movies/3 => delete movie with id 3

=> ENVIRONMENT SETUP

* Virtualbox + Vagrant
* Install Laravel/Homestead box for Vagrant and set it up (NFS binding, host)
* Install symfony standard edition

=> BASIC REST OPERATIONS - Creating Database Models, Migrations and Fixtures

=> BASIC REST OPERATIONS - View Layer Concept of FOSUserBundle

=> BASIC REST OPERATIONS - GET - display list of resources

=> BASIC REST OPERATIONS - POST (adding new resource)

=> BASIC REST OPERATIONS - DELETE

=> BASIC REST OPERATIONS - GET - display single resource

=> VALIDATE INPUT

=> LINK RESOURCES

=> HANDLING RELLATIONS DESERIALIZATION

=> VALIDATE RELATIONS

=> HATEOAS (HAL JSON)

=> MODIFYING RESOURCES WITH PATCH

=> API SECURITY

* SIMPLE TOKEN AUTHORIZATION

* USER ACCOUNTS

* EXCHANGING USER CREDENTIALS FOR TOKEN

* GENERATE SECURE TOKENS (JSON Web Tokens)

=> USER REGISTRATION

=> USER PERMISSIONS

=> USER PASSWORD RESET
