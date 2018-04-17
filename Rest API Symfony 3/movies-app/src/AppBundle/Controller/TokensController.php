<?php

namespace AppBundle\Controller;

use \FOS\RestBundle\Controller\ControllerTrait;
use \Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use \Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use \Symfony\Component\HttpFoundation\Request;
use \Symfony\Component\Security\Core\Exception\BadCredentialsException;
use \Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use \Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Security("is_anonymous() or is_authenticated()")
 */
class TokensController extends AbstractController
{
    use ControllerTrait;

    private $passwordEncoder;
    private $jwtEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, JWTEncoderInterface $jwtEncoder)
    {
        $this->passwordEncoder=$passwordEncoder;
        $this->jwtEncoder=$jwtEncoder;
    }

    /**
     * @Rest\View(statusCode=201)
     */
    public function postTokenAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->findOneBy(['username'=>$request->getUser()]);

        if (!$user) {
            throw new BadCredentialsException();
        }

        $isPasswordValid = $this->passwordEncoder->isPasswordValid($user, $request->getPassword());

        if (!$isPasswordValid) {
            throw new BadCredentialsException();
        }

        //create new token
        $token = $this->jwtEncoder->encode([
            'username' => $user->getUsername(),
            'exp' => time()+3600
        ]);

        return new JsonResponse(['token'=>$token]);
    }
}
