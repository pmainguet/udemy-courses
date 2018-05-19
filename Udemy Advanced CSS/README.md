# A - GENERAL WORKFLOW FOR UX DESIGN & HTML/CSS LAYOUTS

1.  GENERAL ARCHITECTURE

    * Define the general layout of the page
    * Decompose in components that can be reused (Atomic Design)
    * Define animations and user workflow

2.  SETUP CSS AND CONVENTIONS

    * setup SASS architecture and npm / gulp scripts to process to css, put live-server in place
    * setup basic CSS: basic reset, global font-size

3.  DECIDE WETHER YOUR DOING MOBILE OR DESKTOP FIRST

    * Code for the "first" browser
    * use the global font-size (.625 if the standard browser font size is 16px) and rem units (divide the target width by 10 for rem conversion) as a way to dimension all elements that could be resized depending on the font-size
    * Later implement media queries for responsive web design, by using the global font-size and specified breakpoints
    * Define a float grid layout reference (number of columns, gutter width, ...)

4.  Use BEM to mark-up HTML code and CSS

    * Build layout in HTML and CSS with a consistent structure for naming classes
    * Use HTML5 elements for better search engine optimization
    * Put CSS rules in the correct SASS folder/files (for ex if specific to homepage put in pages/\_home.scss)
    * Use utility classes to center text or add margin to the bottom of text tile elements
    * Do not use elements selector (h1, h2, h3, p ...) but instead classes. HTML5 elements are important for SEO/accessibility not styling

            <h3 class="heading-tertiary"> => .heading-tertiary{...}

5.  Add external libraries

* External fonts (Google Fonts) and font icon (Linea, Font Awesome ...)
* Add stylesheet link meta and favicon

# B - THEORY ON CSS

## Page rendering process

1.  Page load
2.  Parse HTML
    * Create Document Object Model (DOM)
    * Load CSS
3.  Parse CSS
    * Cascade: Resolve Conficting CSS Declaration
    * Process final CSS values
4.  Create a CSS Object Model (CSSOM)
5.  DOM and CSSOM are then used to create a Render Tree
6.  Website Rendering: Visual Formatting Model
7.  Final Rendered Website

## Parsing: Cascade and specificity

* CSS Rule = Selector (.my-class) and Declaration Block ({...}) with declarations (font-size:20px) which consist of a property (font-size) and its declared value (20px)
* Source of CSS rules
  * Author
  * User
  * User-agent
* Cascade: process of combining different stylesheets and resolving conflicts between different CSS rules and declarations, when more than one rule applies to a certain element. They use three relative elements

  * First it looks at the Importance of the rule, with the following importances:

    1.  User !important declarations
    2.  Author !important declarations
    3.  Author declarations
    4.  User declarations
    5.  Default browser declarations

  * If same Importance, use Specificity (calculation of the number of occurrences in each below categories)

    1.  Inline Styles
    2.  IDs
    3.  Classes, pseudo-classes, attribute
    4.  Elements, pseudo-elements

        Examples:

        .button => specificity of (0,0,1,0) ie 0 inline styles, 0 ids, 1 class, 0 Element used as selector
        nav#nav div.pull-right .button => specificity of (0, 1, 2, 2 )
        a => specifificy of (0,0,0,1)
        #nav a.button:hover => specificity of (0,1,2,1)

        so the highest specify gets applied hence the second one

  * If same Specificity, use Source Order: the last declaration in the code will override all other declarations and will be applied

## Parsing: Value Processing

* Chain of value processing

  1.  Declared Value: author declarations
  2.  Cascaded Value: after the cascade
  3.  Specified Value: If there is a cascading value, use it, otherwise:

  * check if the property can be inherited, if so check the parent's elements (WARNING it's the calculated value that is inherited, not the relative one)
  * if not, default to initial value of considered CSS property

  4.  Computed Value: converting relative values to absolute
  5.  Used Value: Final calculations, based on layout
  6.  Actual Value: Browser and device restrictions (round float Used Value for example)

  * each property as an initial value, used if nothing is declared and if there is no inheritance
  * Browsers specify a root font-size for each page
  * Every values will be at the end converted to PIXELS

## How units are converted from relative to absolute

* % for Fonts: % of the parent's computed font-size
* % for Lenghts: % of the parent's computed width
* em for Fonts: x times the parent computed font-size
* em for Lengths: x times the current element computed font-size
* rem: x times the root computed font-size
* vh: x times 1% of the viewport height
* vw: x times 1% of the viewport width

## Inheritance

* Certain css property of child elements can be inherited from their parent elements.
* Properties related to text are inherited: font-family, font-size, color ...
* The COMPUTED value of a property is what gets inherited, NOT the DECLARED value
* The inherit keyword forces inheritance on a certain property
* The initial keyword resets a property to its initial value

## Visual Formating Model

* Algorithm that calculates boxes and determines the layout of the boxes, for each element in the render tree, in order to determine the final layout of the page
  * Dimensions of boxes: box model (border-box so padding and border are not added to the dimensions of the box)
  * Box type:
    * block: 100% of parent's width, vertically one after another, box-model applies as showed
    * inline: content is distributed in lines, occupies only content's space, no line-breaks, no heights and widths, paddings and margins only horizontal
    * inline-blocks: occupies only content's space, no line-breaks, box-model applies as showed
  * Positioning scheme: floats and positioning
    * Normal flow: default positioning, elements laid out according to their source order
    * Floats (left, right):
      * removed from the normal flow,
      * text and inline elements will wrap around the floated elements,
      * the container will not adjust its height to the element => use of clearfix in this case (see below)
    * Absolute positioning (fixed, absolute):
      * removed from the normal flow,
      * no impact on surrounding content or elements
      * we use top, bottom, left and right to offset the element from its relatively positioned container
  * stacking contexts: created by z-index, opacity, transform, filter ...
  * other elements in the render tree (parents and siblings)
  * viewport size, dimensions of images ...

## CSS Architecture, Components and BEM (Block Element Modifier)

* BEM => low specificity BEM selectors

      .block{}                        => component that can be reused
      .block__element{}               => child element of a component
      .block__element--modifier{}     => use of modifier for round element for example

* 7-1 Pattern: 7 different folders for partial Sass files and 1 main Sass file to import all other files into a compiled CSS stylesheet
  * base
  * components
  * layout
  * pages
  * themes
  * abstracts
  * vendors

# C - BASIC SETUP

## BASIC RESET WITH UNIVERSAL SELECTOR

    *,
    *::after,
    *::before {
      margin:0;
      padding:0;
      box-sizing: inherit;
      }

    body {
      ...
      box-sizing: border-box;       => in this cas total width/height = specified width/height and the padding and the border are not added to the dimensions of the box
    }

## DEFINE PROJECT-WIDE FONT DEFINITIONS

* we want to use 10px to facilitate calculation (Chrome sets a global font size of 16px) but we need to set the value as a percentage of the browser font-size (best practice) => here 10/16 = .625

      html{
        font-size: 62.5%;
      }

* define $default-font-size variable of 1.6rem for paragraph

# D - POSITIONNING

## CENTER ELEMENTS

* Method 1 - for floated element or absolute: transform

        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);


        float: left;
        transform: translateX(-3rem);

* center block element inside another block element => margin: 0 auto;

## ABSOLUTE POSITIONING

* Absolute positionning need a reference to correctly position the element => the first parent element whose position is set to relative.

# E - PSEUDO-ELEMENTS, PSEUDO-CLASSES and CHILD SELECTORS

::after and ::before virtual element that can be styled, animated or used to clear float for example.

* pseudo classes such as :first-child for list :hover, ...

* child selector

      class1 class2 => select class2, children of class1
      & > \* => direct child selector
      ... + ... => adjacent siblings selector (that comes immediatly after the first selector)
      ... ~ ... => general sibling selector

* ::input-placeholder

* :focus, :invalid, placeholder-shown, :checked

# F - ANIMATIONS

* if you want to set the transition of an animation you need to set it on the initial state

      ANIMATION:  transform: scale(1.5);
      TRANSITION: transition: all .4s;

## KEYFRAMES

* You can specify an animation through keyframes

  animation: moveInBottom .5s ease-out;

      and

      @keyframes moveInBottom {
        0% {
          opacity: 0,
          transform: translateY(30px);
        }

        100% {
          opacity:1;
          transform: translate(0):
        }
      }

* animation-fill-mode: backwards allow to not set the 0% keyframes before the animation starts.

# G - SASS

CSS preprocessor with the following features:

* Variables: for reusable values such as colors, font sizes, spacing ... => $color-primary
* Nesting: to nest selectors inside one another, allowing us to write less code
* Operators: for mathematical operations right inside of CSS
* Partials and imports: to write CSS in different files and importing them all into one single file
* Mixins: to write reusable pieces of CSS code, that can use variables => @mixin clearfix($var) {} ... @include clearfix("salut")
* Functions: similar to mixins, with the difference that they produce a value that can be used => darkern($color-primary,15%) ... @function name($a,$b){ @return $a+$b }
* Extends: to make different selectors inherit declarations that are commont to all of them, other way around compare to mixins => %btn-placeholder{} ... @extend %btn-placeholder
* Control directives: for writing complex code using conditionals and loops

Two syntaxes:

* Sass syntax: indentation of css blocks
* SCSS syntax: with curly braces => the prefered one as it is similar to vanilla CSS syntax

## Utility Classes

* Use utility classes for centering element like with u-center-text class
* It's a good idea to use utility classes to add margin-bottom for text titles for example, as it is context specific

## Emmet

        .test + Tab => <div class="test">
        section.test + Tab => <section class="test">
        .test>img.composition + Tab => <div class="test"><img src="" class="composition"/></div>

# H - RESPONSIVE DESIGN

## PRINCIPLES

* fluid grids and layouts that adapt to current viewport (use % rather than px for all layout-related length)
  ** 3 Layout types: Float layouts (more standard), Flexbox, CSS Grid
  ** use framework grid (such as bootstrap grid) or custom grid layout
* Flexible/Responsive images by using % for width + optimize images for different width
* Media Queries to change styles on certain viewport

## CUSTOM GRID WITH FLOAT LAYOUT

* Define container width: max-width: 114 rem for example
* Define gutter-vertical and gutter-horizontal margins and apply to row/container, and use the :not(:last-child) pseudo-class to not apply those margins to the last child
* Define .col elements:
  ** for width calculation use calc() and use #{} to wrap sass variables
  ** make them float left
  ** use clearfix hack on parent element (row in this case) throught the use of a mixin
  ** you can use [class^="col-"] selector to apply general style
* If additional padding or animation needed, use child element inside .col element

## MEDIA QUERIES WITH MIXINS

## RESPONSIVE IMAGES

## BROWSER SUPPORT

          @supports(-webkit-backdrop-filter:blur(10px)) or (backdrop-filter:blur(10px)){
            backdrop-filter:blur(10px);
            background-color: rgba($color-black, .3);
          }

# I - HOW TO / RECIPES

## Create a "skewed section"

* use negative margin-top to move up element if needed

* Method 1 - CLIP PARTS OF ELEMENTS USING clip-path

          -webkit-clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

* Method 2 - SKEW THE ENTIRE SECTION

          .section{
            transform: skewY(-7deg);
            margin-top: -2rem;

          & > *{
            transform:skew(7deg);
          }

## CLEARFIX HACK

* Problem: Parent element with floated child elements => parent element's height collapse with height = 0
* Solution: add a pseudo element after the parent element that will clear the float options of the child elements.

            &::after{           => add a pseudo element after the parent element
              content: "";      => need an element to display but don't want to see it
              display: table;   => standard way of the clearfix
              clear: both;      => clear both floats, left and right.
            }

## Gradient Color for Text Title

* Set the background of a text element (such as h2) to the gradient color
* Set the block element to inline-block so the background only occupy the width of the text itself
* Use background-clip property to clip the background exactly where the text is
* Use color:transparent so we see the background instead of the text itself

            display: inline-block;
            background-image: linear-gradient(to right, $color, $color-end);
            -webkit-background-clip: text;
            color: transparent;

## Shadow examples

* Text:

            text-shadow: .5rem 1rem 2rem rgba(black,20%);

* Element:

            box-shadow: 0 1rem 2rem rgba(black,.15)
            box-shadow: 0 1.5rem 4rem rgba(black,.4)
            box-shadow: 0 2.5rem 4rem rgba(black,.5)
            box-shadow: 0 3rem 6rem rgba(black,.1);
            box-shadow: 0 .5rem 1rem rgba(black, .2);

## Style elements that are not hovered while others are

On parent element that have child element that can be hovered use

            &:hover &__photo:not(:hover){...}

## Button CSS structure

            .btn-text{
              &:link,
              &:active{
                ...
              }

              &.hover{
                ...
              }

              &.active{
                ...
              }
            }

## Outline

* use outline to have a spacing between the "border" and the content

            outline: 1.5rem solid $color;
            outline-offset: 2rem;

## Background image with overlay gradient

            background-image: linear-gradient(
              to right bottom,
              rgba($color, .0.8),
              rgba($color-2, .0.8),
              url(../img/hero.jpg)
            )

## Border radius

* Small border radius to look modern => border-radius: 3px;

## Background Blend

        background-blend-mode: screen;
        backgound-image: linear-gradient(...),url(...)

## Make two lines of text be styled like 2 different element (padding)

        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;

## filter to images

      filter: blur(3px) brightness(80%);

## Solid Color Gradient - add color on top of an image

* alternative to clip-path with additional div
* add another background-image to the property where the background image is defined
* special use of linear-gradient

        linear-gradient(
            105deg,
            rgba($color-white, 0.9) 0%,
            rgba($color-white, 0.9) 50%,
            transparent 50.1%

        )

## Round image with floating text around

        <figure class="shape">
          <img src="" alt="" class="shape__img">
        </figure>

        .shape{
          width: 15rem;
          height: 15rem;
          float: left;
          -webkit-shape-outside: circle(50% at 50% 50%);
          shape-outside: circle(50% at 50% 50%);
          clip-path: circle(50% at 50% 50%);

          &__img{
            height: 100%;
          }

        }

# J - ADVANCED COMPONENTS EXAMPLES

## Background video

        <section class="test">
          <div class="bg-video">
            <video class="bg-video__content" autoplay muted loop>
              <source src="" type="video/mp4">
              <source src="" type="video/webm">
              Text
            </video>
          </div>
        </section>

        .bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.15;
          overflow: hidden;

          &__content {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

## Rotating card

    <div class="card">
      <div class="card__side card__side--front card__side--front--1"></div>
      <div class="card__side card__side--back card__side--back--1"></div>
    </div>

    .card {
      //FUNCTIONALITY
      perspective: 150rem;
      -moz-perspective: 150rem;
      position: relative;
      height: 52rem;
      &__side {
        height: 52rem;
        transition: all 0.8s ease;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        overflow: hidden;
        width: 100%;
        border-radius: 3px;
        box-shadow: 0 1.5rem 4rem rgba(black, .15);

        &--back {
          transform: rotateY(180deg);
        }
      }

      &:hover &__side--front {
        transform: rotateY(-180deg);
      }

      &:hover &__side--back {
        transform: rotateY(0);
      }
    }

## Custom Form Input

      <form action="" class="form">
        <div class="form__group">   => for each input
          <input type="text" class="form__input" placeholder="Full Name" id="name" required>
          <label for="name" class="form__label">Text</label>
        </div>
      </form>

      .form {
        &__group:not(:last-child) {
          margin-bottom: 2rem;
        }

        &__input {
          font-family: inherit;             => have the same font as the page itself
          color: inherit;
          font-size: 1.5rem;
          padding: 1.5rem 2rem;             => always a little more padding on the side
          border-radius: 2px;
          background-color: rgba($color-white, 0.5);
          border: none;
          border-bottom: 3px solid transparent;
          width: 90%;
          display: block;
          transition: all 0.3s;
          &:focus {
            outline: none;
            box-shadow: 0 1 rem 2rem rgba($color-black, 0.1);
            border-bottom: 3px solid $color-primary;
          }
          &::-webkit-input-placeholder {      => style input placeholder
            color: $color-grey-dark-2;
          }
          &:focus:invalid {                   => specific style for validation directly in CSS
            border-bottom: 3px solid $color-secondary-dark;
          }
        }

        &__label {
          font-size: 1.2rem;
          font-weight: 700;
          margin-left: 2rem;
          margin-top: 0.7rem;
          display: block;
          transition: all 0.3s;
        }

        &__input:placeholder-shown + &__label {   => to add slide down animation on focus
          opacity: 0;
          visibility: hidden;
          transform: translateY(-4rem);
        }
      }

## Custom radio buttons

* Use the checkbox hack: clicking label select the input
* the real input element is hidden, it's a span element within the label that is styled
* Reminder: if several radio button with same "name" attribute, only one can be selected at any given time

      <form action="" class="form">
        <div class="form__group">   => for each input
          <input type="radio" class="form__input" placeholder="Full Name" id="name" name="size" required>
          <label for="name" class="form__label">
            <span class="form__radio-button">
            Text
          </label>
          <input type="radio" class="form__input" placeholder="Full Name 2" id="name2" name="size" required>
          <label for="name2" class="form__label">
            <span class="form__radio-button">
            Text 2
          </label>
        </div>
      </form>

      .form {
        &__group:not(:last-child) {
          margin-bottom: 2rem;
        }

        &__radio-group {
            width: 49%;
            display: inline-block;
          }

          &__radio-label {
            font-size: $default-font-size;
            cursor: pointer;
            position: relative;
            padding-left: 4rem;
          }

          &__radio-input {
            display: none;      => the real input element is hidden
          }

          &__radio-button {
            height: 3rem;
            width: 3rem;
            border: 5px solid $color-primary;
            border-radius: 50%;
            display: inline-block;
            position: absolute;
            left: 0;
            top: -0.4rem;
            transition: all 0.3s;

            &::after {
              content: "";
              display: block;
              height: 1.3rem;
              width: 1.3rem;
              border-radius: 50%;
              @include centerHorizontalVertical;
              background-color: $color-primary;
              opacity: 0;
            }
          }

          &__radio-input:checked + &__radio-label &__radio-button::after {
            opacity: 1;
          }
        }

## Navigation

* Use the checkbox hack: clicking label select the input
* Use transform-origin to correctly animate the burget button


        <div class="navigation">
          <input type="checkbox" class="navigation__checkbox" id="navi-toggle">
          <label for="navi-toggle" class="navigation__button">MENU</label>
          <div class="navigation__background">&nbsp;</div>
          <nav class="navigation__nav">
            <ul class="navigation__list">
              <li class="navigation__item"><a href="" class="navigation__link">Text</a></li>
              ...
            </ul>
          </nav>
        </div>


        .navigation {
            position: relative;
            &__checkbox {
              display: none;
            }

            &__button {
              background-color: $color-white;
              height: 7rem;
              width: 7rem;
              border-radius: 50%;
              position: fixed;
              top: 6rem;
              right: 6rem;
              z-index: 2000;
              box-shadow: 0 1rem 3rem rgba($color-black, 0.1);
              text-align: center;
              cursor: pointer;
            }

            &__background {
              height: 6rem;
              width: 6rem;
              border-radius: 50%;
              position: fixed;
              top: 6.5rem;
              right: 6.5rem;
              background-image: radial-gradient(
                $color-primary-light,
                $color-primary-dark
              );
              z-index: 1000;
              transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);    => specific timing function through cubic-bezier
            }

            &__nav {
              height: 100vh;
              position: fixed;
              top: 0;
              right: 0;
              z-index: 1500;
              opacity: 0;
              width: 0;
              transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
            }

            &__list {
              @include centerHorizontalVertical;
              list-style: none;
              text-align: center;
              width: 100%;
            }

            &__item {
              margin: 1.5rem;
            }

            &__link {
              &:link,
              &:visited {
                font-size: 3rem;
                font-weight: 300;
                color: $color-white;
                text-decoration: none;
                text-transform: uppercase;
                background-image: linear-gradient(  => solid color gradient
                  120deg,
                  transparent 0%,
                  transparent 50%,
                  $color-white 51%
                );
                padding: 1rem 2rem;
                background-size: 250%;
                transition: all 0.4s;
                display: inline-block;
                span {
                  margin-right: 1.5rem;
                }
              }
              &:hover,
              &:active {
                background-position: 100%;        => animation of solid color gradient
                color: $color-primary;
                transform: translateX(1rem);
              }
            }

            //BURGER ICON
            &__icon {
              position: relative;
              margin-top: 3.5rem;
              &,
              &::before,
              &::after {
                width: 3rem;
                height: 2px;
                background-color: $color-grey-dark-3;
                display: inline-block;
              }

              &::before,
              &::after {
                content: "";
                position: absolute;
                left: 0;
                transition: all 0.2s;
              }
              &::before {
                top: -0.8rem;
                transform-origin: center;
              }
              &::after {
                top: 0.8rem;
                transform-origin: center;
              }
            }

            //FUNCTIONNALITY
            &__checkbox:checked ~ &__background {
              transform: scale(180);
            }

            &__checkbox:checked ~ &__nav {
              opacity: 1;
              width: 100%;
            }

            &__checkbox:checked + &__button &__icon {
              & {
                background-color: transparent;
              }
              &::before {
                top: 0;
                transform: rotate(45deg);
              }

              &::after {
                top: 0;
                transform: rotate(-45deg);
              }
            }

            &__button:hover &__icon::before {
              top: -1rem;
            }
            &__button:hover &__icon::after {
              top: 1rem;
            }
          }

## CSS Popup

* Use the :target pseudo-class
* Use display: table-cell to create boxes with equal height

           <a href="#popup">Popup</a>

           <div class="popup" id="popup">
                <div class=" popup__content ">
                    <div class="popup__left ">
                        <img src="img/nat-8.jpg " alt="Tour Photo " class="popup__img ">
                        <img src="img/nat-9.jpg " alt="Tour Photo " class="popup__img ">
                    </div>
                    <div class="popup__right ">
                        <a href="#section-tours" class="popup__close">&times;</a>
                        <h2 class="heading-secondary u-margin-bottom-small ">Start Booking Now</h2>
                        <h3 class="heading-tertiary u-margin-bottom-small ">Important &ndash; Please read these terms before booking.</h3>
                        <p class="popup__text ">... </p>
                        <a href="# " class="btn btn--grn ">Book Now</a>
                    </div>
                </div>
            </div>

          .popup {
            @include centerHorizontalVertical;
            background-color: rgba($color-black, 0.8);
            z-index: 3000;
            position: fixed;
            width: 100%;
            height: 100vh;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;

            &__content {
              @include centerHorizontalVertical;
              background-color: $color-white;
              width: 75%;
              z-index: 4000;
              box-shadow: 0 2rem 4rem rgba($color-black, 0.2);
              border-radius: 3px;
              display: table;
              overflow: hidden;
              transition: all 0.4s 0.2s;
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.25);
            }

            &__left {
              width: 33.333333%;
              display: table-cell;    => same height for left and right elements
            }

            &__right {
              width: 66.6666667%;
              display: table-cell;     => same height for left and right elements
              vertical-align: middle;
              padding: 3rem 5rem;
            }

            &__img {
              display: block;
              width: 100%;
            }

            &__text {
              font-size: 1.4rem;
              margin-bottom: 4rem;
              column-count: 2;          => add columns in a text
              column-gap: 4rem;
              column-rule: 1px solid $color-grey-light-2;
              -moz-hyphens: auto;
              -ms-hyphens: auto;
              -webkit-hyphens: auto;
              hyphens: auto;
            }

            &__close {
              &:link,
              &:visited {
                color: $color-grey-dark;
                position: absolute;
                line-height: 1;
                top: 2.5rem;
                right: 2.5rem;
                font-size: 3rem;
                text-decoration: none;
                font-weight: 700;
                display: inline-block;
                transition: all 0.2s;
              }

              &:hover {
                color: $color-primary;
              }
            }

            //FUNCITONNALITY

            &:target {              => use to link popup to button through anchor tag (id)
              opacity: 1;
              visibility: visible;
            }

            &:target &__content {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
