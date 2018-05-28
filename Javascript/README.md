# TABLE OF CONTENTS

* [0 - GENERAL WORKFLOW FOR JS APP CREATION](#0)
* [A- JAVASCRIPT BASICS](#a)
* [B - JAVASCRIPT EXECUTION](#b)
* [C - EVENTS](#c)
* [D - DOM - Document Object Model](#d)
* [E - PRIMITIVE & OBJECTS](#e)
* [F - FUNCTIONS](#f)
* [G - MODULES](#g)
* [H - HOW-TO / RECIPES](#h)

Source: https://www.udemy.com/the-complete-javascript-course

# <a name="0"></a> 0 - GENERAL WORKFLOW FOR JS APP CREATION

* Think
  * List user interactions (actions/events and result to have)
  * Make a list of all TASKS that our code need to do
  * Look at the list of TASKS and separate them in logical units (separation of concerns)
  * Define general layout
  * Decompose app in reusable component
* Base Code
  * Code base html / CSS / basic app.js + Add the app.js file at the bottom of the HTML file
  * Structure code in modules, for example:
    * one related to UI updating, the UI module
    * one related to DATA manipulation, the DATA module
    * one related to general CONTROL (such as event handlers) and linking modules, the CONTROLLER module (make difference between data structure manipulation and UI update)
    * Create the Controller side of the app
      * each module with module pattern and separation of concerns (with an AppController that link all module together)
      * Good practice: for querySelector strings, create a variable that store all selectors, so a change in UI can be simply translated in JS code
* Implement actions:
  * Refactor controller to only have function and create an init function as a public method of the Appcontroller
  * Define Data Models (atomic item and data collections) through the use of objects
  * Write function as "Each function has its specific task" + DRY principle (Don't Repeat Yourself)

# <a name="a"></a> A- JAVASCRIPT BASICS

* JS is a LIGHTWEIGHT CROSS PLATFORM OBJECT ORIENTED language
* Analogy:
  * HTML = nouns (paragraph)
  * CSS = adjectives (red)
  * JS = verbs (hide)
* Only 5 primitive data types (primitive means not object): number (float even for int), string, boolean, undefined (does not have a value yet), null (non existent)
* JS has dynamic typing (type of variable defined on the fly)
* Variable mutation: changing the value of a variable.
* Type coercion: when there are several variable to "ouptut together" (like in a concatenate), dynamic typing auto convert all variables to the same data type.

## Useful JS Functions

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

                .push(var) => adds an element at the end of an array (mutate array)
                .unshift(var) => adds an element at the beginning of an array
                .pop() => remove last element
                .shift() => remove first element
                .indexOf(var) => returns position of the element

### ES6

* SETS objects are collection of values, you can iterate its elements in insertion order. A value in a Set is unique. A Set can be converted to and from Arrays.

## Objects (Keyed Collection - association between key and value)

* Collection of properties ie attributes and methods
* objects are associative arrays / hashes in javascript. They don't have access to Array methods.
* no particular orders of properties
* Creation of object:
  * object literal: var john = {} (executes faster)
  * var john = new Object(); useful if need to use a constructor (new Person(hair,age) for example)
* access to properties: john.name or john['name']
* var: it is better to use const and let as var can add to global scope the variable.

### ES6

* MAPS objects are also Keyed Collection (introduced in ES6). They map values to values, and have advantages for simple maps over objects.

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

# <a name="b"></a> B - JAVASCRIPT EXECUTION

* JS is usually hosted in the browser where it runs (but NodeJS allow to use server side)
* Each browser has its own Javascript Engine (V8 for Chrome, SpiderMonkey, JavascriptCore, ...)

## Browser Runtime

* User Interface - User clicks the Do Stuff button. Simple enough.
* Web APIs - The click event propagates thru the DOM’s Web API triggering click handlers during the capture and bubble phases on parent and child elements. Web APIs are a multi-threaded area of the browser that allows many events to trigger at once. They become accessible to JavaScript code thru the familiar window object on page load. Examples beyond the DOM’s document are AJAX’sXMLHttpRequest, and timers setTimeout() function.
* Event Queue - Next the event’s callback is pushed into one of many event queues (also called task queues). Just as there are multiple Web APIs, browsers have event queues for things like network requests, DOM events, rendering, and more.
* Event loop - Then a single event loop chooses which callback to push onto the JavaScript call stack.
* Finally the event callback enters the JavaScript’s runtime within the browser.

## Javascript Runtime

* The JavaScript engine has many components such as a parser for script loading, heap for object memory allocation, garbage collection system, interpreter, and more. Like other code event handlers execute on it’s call stack.
* code is executed by Javascript Engine:
  * A parser check if the code is OK
  * Then create Abstract Syntax Tree
  * It is converted to Machine code
  * Then the code is run
* Javascript Concurrency Model
  * single call stack - execution stack: Function calls form a stack of frames, or execution contexts
  * heap: Objects are allocated in a heap which is just a name to denote a large mostly unstructured region of memory.
  * queue: A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function which gets called in order to handle the message. At some point during the event loop (of the browser), the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use. The processing of functions continues until the stack is once again empty; then the event loop will process the next message in the queue (if there is one).
  * event loop: the JavaScript engine follows a very simple rule: there’s a process that constantly checks whether the call stack is empty, and whenever it’s empty, it checks if the event queue has any functions waiting to be invoked. If it does, then the first function in the queue gets invoked and moved over into the call stack. If the event queue is empty, then this monitoring process just keeps on running indefinitely. And voila — what I just described is the infamous Event Loop!

![js concurrency model](https://developer.mozilla.org/files/4617/default.svg "js concurrency model")

### Characteristics of JS call stack

* Single threaded - Threads are basic units of CPU utilization. As lower level OS constructs they consist of a thread ID, program counter, register set, and stack. While the JavaScript engine itself is multi-threaded it’s call stack is single threaded allowing only one piece of code to execute at a time.
* Synchronous - JavaScript call stack carries out tasks to completion instead of task switching and the same holds for events. This isn’t a requirement by the ECMAScript or WC3 specs. But there are some exceptions like window.alert() interrupts the current executing task.
* Non-blocking - Blocking occurs when the application state is suspended as a thread runs. Browsers are non-blocking, still accepting events like mouse clicks even though they may not execute immediately.

## Execution context and execution stack

* Execution context: a container that stores variables and where code is executed.
* Default context = global context
* in the default context, every code that is not a function is executed
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

* an execution context is removed from the top of the execution stack when the function returns
* Content of Execuction Context Object

            EXECUTION CONTEXT OBJECT (generated when new function)
             --- VARIABLE OBJECT (function parameters, function declaration) ---
             --- SCOPE CHAIN (current variable objects + variable object of its parents) ---
             --- "this" variable ---

## Lifecycle of Execution Context object:

1.  Creation Phase
    1.  Creation of Variable Object(VO)
    2.  Creation of the scope chain
    3.  determine value of 'this' variable
2.  Execution Phase: The code of the function that has generated the current execution context is ran line by line

### Creation of Variable Object

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
* each new function creates a scope: the space/environment in which the variables it defines are accessible. in other languages, for/if/while blocks can create scope but NOT in JS
* Lexical scoping: a function that is lexically within another function gets access to the scope of the outer/parent function
* the global scope never has access to function scope
* execution stack != scope chain
  * execution stack: order in which functions are called. Execution context object stores the scope chain of each function in the variable object but do not have an effect on the scope chain itself.
  * scope chain: order in which function are written lexically

### Determine value of "this" variable

* REGULAR FUNCTION CALL: the "this" keyword points at the global object ("window" in browser)
* METHOD CALL: the "this" variable points to the object that is calling the method
* The "this" keyword is not assigned a value until a function where it is defined is actually called.
* Warning: If a function call is made - in which this is invoked - within a method call, "this" refers to global object "window"

# <a name="c"></a> C - EVENTS

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

## Event Delegation

* Event Bubbling: when an event is triggered on an element (example: clicking on a button), the exact same element is triggered on all of its parent elements.
* Target Element: the first element where the event first happened.
* The target element is stored as a property in the event object, so every parent elements knows about the target element.
* Event delegation: as we know where the event first happen (target element in event object), we can attach an event handler to a parent element and wait for the event to bubble up. Event delegation is to not setup the event handler on the target element but on one of its parents.
* Use cases:
  * When we have an element with lots of child elements that we are interested in.
  * When we want an event handler attached to an element that is not yet in the DOM when our page is loaded.

# <a name="d"></a> D - DOM - Document Object Model

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

# <a name="e"></a> E - PRIMITIVE & OBJECTS

* (Almost) everything in JS is an object

  * Primitive: number, strings, booleans, undefined, null
  * Objects: arrays, functions, objects,date, wrappers for nb, string and boolean

* Variable containing Primitive actually hold that data inside of the variable itself (new space in memory used)
* Variable containing Objects do not actually contains the object, but a ref to the place in memory.
* when we make var obj2 = obj1, no copy is actually created but both obj1 et obj2 point to the same object in memory.
* in function the same happens, function create a new ref to objects passed as parameters and create a new copy for primitive passed as parameters.
* To copy an object instead if ref, use Object.assign()
* Nota: as soon as we use a string or a number, JS puts a wrapper around the strip and convert it to an object with methods such as .split()

## Object Creations

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
  2.  the constructor function is then called
      * Creation of a new execution context (with a "this" variable)
      * the "this" should point to the global object (function call and not method call) but through the "new" operator, "this" points to the empty object that has been initially created
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

# <a name="f"></a> F - FUNCTIONS

* a call to a function with parenthesis is called immediatly when code is rendered.
* if we use a function expression and then the name of the variable it can be passed as callback function (same is true if we pass a function name without parenthesis in case of function declaration)
* Differences between function expression & declaration: Function declarations load before any code is executed / Function expressions load only when the interpreter reaches that line of code (see above)

        function test1(){...}

        var test2 = function(){...}

        ....addEventListener('click',test1)
        ....addEventListener('click',test2)

        test1()     => is processed immediatly
        test2       => is not processed immediatly

## First Class Functions

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

## High Order Functions

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

* Self invocation is when a function executes immediatly upon its definition.
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

## Closure - for private variable definition

* an inner function has always access to the VARIABLES and the PARAMETERS of its outer function, EVEN AFTER THE OUTER FUNCTION HAS RETURNED.

        function retirement(retirementAge){                 => outer function
            var a = ...
            return function(YoB){                           => inner function
                var age = YoB + a
                console.log(retirmentAge - age);
            }
        }

        var retirementUS = retirement(66);
        retirementUS(1990);                                 => has still access to 66 and a

* How does it work: The scope chain always stays intact even after a function has returned ie closing in on its variable object, and its execution context has disappeared from execution stack ie not accessible anymore.
* We use a closure so a variable passed to the outer function became a private variable of the inner function and thus cannot be changed down the code outside of the function.
* As a closure allow you to associate data (lexical environment of function execution) with the function that generates this data, you can use a closure whenever you can use an object with only a single method

        function test(var){                             |           function test2(var){
            //Do stg                                    |               return function(){
        }                                               |                   // Do stg
                                                        |               }
        test(var) => executed right away                |           }

                                                                    test2 = test2('hello')      => return a function right away (but nothing displayed as per config)

                                                                    ...onclick = test2 => function only executed on event

## Bind / Call / Apply - set "this" variable manually

* Special methods for function objects, that allow to set "this" variable manually
* To have access to a method of an object you can use inheritance or METHOD BORROWING

  1.  Throught CALL or APPLY function methods

      * Call

            john.method.call(emily, parameters of method) => this of john's method now points to emily

      * Apply (similar to call but for parameters as array)

            john.method.call(emily, array of parameters) => john's method needs to accept arrays

  2.  with Method Borrowing (pointers to the same function object)

            john = {
                name:'John';
                calculateAge: function(){}
            }

            mike = {name: 'Mike'}

            mike.calculateAge=john.calculateAge

  3.  Bind - CARRYING: creation of a function based on another function with some preset arguments

            var johnFriendly = john.presentation.bind(john, 'friendly')
            johnFriendly('morning')

# <a name="g"></a> G - MODULES

* Important aspect of any robust application's architecture
* Keep the units of code for a project both cleanly separated and organized
* Encapsulate some data into privacy and expose other data publicly

## Implementing the Module Pattern

* One of the most popular design pattern in Javascript
* Data Encapsulation allow us to hide the implementation details of a specific module, ie to hide certain variables and method while exposing a public interface (API)
* Module pattern only use closures and IIFE: we define the module as a IIFE with private method and variables and we return an object that return all variables and function we want to be public.

            var budgetController = (function () {

                var x = 23;                         => is private
                var add = function (a) {            => is private
                    return x + a;
                }

                return {
                    publicTest: function (b) {     => is public through budgetController.publicTest
                        console.log(add(b));
                    }
                }

            })();

* Separation of concerns: each part of an application should only be interested in doing one thing independently
* To link modules into our app we need an AppController and pass it other modules as arguments

            document.addEventListener('keypress', function (event) {
                    if (event.keyCode === 13 || event.which === 13) {
                        ...
                    }
            });

# <a name="h"></a> H - HOW-TO / RECIPES

## Handle simple input submission

### With form submission

            document
                .getElementById("budgetForm")
                .addEventListener("submit", function(e) {
                    e.preventDefault();

                    // get input data
                    // add item to budgetController
                    // add item to UI
                    // calculate budget
                    // display budget to UI
                });

        This one listener handles both the .add__btn button click and pressing enter either .add__description or .add_value.

### With click / keypress event

            document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

            document.addEventListener('keypress', function (event) {
                if (event.keyCode === 13 || event.which === 13) {
                    ctrlAddItem();
                }
            });

## Manipulating DOM

For a list of DOM manipulation, see http://youmightnotneedjquery.com

### Add big chunck of HTML data

* define html placeholder as a string with %...% variable

            var htmlIncome = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

* use replace function

            var newHtml = html.replace('%id%', obj.id).replace('%description%', obj.description)

* use insertAdjacentHTML method

            document.querySelector('.class').insertAdjacentHTML('beforeend', newHTML);

### Change inner content of DIV block

            document.querySelector(DOMstrings.incomeValueContainer).textContent = value;

### Remove an element from the DOM

            var el = document.getElementById(selectorId)
            el.parentNode.removeChild(el);

## Inputs

### Clear inputs

            document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue).clearFields

### Convert field inputs to numbers

            parseFloat(string);

### Prevent False Inputs

* in general controller, add following test

            if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
                ...
            }

## Arrays

### Convert a list to an array

* Trick the slice method to return an array even if we feed him a list
* use call on slice function, stored in Array.prototype

            if fields is a list

            Array.prototype.slice.call(fields);

### Remove one element from an array

            array.splice(id,1);

### Get Index of element from value (in an array)

            index = array.indexOf(value);

## Strings

### Format Number

            formatNumber: function (type, number) {
                var numSplit, int, dec, type;
                number = Math.abs(num);
                number = number.toFixed(2);

                numSplit = num.split('.');
                int = numSplit[0];
                if (int.length > 3) {
                    int = int.sustr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
                }

                dec = numSplit[1];

                return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
            }

## Events

### Events on keypress

* Add an Event Listener to the global document

        document.addEventListener
