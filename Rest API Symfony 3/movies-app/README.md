# Create a REST API with Symfony 3

Source: https://www.udemy.com/creating-rest-api-in-symfony/learn/v4/t/lecture/9345162?start=0

## REST API AND RPC

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

## GOOD PRACTICES

* Identify resources by plural nouns Movie => /movies, /movies/3
* OK to have nested resources: /movies/3/roles/6 (in this case roles is a method called on movie/3 => RPC)
* OK to have many URI for same resources like /movies/3/roles/6 and /roles/6
* Verbs
  * POST /movies => create new movie + status code 201
  * GET /movies => get list of all movies + status code 200
  * GET /movies/3 => get movie with id 3
  * PATCH /movies/3 => update movie with id 3
  * DELETE /movies/3 => delete movie with id 3

## ENVIRONMENT SETUP

* Virtualbox + Vagrant
* Install Laravel/Homestead box for Vagrant and set it up (NFS binding, host)
* Install symfony standard edition

## BASIC REST OPERATIONS - Creating Database Models, Migrations and Fixtures

* Installation de DoctrineMigrationsBundle
* config de l'utilisateur dans la base de données
* parameters.yml.dist
* bin/console doctrine:database:create
* bin/console doctrine:generate:entity => création des entités + repository en ligne de commande
* bin/console doctrine:generate:entities => création des getters et setters lorsque l'on ajoute des attributs à la classe entité
* bin/console doctrine:migration:diff / migrate => création du versioning de la base de donnée et création physique des tables et attributs (mieux que bin/console doctrine:schema:update qui ne permet pas de revenir en arrière en cas de problème)
* Fixtures:

  * Installation de DoctrineFixturesBundle: voir https://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html
  * cration d'un dossier DataFixtures (ou autre d'ailleurs) et des classes de ce type:

        class AppFixtures extends Fixture
        {
          public function load(ObjectManager $manager)
          {

  As stated by the docs, the fixtures load command "looks for all services tagged with doctrine.fixture.orm. If you're using the default service configuration, any class that implements ORMFixtureInterface (for example, those extending from Fixture) will automatically be registered with this tag."

  * accessing services from the fixture => use dependency injections (works because fixtures are services) - "You can also access the container via the $this->container property. But remember that not all services (i.e. private services) can be accessed directly via the container.":

        private $encoder;

        public function __construct(UserPasswordEncoderInterface $encoder)
        {
            $this->encoder = $encoder;
        }

## BASIC REST OPERATIONS - View Layer Concept of FOSUserBundle

* Allows to write format agnostic controller, ie that can handle HTML, XML, JSON
* Output is generating using Twig (for HTML) or Serializer. JMS/Serializer is used here.
* Normally:
  * if you want to output HTML => use Response object
  * if you want to ouput JSON => use JsonResponse object
* Here, you return the handled View object instance (ie processed by ViewHandler)
* Process:

  * View object is modeled after Symfony Response + data, headers, status code
  * View object is processed by ViewHandler, that convert it to JSON, XML, ...
    * ViewHandler use a serializer (JMS/Serializer for ex) or templating engine (like Twig) to create output
    * to let ViewHandler determines format of output you can:
      1.  add format add the end of url (.json)
      2.  add Accept: application/json in header
    * ViewHandler return a Symfony Response object

### VIEW/HANDLEVIEW - To simplify, we use the FOSRest Controller Trait that includes following methods (we can access them also by extending FOSRestControllerFos instead of AbstractController:

* $this->view($data) create View object ($data is typically a doctrine entity, like $movie)
* this->handleView() to convert View into Response

```
Example of controller with only FOSRestController

class UsersController extends FOSRestController
{
  public function getUsersAction()
  {
      $data = ...; // get data, in this case list of users.
      $view = $this->view($data, 200);

      return $this->handleView($view); => this is where the serialization takes place
  }
```

* setTemplateData is used to pass more data in template not for serialization

```
 $view = $this->view($products, 200)
          ->setTemplate("MyBundle:Category:show.html.twig")
          ->setTemplateVar('products')
          ->setTemplateData($templateData)
```

### LISTENERS - To simplify even more, we use Listeners, that hooks into the request handling

* BodyListener: to decode request JSON into a Doctrine Entity
* FormatListener: to determine the correct format
* ViewResponseListener: automatically convert returned object (Entity, Collection or array) into JSON

  * add @Rest\View() in controller action annotations to omit $this->handleView (we can then return directy the view object)
  * config.yml under fos_user, view_response_listener: 'force' => allow to simply return Doctrine entities or collection, and they will be automatically serialized
  * we can set statusCode and serialization groups to determine when we want the output to be automatically serialized or not

  ```
  /**
  * @Rest\View()
  /*
  public function getMovieAction(?Movie $movie)
  {
    if (null === $movie) {
    return $this->view(null, 404); => OK because of annotation @Rest\View()
  }

      return $movie; => OK because of option view_response_listener: 'force' dans config.yml, serizalization is automatically handled by ViewResponseListener

  }
  ```

### SERIALIZER - Used to turn object into a specific format: JSON, XML, ...

* How does it works ?
  * Serialization = normalization of object (transform in array) + encoding in output format
  * Deserialization = decoding of JSON, XML + denormalization of array into object
* Attribute groups, used to serialize different sets of attributes from entities (define what is shown if serializationContext or what is processed via deserializationContext)
  * Define group via annotation in Entity
    ```
    **
    * @Groups({"group1", "group2"})
    */
    ```
  * use it in serialize/deserialize function as parameters to return only the attributes that belongs to the group,
  * or via @ParamConverter options in Controller (serializationContext/deserializationContext options)
    ```
    @ParamConverter("role", converter="fos_rest.request_body", options={"deserializationContext"={"groups"={"Deserialize"}}} )
    ```

### SERIALIZATION GROUPS

* The serializer supports different exclusion strategies. Each strategy allows you to define which properties of your objects should be serialized.:
  * If you would like to always expose, or exclude certain properties. Then, you can do this with the annotations @ExclusionPolicy, @Exclude, and @Expose.
    * @ExclusionPolicy set's the default behavior, to either exclude or include all properties of serialized/deserialized object (and related objects too - eg. Role having a Person, Person will inherit exclusion policy from Role, when object serialized is Role).
    * If your ExclusionPolicy is all, you need to add @Expose to properties you want serialized.
    * If your ExclusionPolicy is none, you need to add @Exclude to properties you DO NOT want serialized.
  * Another default exclusion strategy is to create different views of your objects. Let?s say you would like to serialize your object in a different view depending whether it is displayed in a list view or in a details view. You can achieve that by using the @Groups annotation on your properties.
    * You might want password property deserialized (user needs to submit it somehow), you add @Groups({"Deserialize"}). You do not want to ever serialize user password, so group "Serialize" is never on that property. Then, when either serializing, or deserializing - you tell serializer what GROUP it should use for that operation.
    * Any property without an explicit @Groups annotation will be included in a Default group, which can be used when specifying groups in the serialization context.
    * @Serializer\Exclude() on attribute you don't want to show
    * @Serializer\Groups when you want to have more fine-grain control on the way you display attributes, compare to @Serializer\Exclude

### DEFINITION OF GROUPS (VALIDATION & SERIALIZATION)

* For serializer groups, there is a ['Default'] entry in config.yml for for_user/serializer but nothing in yml file for "Deserialize" and "Patch" groups.
  * I define which entity attributes to deserialize (validate) in the Entity file by means of annotation. For deserialization annotation, the default group is named as of config.yml.
  * Then, on actions I want to have special behaviors (in term of validation or deserialization), I use @ParamConverter options to setup "validator" groups or "deserializationContext" group by explicitly telling the controller action which group it should look for. There is no addition configuration file involved. You define groups on the fly - that means, when a group suddenly appears in annotation, it's start to exist.
  * When post action are called, the controller read the group in annotation, deserialize the input and create an object, ignoring entity attributes that do not have this group specified in their annotation. In production these annotations are cached. Each Entity would have it's metadata, on DEV it's always being read from annotations. On PROD the annotations are cached (in files, in APC, in Memcache or Redis). You need to remember to clear the prod cache after you make changes to serializtion/validation annotations

## BASIC REST OPERATIONS - GET - display list of resources

* composer require friendsofsymfony/rest-bundle + jms/serializer-bundle
* config.yml pour setup FOSRest
* routing.yml => ajouter le paramètre type:rest pour l'automapping d'une route + resource: nom du controller sans .php à la fin

  * voir doc FOSRest pour information sur génération automatique des routes: https://symfony.com/doc/master/bundles/FOSRestBundle/5-automatic-route-generation_single-restful-controller.html
  * Exemple

        class UsersController
        {
            public function copyUserAction($id) // RFC-2518
            {} // "copy_user"            [COPY] /users/{id}

  * IMPORTANT: si class UserController implements ClassResourceInterface, on peut omettre la partie Users dans les méthodes. Pour éviter un problème avec getUserAction et getUsersAction, par convention getUserAction == getAction et getUsersAction == cgetAction
  * On peut également override le nom de la resource utilisée via les annotations

        /**
        /* @RouteResource("User")
        /*
        class FooController
        {

* bin/console debut:router permet d'afficher les routes disponibles et vérifier que tout fonctionne
* Utilisation de SensioFrameworkExtraBundle for extra functionalities:

  * defaut FrameworkBundle implements a basic MVC
  * SensioFrameworkExtraBundle add CONVENTIONS and ANNOTATIONS, for more concise controllers

    * Default settings
      ```
      sensio_framework_extra:
        router: { annotations: true } => setup annotation for route
        request: {
            converters: true, => allow to use @ParamConverter
            auto_convert: true
        }
        view: { annotations: true }  => setup annotation for route
        cache: { annotations: true }  => setup annotation for cache
        security: { annotations: true }  => setup annotation for security
        psr_message: { enabled: false } # Defaults to true if the PSR-7 bridge is installed
      ```
    * Annotations defined by this bundle:

      ```
      /**
      * @Route("/{id}")
      * @Method("GET") => can be ommited (default)
      * @ParamConverter("post", class="SensioBlogBundle:Post") => can be omitted with we use type hinting, like in showAction(Post $post)
      * @Template("SensioBlogBundle:Annot:show.html.twig", vars={"post"}) => can be omitted (autowiring)
      * @Cache(smaxage="15", lastmodified="post.getUpdatedAt()", etag="'Post' ~ post.getId() ~ post.getUpdatedAt()")
      * @Security("has_role('ROLE_ADMIN') and is_granted('POST_SHOW', post)")
      */
      ```

## BASIC REST OPERATIONS - POST (adding new resource)

* @PARAMCONVERTERS

  * The @ParamConverter annotation calls converters to convert request parameters to objects. These objects are stored as request attributes and so they can be injected as controller method arguments. We have this kind of annotation:

    ```
    @ParamConverter("post", class="SensioBlogBundle:Post")
    ```

    * The converter tries to get a SensioBlogBundle:Post object from the request attributes (request attributes comes from route placeholders -- here id);
    * If no Post object is found, a 404 Response is generated;
    * If a Post object is found, a new post request attribute is defined (accessible via $request->attributes->get('post'));
    * As for other request attributes, it is automatically injected in the controller when present in the method signature.
    * To detect which converter is run on a parameter the following process is run: If an explicit converter choice was made with @ParamConverter(converter="name") the converter with the given name is chosen. Otherwise all registered parameter converters are iterated by priority.

    ```
    /**
    * @ParamConverter("role", converter="fos_rest.request_body", options={"deserializationContext"={"groups"={"Deserialize"}}} )
    * @Rest\NoRoute()
    */
    public function postMovieRolesAction(Movie $movie, Role $role, ConstraintViolationListInterface $validationErrors)
    ```

    * It loads fos_rest.request_body converter
    * The converter get the request attributes (id), use the PostRepository method find() (can be defined in @ParamConverter optons), convert it to an object and inject it into the function;
    * only object attributes part of Deserialize group (defined in Entity), will be "hydrated"

  * @ParamConverter can be omitted if we inject object as a parameter

  * Use @NoRoute() annotation for the route using fos_rest.request_body converter and setup via YAML the route so we don't have the $movie in the route

* important to overwrite 'normal' behavior for 404 HttpException

## HANDLE EXCEPTION / VALIDATE INPUT

* Basics:
  * fos_rest->exception->enabled = true (enable error but raw SQL error)
  * enable validation for fos_rest in config.yml: fos_rest->body_converter->validate=true
* Entity:
  * define constraint in Entity through annotations @Assert
* Controller:
  * fos_rest->body_converter->validation_errors_argument: validationErrors
  * inject ConstraintViolationListInterface $validationErrors in action: name of the parameter same as the one defined in config.xml
  * VALIDATION of deserialized object: You can configure the validation groups used by the validator via the validator option of @ParamConverter
* To better handle exception (in a RESTful way):
  * Create Exception/ValidationException.php that handles constraintViolationList the way we want
  * new controller ExceptionController.php
    * handles different types of error and show it properly
    * setup in config.yml: fos_rest->exception->exception_controller = AppBundle\Exception\ExceptionController::showAction

### VALIDATION GROUPS

* Like (De)serialization groups you can use group to define when you need (or need not) to validate an input (useful for PATCH action for example). They are however disctinct

## LINK RESOURCES (Roles to Movies)

* In an Entity:

  * A ManyToOne relation with another Entity 2, means that many Entity can be related to one Entity 2 (products to category). In Entity 2, relation is OneToMany.
  * A OneToMany relation with another Entity 2, means that one Entity can be related to several Entity 2. In Entity 2, relation is ManyToOne.

  ```
  in Role entity (owning side)

    /**
     * @ORM\ManyToOne(targetEntity="Movie", inversedBy="roles")
     */
    private $movie;

  in Movie entity (optional but allow to automatically add own collection of its own roles - need to be an array collection, and need to instantiate it in controller - inverse side)

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="Role", mappedBy="movie")
     */
    private $roles;
  ```

  * This many-to-one mapping tells Doctrine to use the movie_id column on the role table to relate each record in that table with a record in the movies table.
  * the roles attribute in movie entity will hold the relation with role entities
  * when saving inside a controller, you just have to call $role->setMovie($movie) and a a single row is added to both the category and product tables
  * when querying, lazy loading will make 2 queries instead of one. If you want to lower the number of query, make a join thanks to a RoleRepository custom find function.
  * Doctrine will only check the owning side of an association for changes.

## HANDLING RELATIONS DESERIALIZATION

* we don't have to use the @ParamConverters to persist the roles, but we will
* pb -> envoi un post d'un id pour identifier l'acteur qui joue le rôle, mais dans la base on a une relation avec une autre table et il faut pouvoir l'associer avec une entrée dans la table Role

```
{"person": 2}
```

* CUSTOM ANNOTATION CLASS + CUSTOM SERIALIZER to simplify controller the creation for $person attributes of Role such annotation

  ```
  @App\DeserializeEntity(type="AppBundle\Entity\Person", idField="id", idGetter="getId", setter="setPerson")
  ```

  * Create Annotation/DeserializeEntitie.php
  * Create Serializer/DoctrineEntityDeserializationSubscriber.php that defines custom function that is hooked in the serialization process and use the custom annotation class + enable custom serializer in services.yml via tag
  * Le custom serializer permet:
    * dans une méthode preDeserialize (This is dispatched before an object is deserialized. You can use this to modify submitted data, or modify the type that is being used for deserialization), tranformation de l'id en [id] pour que le serializer le comprenne mieux
    * dans une méthode postDeserialize (This is dispatched after a type is processed. You can use it to normalize submitted data if you require external services for example, or also to perform validation of the submitted data.), on récupère l'entity Person correspondant à cet id et on l'affiche dans la requête de retour

* use of ReflectionClass or ReflectionObject: allow to get all info on object that is "reflected" and then allow proper attribute setup

## VALIDATE RELATIONS

## HATEOAS (HAL JSON)

* Hypertext Application Language (HAL): relation parts of object get bigger and bigger, we can define hyperlinks to navigate to resource instead of showing it
* By default all properties of Role are serialized and we don't want that: Groups + @Serialize
* composer require willdurand/hateoas-bundle
* ExclusionPolicy on Role Class
* add options to ParamConverter of postMovieRolesAction()

## MODIFYING RESOURCES WITH PATCH

* add PATCH route in routing.yml
* use groups again to define which attributes can stay empty in the request body when modifying
* create EntityMerger class with merge function, wire up in construct fonction in Movie Controller and call it in new patch method + add annotation with @ParamConverter with validator options

## API SECURITY

* Authentication:
  * When a request points to a secured area, and one of the listeners from the firewall map is able to extract the user's credentials from the current Request object, it should create a token, containing these credentials.
  * The next thing the listener should do is ask the authentication manager to validate the given token, and return an authenticated token if the supplied credentials were found to be valid.
  * The listener should then store the authenticated token using the token storage
* Authorization:
  * When any of the authentication providers (see Authentication Providers) has verified the still-unauthenticated token, an authenticated token will be returned. The authentication listener should set this token directly in the TokenStorageInterface using its setToken() method.
  * From then on, the user is authenticated, i.e. identified. Now, other parts of the application can use the token to decide whether or not the user may request a certain URI, or modify a certain object. This decision will be made by an instance of AccessDecisionManagerInterface.

### HOW IT WORKS ?

* BASIC AUTH: API Consumer try to reach ressource with info in header -> security check if authorized
* TOKEN AUTH

  1.  API Consumer -> get token via Basic Auth (with password and username) on /user/token
  2.  send request with token in header (Authentication: Bearer <token>) -> validation of token by security bundle -> request is processed

### SIMPLE TOKEN AUTHORIZATION (Based on X-Auth-Token)

* Security/TokenAuthenticator extends AbstractGuardAuthenticator that implements an interface (engine of authentication)
* in security.yml:
  * security -> firewalls -> secured_api -> stateless = true (user don't have its own session, we don't keep it in the server / has to authenticate with each request)
  * security -> firewalls -> secured_api -> guard -> authenticators -> AppBundle\Security\TokenAuthenticator
* In Controllers add @Security Annotation, to define right to access (on class and on methods)

  ```
  /**
  * @Security("is_anonymous() or is_authenticated()")
  */
  class MoviesController extends AbstractController
  ```

### ADD USER ACCOUNTS (autentication through apiKey)

* New Entity, Repository, Fixtures of User
* in security.yml:
  * security -> providers -> database -> entity -> class: AppBundle:User
  * security -> providers -> database -> entity -> property: apiKey
* TokenAuthenticator -> getuser -> loadUserByUsername (add this method in repository)

### EXCHANGING USER CREDENTIALS FOR TOKEN (authentication with user/pwd to get token)

* UserController with tokenAction to find user by username and get token if exist
* add password: security.yml: security -> encoders -> AppBundle\Entity\User -> algorithm: bcrypt
* in UserController, inject UserPasswordEncoderInterface and use it to encode password

### GENERATE SECURE TOKENS (JSON Web Tokens) AND USE USERNAME instead of APIKEY

* install lexik/jwt-authentication-bundle to generate a new token each time the user LOGS IN (and not on every request)
* generate private and public keys with openssl (added to TOKEN for security)
* config.yml + parameters.yml
  ```
  lexik_jwt_authentication:
    private_key_path: '%jwt_private_key_path%'
    public_key_path: '%jwt_public_key_path%'
    pass_phrase: '%jwt_key_pass_phrase%'
    token_ttl: '%jwt_token_ttl%'
  ```
* Security/TokenAuthenticator.php:
  * inject JWTEncoderInterface $jwtEncoder in constructor
  * in getCredentials, add new AuthorizationHeaderTokenExtractor
  * in getUser use $jwtEncoder to decode credentials (token) returned by getCredentials. If true, we load user with username
* security.yml change apiKey to username
* UserController:
  * inject JWTEncoderInterface $jwtEncoder in constructor
  * in token action use $jwtEncoder to encode (generate) new token
* User Entity -> remove apiKey

## USER REGISTRATION

* User Entity: @UniqueEntity('username') to be sure that entity is unique
  * @UniqueEntity and @ORM\Colum(unique=true) are two different things
    * @ORM\Column(type="string", unique=true) is a Doctrine thing, that adds a unique key for that field in the database. That's a database concept, so outside your app, you won't be able to duplicate this column in another row.
    * @UniqueEntity("username") is a Symfony validator constraint. When you validate your Entity (or any other object or data), using Symfony Validator component, it behaves as one of the constraints, like eg. @NotBlank. It will query the database first to see if a record with this column exists, when you validate an Entity.
    * Regarding "id" field, the @Id annotation makes it a primary key. Primary key in any database is unique by default, always. @GeneratedValue is only a strategy to apply (AUTO_INCREMENT - in MySQL world). So any next, subsequently added record would get a next value. ID does not have to be a number, it might be UUID, or a string. @GeneratedValue tells doctrine to do add "AUTO_INCREMENT" strategy.

## USER PERMISSIONS - ACCESS DECISION MANAGERS / VOTERS / ROLES

### SECURE ACCESS TO PROFILE -> Only owner can see its profile

* Voters are the most granular way of checking permissions (can this specific user edit the given item)
  * In order to use voters, you have to understand how Symfony works with them. All voters are called each time you use the isGranted() method on Symfony's authorization checker or call denyAccessUnlessGranted in a controller (which uses the authorization checker).
  * Ultimately, Symfony takes the responses from all voters and makes the final decision (to allow or deny access to the resource) according to the strategy defined in the application, which can be: affirmative, consensus or unanimous.
* Implementation:
  * On route that we want to secure
    ```
    @Security("is_granted('show', theUser)", message="Access Denied")
    ```
  * To function, we need to create VOTER in Security/UserVoter that extends Voter (automatically wired up)
    * Voter::supports => define if this voter should vote on the specific attribute/subject combination
    * voteOnAttribute => called if the previous function returns true
* Normaly Voter is automatically called but you can also set it up with tag security.voter in services.yml

### ADD ADMIN PRIVILEGES TO CERTAIN USERS

* Check for roles inside the VOTER

## TOKENSTORAGE - ALLOW ONLY ONE SINGLE ACTIVE TOKEN PER USER

* Need to invalidate token each time user change its password => store each token in REDIS database and clear entry when patchUserAction
* Need Redis installed in server + composer require snc/redis-bundle + configuration + composer require predis/predis
* new Security/TokenStorage.php with store/invalidate/isValid function
* in TokensController::postTokenAction, use the store function
* in UsersController::patchUsersAction, use the invalidate function when reset password to invalidate token
* in TokenAuthenticator::getUser, use the isValid function

# FILE UPLOAD

* Image Entity => (talk a bit about Doctrine Factory Method as an alternative method to inject services in controller)
* First, postImageAction in controller:
  * Returns $this->view instead of $object as we want to configure the view.
  * More specifically we want to add in Header the endpoint (URL) where to upload the image
  * This URL is images_upload_put route
* Second, putImageUploadAction
  * To fetch image directory setup in parameters.yml
    * we can have access to the container and then parameters via $this->getContainer()->getParameter('nameofparameter') (or just $this->getParameter('param_name') if controller extends Controller or ContainerAwareController)
    * we can pass it as arguments of services in service.yml and then initiate it via constructor
