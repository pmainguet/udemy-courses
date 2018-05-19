# Symfony 3 by Example

## COMPOSER

* Utilisation de composer pour gestion des dépendances + installation du framework Symfony (voir doc)
  * composer create-project symfony/framework-standard-edition movies "3.3.\*"
* utilisation de la console pour génération:
  * d'un bundle
  * d'une entity
  * des getter / setters d'une entité
  * schéma de base de donnée (sur la base de la définition d'une entité),
  * d'une form
  * d'un bundle crud complet
  * fixtures (données à uploader en base)
* build-in webserver + configuration Apache pour pointer vers le dossier du projet (pas forcément dans le dossier public d'Apache)

## BUNDLES

* génération via console
* ou à la main en indiquant Bundle dans AppKernel, routing.yml et config.yml (lien vers le service.yml du bundle)
* 3rd party bundles: composer + déclaration dans AppKernel

## ROUTING

* annotation @Route("/", name="home") + prefix dans routing.yml
* définition du template à utiliser:
  * via $this->render appelé en fin d'action
  * ou via annotation @Template() => dans ce cas prend en compte le nom du controller et le nom de l'action pour pointer vers le template à utiliser

## TWIG

* layout définit à la base du projet + template inheritance via définition des blocks
* flashbag / $this->addFlash message pour faire apparaitre des messages globaux
* pour des messages lié à la validation d'un formulaire possibilité d'utiliser {{ form_errors }} au niveau du twig

## DATABASE / DOCTRINE

* Common (components to be used) + DBal (database abstraction on top of PDO) + ORM (object relational mapping that provide persistence)
* Trois concepts de base:
  * Entity Manager: objet qui gère toutes les entités (gère la création, persistence, ... des entités)
  * Entity: objet qui représente une entrée dans la table de la base de donnée ("une ligne"), identifié par son id
  * Repository: objet qui représente la totalité des entités de la table qu'il représente ("une collection d'entité"). Dispose d'un certains nombre de fonctions pour persister les entités ou les retrouver (findAll, findBy ) mais possibiliter de créer des méthodes personnalisés dans le fichier du Repository
* Configuration de la base de données via parameters.yml + bin/console doctrine:database:create
* Génération d'une entité et de son repository:
  * bin/console doctrine:generate:entity => création des fichiers php
  * bin/console doctrine:schema:update --force => création de la table en base de données
  * ajout à la main d'attributs à l'entité + bin/console doctrine:schema:update --force pour mettre à jour + bin/console doctrine:generate:entities pour générer automatiquement les getters et setters de cette entité
* OneToMany Relations (pour rendre base de données plus conforme aux standards, ie id plutot que plain text pour certains attributs sans répétition)
  * Dans les annotations des attributs de l'entité concernée, utiliser @ORM\ManyToOne(targetEntity="CarBundle\Entity\Model",inversedBy="cars") plutot que ORM
  * et dans la targetEntity @ORM\OneToMany(targetEntity="CarBundle\Entity\Car", mappedBy="model") + doctrine:generate:entities + update database
* Lazy Loading => attention parfois besoin de définir des custom query dans le Repository avec des clauses join plutot que de laisser faire le lazy loading de Doctrine (multiplication des requêtes à la base de données)

## FORM

* Form sans entité (formulaire de recherche) => voir exemple dans le cours (définition directe dans le controller)
* Création à partir d'une entité:
  * bin/console generate:doctrine:form
  * Customisation du FormType créé
* Possibilité de gérer via la console un système CRUD complet à partir d'une entité:
  * bin/console generate:doctrine:crud
  * Customisation du controller du form type et des vues créé
  * En particulier, ajout de valiation dans la fonction buildForm du Form Type

## SERVICE CONTAINER

* Création dans dossier Service + déclaration dans services.yml du bundle ou global
* Disponible ensuite dans les controllers via $this->get('nom du service') sinon dans autres fichiers via $this->getContainer()->get('nom du service')
* Passer un paramètre définit dans parameters.yml
  * création d'un attribut dans la classe du service + constructeur définissant cet attribut
  * dans services.yml ajour d'un argument arguments = ['%nom du parametre dans le yml%']
  * ajout du paramètre dans le yml
* Faire dépendre un service d'un autre (ex entityManager pour pouvoir sauvegarder modif fait dans le service)
  * ajout d'un attribut au service correspond à l'autre service que l'on veut appeler + constructeur
  * ajout d'un argument dans services.yml arguments = ['@doctrine.orm.entity_manager']

## CONSOLE COMMAND

* Génération d'une commande à utiliser dans la console:

  * bin/console generate:command => création d'un fichier dans un dossier Command
  * possibilité d'ajouter une ProgressBar (voir Doctrine\Common)
  * pour accéder à un service dans cette commande, si le container étends ContainerAwareCommand => tous les services sont déjà dispo
  * si l'on souhaite définir une commande comme service (par exemple on ne respecte pas la convention de le placer dans le dossier Command)
    * changer la classe étendue de la commande en extends Command
    * comme il n'est plus ContainerAware, il faut créer des attributs correspond au service que l'on souhaite pouvoir utiliser, et les setter dans le constructeur, puis dans services.yml déclarer la classe comme un service et faire passer les services en paramètres + indiquer un tag {name: console.command}

## TEST

* installer PHPUnit via composer + ustilisation de /vendor/bin/phpunit pour lancer les test
* définition des tests dans le dossier tests à la racine du projet
* configuration (ajout de logging par exemple pour le code coverage) via phpunit.xml.dist
* Unit Testing => Code Coverage: permet de savoir la proportion du code correctement testé
* Functional Testing => possibilité de tester l'UX directement !
