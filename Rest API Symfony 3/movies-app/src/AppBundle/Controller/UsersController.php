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
use \AppBundle\Entity\EntityMerger;
use \AppBundle\Security\TokenStorage;

/**
 *
 * @Security("is_anonymous() or is_authenticated()")
 */
class UsersController extends AbstractController
{
    private $passwordEncoder;
    private $jwtEncoder;
    private $_entityMerger;
    private $tokenStorage;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, JWTEncoderInterface $jwtEncoder, EntityMerger $entityMerger, TokenStorage $tokenStorage)
    {
        $this->passwordEncoder=$passwordEncoder;
        $this->jwtEncoder=$jwtEncoder;
        $this->_entityMerger=$entityMerger;
        $this->tokenStorage=$tokenStorage;
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
        
        $this->encodePassword($user);
        $user->setRoles([User::ROLE_USER]);
        $this->persistUser($user);

        return $user;
    }

    /**
     * @Rest\View(statusCode=201)
     * @Rest\NoRoute()
     * @ParamConverter("modifiedUser",
     * converter="fos_rest.request_body",
     * options={
     *  "validator"={"groups"={"Patch"}},
     *  "deserializationContext"={"groups"={"Deserialize"}}
     * }
     * )
     * @Security("is_granted('edit', theUser)", message="Access Denied")
     */
    public function patchUsersAction(?User $theUser, User $modifiedUser, ConstraintViolationListInterface $validationErrors)
    {
        if (null === $theUser) {
            throw new NotFoundHttpException();
        }

        if (count($validationErrors)>0) {
            throw new ValidationException($validationErrors);
        }

        if (empty($modifiedUser->getPassword())) {
            $modifiedUser->setPassword(null);
        }

        $this->_entityMerger->merge($theUser, $modifiedUser);
        $this->encodePassword($theUser);
        $this->persistUser($theUser);

        // reset token if password modified
        if ($modifiedUser->getPassword()) {
            $this->tokenStorage->invalidateToken($theUser->getUserName());
        }

        //Return
        return $theUser;
    }

    protected function persistUser(User $user)
    {
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
    }

    protected function encodePassword(User $user) :void
    {
        $user->setPassword($this->passwordEncoder->encodePassword($user, $user->getPassword()));
    }
}
