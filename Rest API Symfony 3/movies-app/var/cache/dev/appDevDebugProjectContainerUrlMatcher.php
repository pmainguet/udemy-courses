<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appDevDebugProjectContainerUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($rawPathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($rawPathinfo);
        $trimmedPathinfo = rtrim($pathinfo, '/');
        $context = $this->context;
        $request = $this->request;
        $requestMethod = $canonicalMethod = $context->getMethod();
        $scheme = $context->getScheme();

        if ('HEAD' === $requestMethod) {
            $canonicalMethod = 'GET';
        }


        if (0 === strpos($pathinfo, '/_')) {
            // _wdt
            if (0 === strpos($pathinfo, '/_wdt') && preg_match('#^/_wdt/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_wdt')), array (  '_controller' => 'web_profiler.controller.profiler:toolbarAction',));
            }

            if (0 === strpos($pathinfo, '/_profiler')) {
                // _profiler_home
                if ('/_profiler' === $trimmedPathinfo) {
                    if (substr($pathinfo, -1) !== '/') {
                        return $this->redirect($rawPathinfo.'/', '_profiler_home');
                    }

                    return array (  '_controller' => 'web_profiler.controller.profiler:homeAction',  '_route' => '_profiler_home',);
                }

                if (0 === strpos($pathinfo, '/_profiler/search')) {
                    // _profiler_search
                    if ('/_profiler/search' === $pathinfo) {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchAction',  '_route' => '_profiler_search',);
                    }

                    // _profiler_search_bar
                    if ('/_profiler/search_bar' === $pathinfo) {
                        return array (  '_controller' => 'web_profiler.controller.profiler:searchBarAction',  '_route' => '_profiler_search_bar',);
                    }

                }

                // _profiler_phpinfo
                if ('/_profiler/phpinfo' === $pathinfo) {
                    return array (  '_controller' => 'web_profiler.controller.profiler:phpinfoAction',  '_route' => '_profiler_phpinfo',);
                }

                // _profiler_search_results
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/search/results$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_search_results')), array (  '_controller' => 'web_profiler.controller.profiler:searchResultsAction',));
                }

                // _profiler_open_file
                if ('/_profiler/open' === $pathinfo) {
                    return array (  '_controller' => 'web_profiler.controller.profiler:openAction',  '_route' => '_profiler_open_file',);
                }

                // _profiler
                if (preg_match('#^/_profiler/(?P<token>[^/]++)$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler')), array (  '_controller' => 'web_profiler.controller.profiler:panelAction',));
                }

                // _profiler_router
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/router$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_router')), array (  '_controller' => 'web_profiler.controller.router:panelAction',));
                }

                // _profiler_exception
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception')), array (  '_controller' => 'web_profiler.controller.exception:showAction',));
                }

                // _profiler_exception_css
                if (preg_match('#^/_profiler/(?P<token>[^/]++)/exception\\.css$#s', $pathinfo, $matches)) {
                    return $this->mergeDefaults(array_replace($matches, array('_route' => '_profiler_exception_css')), array (  '_controller' => 'web_profiler.controller.exception:cssAction',));
                }

            }

            // _twig_error_test
            if (0 === strpos($pathinfo, '/_error') && preg_match('#^/_error/(?P<code>\\d+)(?:\\.(?P<_format>[^/]++))?$#s', $pathinfo, $matches)) {
                return $this->mergeDefaults(array_replace($matches, array('_route' => '_twig_error_test')), array (  '_controller' => 'twig.controller.preview_error:previewErrorPageAction',  '_format' => 'html',));
            }

        }

        // homepage
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'homepage');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\DefaultController::indexAction',  '_route' => 'homepage',);
        }

        // app_humans_posthumans
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_humans_posthumans');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\HumansController::postHumansAction',  '_route' => 'app_humans_posthumans',);
        }

        // app_images_postimages
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_images_postimages');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\ImagesController::postImagesAction',  '_route' => 'app_images_postimages',);
        }

        // app_images_putimageupload
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_images_putimageupload');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\ImagesController::putImageUploadAction',  '_route' => 'app_images_putimageupload',);
        }

        // app_movies_postmovies
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_movies_postmovies');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\MoviesController::postMoviesAction',  '_route' => 'app_movies_postmovies',);
        }

        // app_movies_postmovieroles
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_movies_postmovieroles');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\MoviesController::postMovieRolesAction',  '_route' => 'app_movies_postmovieroles',);
        }

        // app_movies_patchmovie
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_movies_patchmovie');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\MoviesController::patchMovieAction',  '_route' => 'app_movies_patchmovie',);
        }

        // app_users_postusers
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_users_postusers');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\UsersController::postUsersAction',  '_route' => 'app_users_postusers',);
        }

        // app_users_patchusers
        if ('' === $trimmedPathinfo) {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($rawPathinfo.'/', 'app_users_patchusers');
            }

            return array (  '_controller' => 'AppBundle\\Controller\\UsersController::patchUsersAction',  '_route' => 'app_users_patchusers',);
        }

        if (0 === strpos($pathinfo, '/movies')) {
            // get_movies
            if ('/movies' === $pathinfo) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_movies;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\MoviesController:getMoviesAction',  '_format' => 'json',  '_route' => 'get_movies',);
            }
            not_get_movies:

            // delete_movie
            if (preg_match('#^/movies/(?P<movie>[^/]++)$#s', $pathinfo, $matches)) {
                if ('DELETE' !== $canonicalMethod) {
                    $allow[] = 'DELETE';
                    goto not_delete_movie;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_movie')), array (  '_controller' => 'AppBundle\\Controller\\MoviesController:deleteMovieAction',  '_format' => 'json',));
            }
            not_delete_movie:

            // get_movie
            if (preg_match('#^/movies/(?P<movie>[^/]++)$#s', $pathinfo, $matches)) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_movie;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'get_movie')), array (  '_controller' => 'AppBundle\\Controller\\MoviesController:getMovieAction',  '_format' => 'json',));
            }
            not_get_movie:

            // get_movie_roles
            if (preg_match('#^/movies/(?P<movie>[^/]++)/roles$#s', $pathinfo, $matches)) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_movie_roles;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'get_movie_roles')), array (  '_controller' => 'AppBundle\\Controller\\MoviesController:getMovieRolesAction',  '_format' => 'json',));
            }
            not_get_movie_roles:

            // movies_post
            if ('/movies' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_movies_post;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\MoviesController:postMoviesAction',  '_format' => 'json',  '_route' => 'movies_post',);
            }
            not_movies_post:

            // movies_patch
            if (preg_match('#^/movies/(?P<movie>[^/]++)$#s', $pathinfo, $matches)) {
                if ('PATCH' !== $canonicalMethod) {
                    $allow[] = 'PATCH';
                    goto not_movies_patch;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'movies_patch')), array (  '_controller' => 'AppBundle\\Controller\\MoviesController:patchMovieAction',  '_format' => 'json',));
            }
            not_movies_patch:

            // movies_roles_post
            if (preg_match('#^/movies/(?P<movie>[^/]++)/roles$#s', $pathinfo, $matches)) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_movies_roles_post;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'movies_roles_post')), array (  '_controller' => 'AppBundle\\Controller\\MoviesController:postMovieRolesAction',  '_format' => 'json',));
            }
            not_movies_roles_post:

        }

        elseif (0 === strpos($pathinfo, '/humans')) {
            // get_humans
            if ('/humans' === $pathinfo) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_humans;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\HumansController:getHumansAction',  '_format' => 'json',  '_route' => 'get_humans',);
            }
            not_get_humans:

            // delete_human
            if (preg_match('#^/humans/(?P<person>[^/]++)$#s', $pathinfo, $matches)) {
                if ('DELETE' !== $canonicalMethod) {
                    $allow[] = 'DELETE';
                    goto not_delete_human;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'delete_human')), array (  '_controller' => 'AppBundle\\Controller\\HumansController:deleteHumanAction',  '_format' => 'json',));
            }
            not_delete_human:

            // get_human
            if (preg_match('#^/humans/(?P<person>[^/]++)$#s', $pathinfo, $matches)) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_human;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'get_human')), array (  '_controller' => 'AppBundle\\Controller\\HumansController:getHumanAction',  '_format' => 'json',));
            }
            not_get_human:

            // humans_post
            if ('/humans' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_humans_post;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\HumansController:postHumansAction',  '_format' => 'json',  '_route' => 'humans_post',);
            }
            not_humans_post:

        }

        elseif (0 === strpos($pathinfo, '/users')) {
            // get_user
            if (preg_match('#^/users/(?P<theUser>[^/]++)$#s', $pathinfo, $matches)) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_user;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'get_user')), array (  '_controller' => 'AppBundle\\Controller\\UsersController:getUserAction',  '_format' => 'json',));
            }
            not_get_user:

            // users_post
            if ('/users' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_users_post;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\UsersController:postUsersAction',  '_format' => 'json',  '_route' => 'users_post',);
            }
            not_users_post:

            // users_patch
            if (preg_match('#^/users/(?P<theUser>[^/]++)$#s', $pathinfo, $matches)) {
                if ('PATCH' !== $canonicalMethod) {
                    $allow[] = 'PATCH';
                    goto not_users_patch;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'users_patch')), array (  '_controller' => 'AppBundle\\Controller\\UsersController:patchUsersAction',  '_format' => 'json',));
            }
            not_users_patch:

        }

        // post_token
        if ('/tokens' === $pathinfo) {
            if ('POST' !== $canonicalMethod) {
                $allow[] = 'POST';
                goto not_post_token;
            }

            return array (  '_controller' => 'AppBundle\\Controller\\TokensController:postTokenAction',  '_format' => 'json',  '_route' => 'post_token',);
        }
        not_post_token:

        if (0 === strpos($pathinfo, '/images')) {
            // get_images
            if ('/images' === $pathinfo) {
                if ('GET' !== $canonicalMethod) {
                    $allow[] = 'GET';
                    goto not_get_images;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\ImagesController:getImagesAction',  '_format' => 'json',  '_route' => 'get_images',);
            }
            not_get_images:

            // images_post
            if ('/images' === $pathinfo) {
                if ('POST' !== $canonicalMethod) {
                    $allow[] = 'POST';
                    goto not_images_post;
                }

                return array (  '_controller' => 'AppBundle\\Controller\\ImagesController:postImagesAction',  '_format' => 'json',  '_route' => 'images_post',);
            }
            not_images_post:

            // images_upload_put
            if (preg_match('#^/images/(?P<image>[^/]++)/upload$#s', $pathinfo, $matches)) {
                if ('PUT' !== $canonicalMethod) {
                    $allow[] = 'PUT';
                    goto not_images_upload_put;
                }

                return $this->mergeDefaults(array_replace($matches, array('_route' => 'images_upload_put')), array (  '_controller' => 'AppBundle\\Controller\\ImagesController:putImageUploadAction',));
            }
            not_images_upload_put:

        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
