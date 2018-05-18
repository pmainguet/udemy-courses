<?php

namespace CarBundle\Service;

use CarBundle\Entity\Car;

class DataChecker
{
    protected $requireImagesToPromoteCar;
    protected $entityManager;

    public function __construct($entityManager, $requireImagesToPromoteCar)
    {
        $this->entityManager = $entityManager;
        $this->requireImagesToPromoteCar = $requireImagesToPromoteCar;
    }

    public function checkCar(Car $car)
    {
        $return=$this->requireImagesToPromoteCar;
        $car->setPromoted(!$return);
        $this->entityManager->persist($car);
        $this->entityManager->flush();
        return !$return;
    }
}
