<?php

namespace AppBundle\Controller;

use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use \Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use \Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use \Symfony\Component\HttpFoundation\JsonResponse;
use \Symfony\Component\HttpFoundation\Request;
use \Symfony\Component\Routing\Annotation\Route;
use \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use AppBundle\Exception\ValidationException;
use \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 *
 * @Security("is_anonymous() or is_authenticated()")
 */
class UsersController extends AbstractController
{
    private $passwordEncoder;
    private $jwtEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, JWTEncoderInterface $jwtEncoder)
    {
        $this->passwordEncoder=$passwordEncoder;
        $this->jwtEncoder=$jwtEncoder;
    }
    
    /**
     * @Rest\View()
     * @Security("is_granted('show', theUser)", message="Access Denied")
     */
    public function getUserAction(?User $theUser)
    {
        if (null === $theUser) {
            throw new NotFoundHttpException();
        }

        return $theUser;
    }
    
    /**
     *
     * @Rest\View(statusCode=201)
     * @Rest\NoRoute()
     * @ParamConverter("user", converter="fos_rest.request_body", options={"deserializationContext"={"groups"={"Deserialize"}}})
     */
    public function postUsersAction(User $user, ConstraintViolationListInterface $validationErrors)
    {
        if (count($validationErrors)>0) {
            throw new ValidationException($validationErrors);
        }
        
        $user->setPassword($this->passwordEncoder->encodePassword($user, $user->getPassword()));
        $user->setRoles([User::ROLE_USER]);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }
}
