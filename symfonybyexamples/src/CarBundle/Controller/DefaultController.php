<?php

namespace CarBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;

class DefaultController extends Controller
{
    /**
     * Show all cars
     *
     * @param Request $request get request
     *
     * @return void
     *
     * @Route("/our-cars", name="car")
     */
    public function indexAction(Request $request)
    {
        $carRepository=$this->getDoctrine()->getRepository('CarBundle:Car');
        //7 Queries for 3 entries
        //$cars=$carRepository->findAll();
        //Only 1 Query
        $cars=$carRepository->findCarsWithDetails();

        $form = $this->createFormBuilder()
        ->setMethod('GET')
        ->add('search', TextType::class, ['constraints'=>[
            new NotBlank(),
            new Length(['min'=>2])
        ]])
        ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            die('Form submitted');
        }

        return $this->render('@Car/Default/index.html.twig', ['cars' => $cars,'form' => $form->createView()]);
    }

    /**
     *@param $id
     *@Route("/car/{id}", name="show_car")
     *
     */
    public function showAction($id)
    {
        $carRepository=$this->getDoctrine()->getRepository('CarBundle:Car');
        //3 queries
        //$car=$carRepository->find($id);
        //1 Query Only
        $car=$carRepository->findCarWithDetails($id);
        return $this->render('@Car/Default/show.html.twig', ['car' => $car]);
    }
}
