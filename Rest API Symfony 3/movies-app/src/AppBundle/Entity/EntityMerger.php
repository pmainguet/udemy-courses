<?php

namespace AppBundle\Entity;

use \Doctrine\Common\Annotations\AnnotationReader;

class EntityMerger
{
    private $_annotationReader;

    /**
     * Undocumented function
     *
     * @param AnnotationReader $annotationReader
     */
    public function __construct(AnnotationReader $annotationReader)
    {
        $this->_annotationReader = $annotationReader;
    }
    
    /**
     * Undocumented function
     *
     * @param [type] $entity
     * @param [type] $changes
     * @return void
     */
    public function merge($entity, $changes):void
    {
        $entityClassName = get_class($entity);
        $changesClassName = get_class($changes);

        if (false === $entityClassName||false === $changesClassName) {
            throw new \InvalidArgumentException('entity is not a class');
        }

        //Continue only if $changes is same class or subclass of $entityClassName
        if (!is_a($changes, $entityClassName)) {
            throw new \InvalidArgumentException('Cannot merge $changesClassName object with $entityClassName object');
        }

        $entityReflection = new \ReflectionObject($entity);
        $changesReflection = new \ReflectionObject($changes);

        foreach ($changesReflection->getProperties() as $changedProperty) {
            $changedProperty->setAccessible(true);
            $changedPropertyValue = $changedProperty->getValue($changes);

            //Ignore $changes property that are null
            if (null === $changedPropertyValue) {
                continue;
            }

            //Ignore if $entity does not have the property
            if (!$entityReflection->hasProperty($changedProperty->getName())) {
                continue;
            }

            $entityProperty = $entityReflection->getProperty($changedProperty->getName());
            $annotation = $this->_annotationReader->getPropertyAnnotation($entityProperty, Id::class);

            //Ignore the Id property (we don't want to modify the original id)
            if (null !== $annotation) {
                continue;
            }

            $entityProperty->setAccessible(true);
            $entityProperty->setValue($entity, $changedPropertyValue);
        }
    }
}
