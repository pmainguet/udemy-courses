<?php 

namespace CarBundle\DataFixtures\ORM;

use CarBundle\Entity\Make;
use CarBundle\Entity\Model;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadDictionary extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $make = new Make();
        $make->setName('VW');

        $make1 = new Make();
        $make1->setName('Citroën');

        $make2 = new Make();
        $make2->setName('BMW');

        $manager->persist($make);
        $manager->persist($make1);
        $manager->persist($make2);

        $model=new Model();
        $model->setName('X1');
        $model1=new Model();
        $model1->setName('Passat');
        $model2=new Model();
        $model2->setName('Croma');

        $manager->persist($model);
        $manager->persist($model1);
        $manager->persist($model2);

        $manager->flush();

        $this->addReference("X1", $model);
        $this->addReference("Passat", $model1);
        $this->addReference("Croma", $model2);
        $this->addReference("VW", $make);
        $this->addReference("Citroën", $make1);
        $this->addReference("BMW", $make2);
    }

    public function getOrder()
    {
        return 1;
    }
}
