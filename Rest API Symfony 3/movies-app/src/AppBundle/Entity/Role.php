<?php

namespace AppBundle\Entity;

use \Doctrine\ORM\Mapping as ORM;
use \JMS\Serializer\Annotation as Serializer;
use \Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Annotation as App;
use Hateoas\Configuration\Annotation as Hateoas;

/**
 * @ORM\Table(name="role")
 * @ORM\Entity(repositoryClass="AppBundlet\Repository\RoleRepository")
 *
 * The following annotations tells the serializer to skip all properties which
 * have not marked with Expose.
 * @Serializer\ExclusionPolicy("ALL")
 *
 * Permet d'afficher des liens vers la ressource plutot que d'afficher toutes la données (HAL JSON)
 * @Hateoas\Relation(
 *  "person",
 *   href=@Hateoas\Route("get_human", parameters={"person"="expr(object.getPerson().getId())"})
 * )
 */

class Role
{

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"Default", "Deserialize"})
     * @Serializer\Expose()
     */
    private $id;

    /**
     * @var Person
     * @ORM\ManyToOne(targetEntity="Person")
     * @App\DeserializeEntity(type="AppBundle\Entity\Person", idField="id", idGetter="getId", setter="setPerson")
     * @Assert\NotBlank()
     * @Serializer\Groups({"Deserialize"})
     * @Serializer\Expose()
     */
    private $person;

    /**
     * @var string
     * @ORM\Column(name="played_name", type="string", length=100)
     * @Assert\NotBlank()
     * @Assert\Length(min=1,max=100)
     * @Serializer\Groups({"Default", "Deserialize"})
     * @Serializer\Expose()
     */
    private $playedName;

    /**
     * @var Movie
     * @ORM\ManyToOne(targetEntity="Movie", inversedBy="roles")
     */
    private $movie;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set playedName
     *
     * @param string $playedName
     *
     * @return Role
     */
    public function setPlayedName($playedName)
    {
        $this->playedName = $playedName;

        return $this;
    }

    /**
     * Get playedName
     *
     * @return string
     */
    public function getPlayedName()
    {
        return $this->playedName;
    }

    /**
     * Set person
     *
     * @param \AppBundle\Entity\Person $person
     *
     * @return Role
     */
    public function setPerson(\AppBundle\Entity\Person $person = null)
    {
        $this->person = $person;

        return $this;
    }

    /**
     * Get person
     *
     * @return \AppBundle\Entity\Person
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * Set movie
     *
     * @param \AppBundle\Entity\Movie $movie
     *
     * @return Role
     */
    public function setMovie(\AppBundle\Entity\Movie $movie = null)
    {
        $this->movie = $movie;

        return $this;
    }

    /**
     * Get movie
     *
     * @return \AppBundle\Entity\Movie
     */
    public function getMovie()
    {
        return $this->movie;
    }
}
