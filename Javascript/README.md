Source: https://www.udemy.com/the-complete-javascript-course

# JAVASCRIPT BASICS

* JS is a LIGHTWEIGHT CROSS PLATFORM OBJECT ORIENTED language
* Analogy:
  * HTML = nouns (paragraph)
  * CSS = adjectives (red)
  * JS = verbs (hide)
* Only 5 primitive data types (primitive means not object): number (float even for int), string, boolean, undefined (does not have a value yet), null (non existent)
* JS has dynamic typing (type of variable defined on the fly)
* Variable mutation: changing the value of a variable.
* Type coercion: when there are several variable to "ouptut together" (like in a concatenate), dynamic typing auto convert all variables to the same data type.

## USEFUL JS FUNCTIONS

* prompt() => display input box (to be associated to variable in order to manipulate input)

             var truc = prompt('message')

* alert() => display message
* Math.random() => to generate random number between 0 and 1.
* Ternary operator

        actionPlayer === 0 ? activePlayer = 1 : activePlayer = 0;

## Statements / Declarations & Expressions

    function someFunction(par){} => function STATEMENT or DECLARATION, performs an action but does not produce an immediate value
    var some Fun = function(par){} => function EXPRESSION, that returns a value

    if(x === 3){} => statement
    var x = 3; => expression

## Arrays (Indexed Collection)

    [] === new Array()

* Arrays are ORDERED set of values.
* Plain arrays (Array object) have specific methods like map, length, reduce, filter:
  * .push(var) => adds an element at the end of an array (mutate array)
  * .unshift(var) => adds an element at the beginning of an array
  * .pop() => remove last element
  * .shift() => remove first element
  * .indexOf(var) => returns position of the element
* SETS objects are collection of values, you can iterate its elements in insertion order. A value in a Set is unique. A Set can be converted to and from Arrays.

## Objects (Collection of properties ie attributes and methods - Keyed Collection - association between key and value)

* MAPS objects are also Keyed Collection (introduced in ES6). They map values to values, and have advantages for simple maps over objects.
* objects are associative arrays / hashes in javascript. They don't have access to Array methods.
* no particular orders of properties
* object literal: var john = {} (executes faster)
* var john = new Object(); useful if need to use a constructor (new Person(hair,age) for example)
* access to properties: john.name or john['name']
* var: it is better to use const and let as var can add to global scope the variable.

## Loops

    for(var i = 0;i<10;i++){}

    var i = 0;
    while (i<10){
        ...
        i++;
    }

    for(...){
        ...
        break; => break loop
    }

    while(...){
        continue; => skip to next iteration;
        ...
    }

## Conditionnal statements

    if(... == ...){
        ...
    }else{
        ...
    }


    switch(var){
        case x:
            ...
            break;
        case y:
            ...
            break;
        default:
            ...
    }

# Javascript Execution

* JS is usually hosted in the browser where it runs (but NodeJS allow to use server side)
* Each browser has its own Javascript Engine (V8 for Chrome, SpiderMonkey, JavascriptCore, ...)
* code is executed by Javascript Engine:
  * A parser check if the code is OK
  * Then create Abstract Syntax Tree
  * It is converted to Machine code
  * Then the code is run
* Javascript is a single threaded single concurrent language, meaning it can handle one task at a time or a piece of code at a time. It has a single call stack which along with other parts like heap, queue constitutes the Javascript Concurrency Model

## Execution context and execution stack

* Execution context: a container that stores variables and where code is executed.
* Default context = global context
* in this the default context, every code that is not a function is executed
* global context is associated with the GLOBAL OBJECT = window object

        window.lastName === lastName

* a new function gets its own execution context when it is executed.

        var name ='John';
        function first(){
            var a = 'hello';
            second();
            var x = a + name
        }

        function (second){}

        first();

  * Execution stack:

            second() execution context
            -----------------------------
            first() execution context: a, x
            -----------------------------
            Global execution context: John, first, second

* an execution context is removed from the top of the execution context when it returns
* Content of Execuction Context Object

            EXEC CONTEXT OBJECT (generated when new function)
             --- VARIABLE OBJECT (function parameters, function declaration) ---
             --- SCOPE CHAIN (current variable objects + variable object of its parents) ---
             --- "this" variable ---

## Lifecycle of Execution Context object:

1.  Creation Phase
    1.  Creation of Variable Object(VO)
    2.  Creation of the scope chain
    3.  determine value of 'this' variable
2.  Execution Phase: The code of the function that has generated the current execution context is ran line by line

### Creation of Variable Object

* argument object is created, containing all the arguments that were passed into the function.
* Hoisting: functions and variables are available before the execution phase starts
  * Code is scanned for function declarations: for each function, a property is created in the VO, POINTING to the function.
  * Code is scanned for variable declarations: for each variable a property is created in the VO and set to undefined.
* FUNCTIONS are already DEFINED before the execution phase starts.
* VARIABLES are setup to UNDEFINED and will only be defined in the execution phase.
* If function expressions instead of function declarations, calling functions before expression results in error
* If function declarations, you can call function before
* The biggest takeaway of hoisting is using function declarations that allows to use functions before it is declared in the code.

### Creation of scoping chain

* scoping answers the question "where we can access a certain variable ?"
* each new function creates a scope: the space/environment in which the varialbes it defines are accessible. in other languages, for/if/while blocks can create scope but NOT in JS
* Lexical scoping: a function that is lexically within another function gets access to the scope of the outer/parent function
* the global scope never has access to function scope
* execution stack != scope chain
  * execution stack: order in which functions are called. Execution context object stores the scope chain of each function in the variable object but do not have an effect on the scope chain itself.
  * scope chain: order in which function are written lexically

### Determine value of "this" variable

* REGULAR FUNCTION CALL: the "this" keyword points at the global object ("window" in browser)
* METHOD CALL: the "this" variable points to the object that is calling the method
* The "this" keyword is not assigned a value until a function where it is defined is actually called.
* If a function call is made - in which this is invoked - within a method call, "this" refers to global object "window"
* METHOD BORROWING:

            john = {
                name:'John';
                calculateAge: function(){}
            }

            mike = {name: 'Mike'}

            mike.calculateAge=john.calculateAge

# EVENTS

* event = notification that is set to notify the code that something happened
* event listener = a function that performs an action based on a certain event
* message queue = this is where all the events happening in the browser are put and sit there waiting to be processed

* An event can only be processed/handled by an event listener if the execution stack is empty (all functions have returned)

* Process

  * Execution Stack Contexts are generated and then cleaned up.
  * When the Execution Stack is empty, Message Queue start to process events that has been logged.
  * If an event listener has been binded to an element waiting for the event to happen, the callback function of this listener is called and has its own execution context, put in the Execution Stack
  * Then is processed
  * Same thing happened for remaining events

        VANILLA JAVASCRIPT

        document.querySelector().addEventListener('click', callback function);
        document.querySelector().addEventListener('click', fn);                 => name of function without ()
        document.querySelector().addEventListener('click', function(){...});    => anonymous function

        the addEventListener has a third parameters that control how listener reacts to bubbling events.

        JQUERY

        $(element).on('click',callback function)

    * better to use JQuery bacause handle browser compatibility issue

# DOM - Document Object Model

* Structure representation of an HTML document used to connect HTML to JS. For each HTML box, there is an object in the DOM that we can access and manipulate.

* DOM Manipulation

        VANILLA JAVASCRIPT

        document.querySelector('#score').textContent = 'truc'       => change content with plain text
        document.querySelector('#score').textContent                => diplay content
        document.querySelector('#score').innerHTML = '<b>truc</b>'  => change content with Html code
        document.querySelector('#score').style.display = 'none'     => change style of element

        document.querySelector('.name')                             => select first item with class/id/tag name (newer feature compare to other below)
        document.getElementById('idname')                           => select element with id (only 1 element is returned)
        document.getElementsByTagName('div')                        => return an array with all elements with tag
        document.getElementsByClassName('class')                    => return an array with all elements with class

        JQUERY

        $('#name')

* It is usually better to use jQuery (or its DOM manipulation library Sizzle), as it is quicker to write, is optimized and crossbrowser compatible.

* Class Manipulation

        VANILLA JAVASCRIPT

        document.querySelector(...).classList.remove('name')
                                             .add('name')
                                             .toggle('name')

        JQUERY

        $(element).addClass('name')
                  .removeClass('name')
                  .toggleClass('name')
                  .css('property name')         => display attribute value
                  .css('property name',value)   => set value of attribute

* On load function

        VANILLA JAVASCRIPT

        document.addEventListener('DOMContentLoaded', function, false);

        JQUERY

        $(document).ready(function() {
            // executes when HTML-Document is loaded and DOM is ready
        });

        $(window).load(function() {
            // executes when complete page is fully loaded, including all frames, objects and image…
        }

# PRIMITIVE & OBJECTS

* (Almost) everything in JS is an object

  * Primitive: number, strings, booleans, undefined, null
  * Objects: arrays, functions, objects,date, wrappers for nb, string and boolean

* Variable containing Primitive actually hold that data inside of the variable itself (new space in memory used)
* Variable containing Objects do not actually contains the object, but a ref to the place in memory.
* when we make var obj2 = obj1, no copy is actually created but both obj1 et obj2 point to the same object in memory.
* in function the same happens, function create a new ref to objects passed as parameters and create a new copy for primitive passed as parameters.
* To copy an object instead if ref, use Object.assign()

## OBJECT CREATIONS

* Inheritance:

  * In JS, a CONSTRUCTOR with a PROTOTYPE property is similar to class in other languages, it is used to build instances.
  * JS is a prototype based language, ie it used prototype for inheritance, ie inheritance is made possible through the prototype property that every object has.
  * Prototype property: it is where we put methods and properties we want children object to inherit
  * Every JS object has a prototype property which makes inheritance possible and every object that we create is an instance of the Object constructor (down the prototype chain)
  * The prototype of an object is the prototype property of its parent
  * an object can call every of its own methods or properties as well as those of its chain of parents => prototupe chain for method lookup
  * The CONSTRUCTOR's prototype property is NOT the prototype of the constructor itself, it's the prototype of ALL instances that are created through it.

* 2 ways of creating objects:
  * Through a function constructor (ie Functional Pattern)
  * Through Object.create
* Reasons to choose one or the other:
  * Object.create make object inherit directly from the object passed in the first argument whereas function constructor pattern make the newly create object inherit from the constructor's prototype property.
  * Object.create allow to implement a complex inheritance structure in an easier way because it allows us to directly specify which object should be a prototype.
  * Function constructor is however the most used pattern for object creation in JS.
  * To put all variables and methods in **proto** or to use Object.create is more memory efficient, but in this case properties and methods are not OwnProperties
  * Object.create is a good choice for subclassing

### Create objects through Function constructors

            var Person = function (name, YoB, job){             => always capitalize name of var for Function Constructors
                this.name = name;
                this.YoB = YoB;
                this.job = job;
            }

            var john = new Person('John', 1990, 'teacher');     => instanciation of a Person object

* How does it work ?
  1.  A brand new EMPTY object is created.
  2.  the constructor fnciton is then called
      * Creation of a new exection context (with a "this" variable)
      * the "this" should point to the global object (function call and not method call) but through the "new" operator, "this" points to the empty obkect that has been initially created
* If you want child object to inherite a property or a method, we should put it in the prototype of the parent object (ie the CONSTRUCTOR)

          var Person = function (...){
                          this.... = ...
                       }

          Person.prototype.calculateAge(...) = fucntion() {...}

* It is best to put a method on a prototype for inheritance purpose instead of the constructor object itself as instances would have all the code, hence repetition and big size in memory. By using inheritance, you can access a method but you don't have to store it multiple times in memory for each instance.
* In console, we can have access to the Prototype Chain through **proto** properties of oebjects
* Some useful functions:

        john.hasOwnProperty('job')  => check if property belong to the Person instance, not its parents
        john instanceOf Person      => check if object is an instance of Person

### Create objects through Object.create

* Process

  * Create an object that will act as a prototype
  * Create a new object based on that prototype

        var personProto = {
            calculateAge: ...
        }

        var john = Object.create(personProto, {
            name: {value: ...},
            job:  {value: ...}
        });

# FUNCTIONS

* a call to a function with parenthesis is called immediatly when code is rendered, if we use a function expression and then the name of the variable it can be passed as callback function (same is true if we pass a function name without parenthesis in case of function declaration)

        function test1(){...}

        var test2 = function(){...}

        ....addEventListener('click',test1)
        ....addEventListener('click',test2)

        test1()     => is processed immediatly
        test2       => is not processed immediatly

## FIRST CLASS FUNCTIONS

* When we say that a language has first-class function, it means that the language treats functions as values:

  * a function is an instance of the Object type
  * It behaves like any other object.
  * we can store a function in a variable
  * we can pass a function as an argment to another function.
  * we can return a function from a function

            function arrayCalc(arr,fn){
                //loop and apply fn on each elt of arr => similar to map methods of Array
            }

            var calculateAge = function(el){
                //
            }

            var multiplyAge = function(el){
                //
            }

            arrayCalc(array, calculateAge)

## HIGH ORDER FUNCTIONS

* Higher order function are function that work on other function, which means that they take one or more function as an argument and can also return a function.

            Function returning a function

            function interviewQuestion(job){
                switch (job){
                    case 'teacher:
                        return function(name){...}
                }
            }

            var teacherQuestion = interviewQuestion('teacher')
            teacherQuestion("John")

## IIFE - Immediatly Invoked Function Expressions (Self Invocation Pattern)

* Self invocation is when a funciton execute immediatly upon its definition.
* We use self invocation when we don't want to create a function name to reduce risk of definition collision (functions with same name in same scope) and want to execute right away on declaration, so that we have private variables (not accessible from outside the scope of the function)

                                        |       Better to use
            function game(){            |
                var score ...           |       (function(var){
                ...                     |           ...
            }                           |       })(var);
            game();                     |

* We can only call an IIFE once
* Collision avoidance:
  * var/functions declared in the same scope with the same name
  * the only way to scope code in JS is by wrapping it in a function
  * IIFE allows to create this scope and launching function without having to declare a name and hence reducing risk of collisions.

## CLOSURE

* an inner function has always acces to the VARIABLES and the PARAMETERS of its outer function, EVEN AFTER THE OUTER FUNCTION HAS RETURNED.

        function retirement(retirementAge){                 => outer function
            var a = ...
            return function(YoB){                           => inner function
                var age = YoB + a
                console.log(retirmentAge - age);
            }
        }

        var retirementUS = retirement(66);
        retirementUS(1990);                                 => has still access to 66 and a

* How doest it work:

  * The scope chain always stays intact even after a function has returned ie closing in on its variable object, and its execution context has disappeared from execution stack ie not accessible anymore.

* We use a closure so a variable passed to the outer function became a private variable of the inner function and thus cannot be changed down the code outside of the function.

* As a closure allow you to associate data (lexical environment of function execution) with the function that generates this data, you can use a closure whenever you can use an object with only a single method

        function test(var){                             |           function test2(var){
            //Do stg                                    |               return function(){
        }                                               |                   // Do stg
                                                        |               }
        test(var) => executed right away                |           }

                                                                    test2 = test2('hello')      => return a function right away (but nothing displayed as per config)

                                                                    ...onclick = test2 => function only executed on event

## BIND / CALL / APPLY

* Special methods for function objects, that allow to set "this" variable manually
* To have access to a method of an object you can use inheritance or METHOD BORROWING

  1.  Throught CALL or APPLY function methods

      * Call

            john.method.call(emily, parameters of method) => this of john's method now points to emily

      * Apply (similar to call but for parameters as array)

            john.method.call(emily, array of parameters) => john's method needs to accept arrays

  2.  with emily.method = john.method (pointers to the same function object)
  3.  CARRYING: creation of a function based on another function with some preset arguments

            var johnFriendly = john.presentation.bind(john, 'friendly')
            johnFriendly('morning')
