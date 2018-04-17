<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Person;
use FOS\RestBundle\Controller\ControllerTrait;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;
use AppBundle\Exception\ValidationException;

class HumansController extends AbstractController
{
    use ControllerTrait;

    /**
     * Undocumented function
     *
     * @Rest\View()
     *
     * @return void
     */
    public function getHumansAction()
    {
        $people = $this->getDoctrine()->getRepository('AppBundle:Person')->findAll();

        return $people;
    }

    /**
    * Undocumented function
    *
    * @Rest\View(statusCode=201)
    * @ParamConverter("person", converter="fos_rest.request_body")
    * @Rest\NoRoute()
    *
    * @param Person $person
    * @return void
    */
    public function postHumansAction(Person $person, ConstraintViolationListInterface $validationErrors)
    {
        if (count($validationErrors)>0) {
            throw new ValidationException($validationErrors);
        }
        $em = $this->getDoctrine()->getManager();
        $em->persist($person);
        $em->flush();
    }
    
    /**
     * Similar to the one before
     *
     * @Rest\View()
     *
     * @param [type] $personId
     * @return void
     */
    public function deleteHumanAction(?Person $person)
    {
        if (null === $person) {
            return $this->view(null, 404);
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($person);
        $em->flush();
    }

    /**
     * Similar to the one before
     *
     * @Rest\View()
     *
     */
    public function getHumanAction(?Person $person)
    {
        if (null === $person) {
            return $this->view(null, 404);
        }

        return $person;
    }
}
