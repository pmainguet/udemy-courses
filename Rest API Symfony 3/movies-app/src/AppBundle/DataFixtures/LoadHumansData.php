<?php

namespace AppBundle\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Person;

class LoadHumansData extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $person1 = new Person();
        $person1->setFirstName('P');
        $person1->setLastName('M');
        $person1->setDateOfBirth(new \DateTime('1957-12-10'));

        $person2 = new Person();
        $person2->setFirstName('P');
        $person2->setLastName('M');
        $person2->setDateOfBirth(new \DateTime('1957-12-10'));
        
        $manager->persist($person1);
        $manager->persist($person2);
        
        $manager->flush();
    }
}
