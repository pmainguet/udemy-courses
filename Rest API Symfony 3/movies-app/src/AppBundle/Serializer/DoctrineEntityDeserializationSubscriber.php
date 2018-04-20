<?php

namespace AppBundle\Serializer;

use \JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use \JMS\Serializer\EventDispatcher\PreDeserializeEvent;
use \JMS\Serializer\EventDispatcher\ObjectEvent;
use \Doctrine\Common\Annotations\AnnotationReader;
use \AppBundle\Annotation\DeserializeEntity;
use \Doctrine\Bundle\DoctrineBundle\Registry;
use \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DoctrineEntityDeserializationSubscriber implements EventSubscriberInterface
{
    /** @var AnnotationReader */
    private $_annotationReader;

    /** @var Registry */
    private $_registry;

    public function __construct(AnnotationReader $annotationReader, Registry $registry)
    {
        $this->_annotationReader=$annotationReader;
        $this->_registry=$registry;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            [
                'event'=>'serializer.pre_deserialize',
                'method'=>'onPreDeserialize',
                'format' => 'json'
            ],
            [
                'event'=>'serializer.post_deserialize',
                'method'=>'onPostDeserialize',
                'format' => 'json'
            ]
            ];
    }

    public function onPreDeserialize(PreDeserializeEvent $event)
    {
        /** Récupère les informations passé dans l'annotation de l'attribut $person dans Role Entity */
        $deserializedType=$event->getType()['name'];

        if (!class_exists($deserializedType)) {
            return;
        }

        $data= $event->getData();
        $class = new \ReflectionClass($deserializedType);

        foreach ($class->getProperties() as $property) {
            
            /** Si une propriété de la classe Person (dans ce cas) n'existe pas dans le tableau de data, alors
             * on ne fait rien */
            if (!isset($data[$property->name])) {
                continue;
            }

            /** ici seule la propriété person existe dans le tableau de data  */

            /** @var DeserializeEntity $annotation */
            $annotation = $this->_annotationReader->getPropertyAnnotation($property, DeserializeEntity::class);

            /** s'il n'y a pas d'annotation pour cette propriété dans la class Person ou qu'il y en a une
             * mais que la classe correspondant à l'annotation Type n'existe pas, on ne fait rien
              */
            if (null === $annotation || !class_exists($annotation->type)) {
                continue;
            }

            /** s'il existe une classe de type annotation, on met l'id dans un tableau qui pourra être
             * utilisé correctement par la classe Deserializer => it believes now that person is an object and would
             * create correctly the Person in the database with only id */
            $data[$property->name] = [
                $annotation->idField => $data[$property->name]
            ];
        }
        $event->setData($data);
    }

    public function onPostDeserialize(ObjectEvent $event)
    {
        $deserializedType=$event->getType()['name'];

        if (!class_exists($deserializedType)) {
            return;
        }

        $object = $event->getObject();

        $reflection = new \ReflectionObject($object);

        foreach ($reflection->getProperties() as $property) {
            /** @var DeserializeEntity $annotation */
            $annotation = $this->_annotationReader->getPropertyAnnotation($property, DeserializeEntity::class);

            if (null === $annotation || !class_exists($annotation->type)) {
                continue;
            }

            if (!$reflection->hasMethod($annotation->setter)) {
                throw new \LogicException(
                    "Object {$reflection->getName()} does not have the {$annotation->setter} method"
                );
            }

            //in order to read a private property we need first to make it accessible
            $property->setAccessible(true);
            $deserializedEntity = $property->getValue($object);

            if (null === $deserializedEntity) {
                return;
            }

            $entityId = $deserializedEntity->{$annotation->idGetter}();

            $repository = $this->_registry->getRepository($annotation->type);
            $entity = $repository->find($entityId);

            if (null === $entity) {
                throw new NotFoundHttpException("Resource {$reflection->getShortName()}/$entityId");
            }

            $object->{$annotation->setter}($entity);
        }
    }
}
