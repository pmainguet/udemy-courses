<?php

namespace AppBundle\Entity;

use \Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;
use \Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @ORM\Table(name="user")
 * @UniqueEntity("username")
 *
 */
class User implements UserInterface
{
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"Default", "Deserialize"})
     *
     * @return void
     */
    private $id;

    /**
     * @ORM\Column(type="string", unique=true)
     * @Assert\NotBlank(groups={"Default"})
     * @Serializer\Groups({"Default", "Deserialize"})
     *
     * @var [type]
     */
    private $username;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank(groups={"Default"})
     * @Assert\Regex(
     *      pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *      message="Password must be 7 characters long at least and contains at least one lowercase letter, one uppercase letter and one digit",
     *      groups={"Default"}
     * )
     * @Serializer\Groups({"Deserialize"})
     * @var [type]
     */
    private $password;

    /**
     * @Serializer\Type("string")
     * @Assert\NotBlank(groups={"Default"})
     * @Assert\Expression(
     *      "this.getPassword() === this.getRetypedPassword()",
     *      message = "Passwords does not match.",
     *      groups={"Default"}
     * )
     * @Serializer\Groups({"Deserialize"})
     */
    private $retypedPassword;

    /**
     * @ORM\Column(type="simple_array", length=200)
     * @Serializer\Exclude()
     *
     * @var array
     */
    private $roles;

    /**
     * Returns the roles granted to the user.
     *
     * <code>
     * public function getRoles()
     * {
     *     return array('ROLE_USER');
     * }
     * </code>
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (Role|string)[] The user roles
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername(?string $username)
    {
        $this->username = $username;

        return $this;
    }

    public function setPassword(?string $password)
    {
        $this->password=$password;
    }

    /**
     * Set roles
     *
     * @param array $roles
     *
     * @return User
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * Get the value of retypedPassword
     *
     * @return  [type]
     */
    public function getRetypedPassword(): ?string
    {
        return $this->retypedPassword;
    }

    /**
     * Set the value of retypedPassword
     *
     * @param  [type]  $retypedPassword
     *
     * @return  self
     */
    public function setRetypedPassword($retypedPassword)
    {
        $this->retypedPassword = $retypedPassword;
        return $this;
    }
}
