<?php

namespace AppBundle\DataFixtures;

use \Doctrine\Common\DataFixtures\FixtureInterface;
use \Symfony\Component\DependencyInjection\ContainerAwareInterface;
use \Doctrine\Common\Persistence\ObjectManager;
use \Symfony\Component\DependencyInjection\ContainerInterface;
use \AppBundle\Entity\User;

class LoadUsersData implements FixtureInterface, ContainerAwareInterface
{
    
    /**
     * Undocumented variable
     *
     * @var [type]
     */
    private $container;

    /**
     * Undocumented function
     *
     * @param ObjectManager $manager
     * @return void
     */
    public function load(ObjectManager $manager)
    {
        $passwordEncoder = $this->container->get('security.password_encoder');
        $user1 = new User();
        $user1->setUsername('pmainguet');
        $user1->setPassword($passwordEncoder->encodePassword($user1, 'secret'));
        $user1->setRoles([User::ROLE_ADMIN]);

        $manager->persist($user1);

        $user2 = new User();
        $user2->setUsername('nnebout');
        $user2->setPassword($passwordEncoder->encodePassword($user2, 'secret2'));
        $user2->setRoles([User::ROLE_ADMIN]);

        $manager->persist($user2);
        
        $manager->flush();
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}
