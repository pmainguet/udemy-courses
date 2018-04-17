<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Movie;
use AppBundle\Entity\Role;
use FOS\RestBundle\Controller\ControllerTrait;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use AppBundle\Exception\ValidationException;
use \AppBundle\Entity\EntityMerger;

use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

/**
 * @Security("is_anonymous() or is_authenticated()")
 */
class MoviesController extends AbstractController
{
    use ControllerTrait;

    private $_entityMerger;

    /**
     * Undocumented function
     *
     * @param EntityMerger $entityMerger
     */
    public function __construct(EntityMerger $entityMerger)
    {
        $this->_entityMerger=$entityMerger;
    }

    /**
     * Undocumented function
     *
     * @Rest\View()
     *
     * @return void
     */
    public function getMoviesAction()
    {
        $movies = $this->getDoctrine()->getRepository('AppBundle:Movie')->findAll();

        return $movies;
    }

    /**
     * Undocumented function
     *
     * @Rest\View(statusCode=201)
     * @ParamConverter("movie", converter="fos_rest.request_body")
     * @Rest\NoRoute()
     *
     * @param Movie $movie
     * @return void
     */
    public function postMoviesAction(Movie $movie, ConstraintViolationListInterface $validationErrors)
    {
        if (count($validationErrors)>0) {
            //basic exception
            //throw new HttpException(400, 'The data is either invalid or incomplete');

            throw new ValidationException($validationErrors);
        }
        $em = $this->getDoctrine()->getManager();
        $em->persist($movie);
        $em->flush();
    }

    /** First Try */
    // public function deleteMovieAction($movieId)
    // {
    //     $movie = $this->getDoctrine()->getRepository('AppBundle:Movie')->find($movieId);

    //     if (null === $movie) {
    //         return $this->view(null, 404);
    //     }

    //     $em = $this->getDoctrine()->getManager();
    //     $em->remove($movie);
    //     $em->flush();
    // }
    
    /**
     * Similar to the one before
     *
     * @Rest\View()
     *
     * @param [type] $movieId
     * @return void
     */
    public function deleteMovieAction(?Movie $movie)
    {
        if (null === $movie) {
            return $this->view(null, 404);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($movie);
        $em->flush();
    }

    /**
     * Similar to the one before
     *
     * @Rest\View()
     *
     */
    public function getMovieAction(?Movie $movie)
    {
        if (null === $movie) {
            return $this->view(null, 404);
        }

        return $movie;
    }

    /**
     * @Rest\View()
     *
     */
    public function getMovieRolesAction(Movie $movie)
    {
        return $movie->getRoles();
    }

    /**
    * @Rest\View(statusCode=201)
    * @ParamConverter("role", converter="fos_rest.request_body", options={"deserializationContext"={"groups"={"Deserialize"}}} )
    * @Rest\NoRoute()
    *
    */
    public function postMovieRolesAction(Movie $movie, Role $role, ConstraintViolationListInterface $validationErrors)
    {
        if (count($validationErrors)>0) {
            throw new ValidationException($validationErrors);
        }

        $role->setMovie($movie);
        $em = $this->getDoctrine()->getManager();
        $em->persist($role);

        $movie->getRoles()->add($role);
        $em->persist($movie);

        $em->flush();

        return $role;
    }

    /**
    * @Rest\View(statusCode=201)
    * @ParamConverter("modifiedMovie", converter="fos_rest.request_body", options={"validator"={"groups"={"Patch"}}} )
    * @Rest\NoRoute()
    * @Security("is_authenticated()")
     * @param Movie|null $movie
     * @param Movie $modifiedMovie
     * @param ConstraintViolationListInterface $validationErrors
     * @return void
     */
    public function patchMovieAction(?Movie $movie, Movie $modifiedMovie, ConstraintViolationListInterface $validationErrors)
    {
        if (null === $movie) {
            $this->view(null, 404);
        }

        if (count($validationErrors)>0) {
            throw new ValidationException($validationErrors);
        }

        //Merge entities
        $this->_entityMerger->merge($movie, $modifiedMovie);

        //Persist
        $em = $this->getDoctrine()->getManager();
        $em->persist($movie);
        $em->flush();

        //Return
        return $movie;
    }
}
