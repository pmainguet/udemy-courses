# THEORY ON CSS

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

## Parsing: Cascade and specificity

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

## Parsing: Value Processing

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

## Inheritance

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

# BASIC SETUP

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

## CLIP PARTS OF ELEMENTS USING clip-path

# POSITIONNING

## CENTER ELEMENTS

* transform / top / left

## ABSOLUTE POSITIONING

* Absolute positionning need a reference to correctly position the element => the first parent element whose position is set to relative.

# PSEUDO-ELEMENTS

* virtual element that can be styled, animated or used to clear float for example.

::after and ::before

* pseudo classes such as :first-child for list :hover, ...

## CLEARFIX HACK

* Problem: Parent element with floated child elements => parent element's height collapse with height = 0
* Solution: add a pseudo element after the parent element that will clear the float options of the child elements.

            &::after{           => add a pseudo element after the parent element
              content: "";      => need an element to display but don't want to see it
              display: table;   => standard way of the clearfix
              clear: both;      => clear both floats, left and right.
            }

# ANIMATIONS

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

# SASS

* CSS preprocessor with the following features:
  ** Variables: for reusable values such as colors, font sizes, spacing ... => $color-primary
  ** Nesting: to nest selectors inside one another, allowing us to write less code
  ** Operators: for mathematical operations right inside of CSS
  ** Partials and imports: to write CSS in different files and importing them all into one single file
  ** Mixins: to write reusable pieces of CSS code, that can use variables => @mixin clearfix($var) {} ... @include clearfix("salut")
  ** Functions: similar to mixins, with the difference that they produce a value that can be used => darkern($color-primary,15%) ... @function name($a,$b){ @return $a+$b }
  ** Extends: to make different selectors inherit declarations that are commont to all of them
  ** Control directives: for writing complex code using conditionals and loops
* Two syntaxes:
  ** Sass syntax: indentation of css blocks
  ** SCSS syntax: with curly braces => the prefered one as it is similar to vanilla CSS syntax

# GENERAL WORKFLOW FOR UX

1.  GENERAL ARCHITECTURE

    * Define the general layout of the page
    * Decompose in components that can be reused (Atomic Design)
    * Define animations and user workflow

2.  SETUP CSS AND CONVENTIONS

    * setup SASS architecture and npm / gulp scripts to process to css, put http server in place
    * setup basic CSS: basic reset, global font-size

3.  DECIDE WETHER YOUR DOING MOBILE OR DESKTOP FIRST

    * Code for the "first" browser
    * use the global font-size and rem units as a way to dimension all elements that could be resized depending on the font-size

          padding: 30px;    =>     padding: 3rem (if global font-size is 16px)

    * Later implement media queries for responsive web design, by using the global font-size

4.  Use BEM to mark-up HTML code and CSS

* Build layout in HTML and CSS with a consistent structure for naming classes
